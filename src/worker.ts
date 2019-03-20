import 'tns-core-modules/globals';
import { isAndroid } from 'tns-core-modules/platform';
import { FFmpegActions, FFmpegMediaInformation, FFmpegStatistics } from './ffmpeg';

let main_queue;
if (!isAndroid) {
    main_queue = dispatch_get_current_queue();
}
const context: Worker = self as any;
context.onmessage = msg => {
    switch (msg.data.action) {
        case FFmpegActions.EXECUTE:
            execute(msg.data.cmd, msg.data.delimiter, msg.data.id);
            break;
        case FFmpegActions.EXECUTEWITHARGUMENTS:
            executeWithArguments(msg.data.args, msg.data.id);
            break;
        case FFmpegActions.GETFFMPEGVERSION:
            getFFmpegVersion(msg.data.id);
            break;
        case FFmpegActions.GETPLATFORM:
            getPlatform(msg.data.id);
            break;
        case FFmpegActions.CANCEL:
            cancel(msg.data.id);
            break;
        case FFmpegActions.GETMEDIAINFORMATION:
            getMediaInformation(msg.data.file, msg.data.id);
            break;
        case FFmpegActions.GETEXTERNALLIBRARIES:
            getExternalLibraries(msg.data.id);
            break;
        case FFmpegActions.GETLASTRETURNCODE:
            getLastReturnCode(msg.data.id);
            break;
        case FFmpegActions.GETLASTRECEIVEDSTATISTICS:
            getLastReceivedStatistics(msg.data.id);
            break;
        case FFmpegActions.GETLASTCOMMANDOUTPUT:
            getLastCommandOutput(msg.data.id);
            break;
        case FFmpegActions.ENABLELOG:
            initLogListener();
            break;
        case FFmpegActions.ENABLESTATISTICS:
           // initStatisticsListener();
            break;
        default:
            break;
    }
};

const initLogListener = () => {
    if (isAndroid) {
        com.arthenica.mobileffmpeg.Config.enableLogCallback(new com.arthenica.mobileffmpeg.LogCallback({
            apply(logMessage: com.arthenica.mobileffmpeg.LogMessage): void {
                context.postMessage({
                    type: 'success',
                    action: FFmpegActions.LOG,
                    result: {level: logMessage.getLevel(), text: logMessage.getText()}
                });
            }
        }));
    } else {
        const logDelegateImpl = (NSObject as any).extend({
            logCallback: function (level: number, message: string) {
                dispatch_async(main_queue, () => {
                    context.postMessage({
                        type: 'success',
                        action: FFmpegActions.LOG,
                        result: {level: level, text: message}
                    });
                });
            }
        }, {name: 'LogDelegateImpl', protocols: [LogDelegate]});
        MobileFFmpegConfig.setLogDelegate(logDelegateImpl.new());
    }
};

const initStatisticsListener = () => {
    if (isAndroid) {
        com.arthenica.mobileffmpeg.Config.enableStatisticsCallback(new com.arthenica.mobileffmpeg.StatisticsCallback({
            apply(statistics: com.arthenica.mobileffmpeg.Statistics): void {
                context.postMessage({
                    type: 'success',
                    action: FFmpegActions.STATISTICS,
                    result: {
                        bitrate: statistics.getBitrate(),
                        size: statistics.getSize(),
                        speed: statistics.getSpeed(),
                        time: statistics.getTime(),
                        videoFps: statistics.getVideoFps(),
                        videoFrameNumber: statistics.getVideoFrameNumber(),
                        videoQuality: statistics.getVideoQuality()
                    }
                });
            }
        }));
    } else {
        const statsDelegateImpl = (NSObject as any).extend({
            statisticsCallback: function (statistics: Statistics) {
                dispatch_async(main_queue, () => {
                    context.postMessage({
                        type: 'success',
                        action: FFmpegActions.STATISTICS,
                        result: {
                            bitrate: statistics.getBitrate(),
                            size: statistics.getSize(),
                            speed: statistics.getSpeed(),
                            time: statistics.getTime(),
                            videoFps: statistics.getVideoFps(),
                            videoFrameNumber: statistics.getVideoFrameNumber(),
                            videoQuality: statistics.getVideoQuality()
                        }
                    });
                });
            }
        }, {
            name: 'StatisticsDelegateImpl',
            protocols: [StatisticsDelegate]
        });
        MobileFFmpegConfig.setStatisticsDelegate(statsDelegateImpl.new());
    }
};

const initListeners = () => {
    initLogListener();
    initStatisticsListener();
};

const execute = (cmd: string, delimiter: string = null, id: string) => {
    try {
        let result;
        if (isAndroid) {
            if (!delimiter || delimiter === ' ') {
                result = com.arthenica.mobileffmpeg.FFmpeg.execute(cmd);
            } else {
                result = com.arthenica.mobileffmpeg.FFmpeg.execute(cmd, delimiter);
            }
        } else {
            if (!delimiter || delimiter === ' ') {
                result = MobileFFmpeg.execute(cmd);
            } else {
                result = MobileFFmpeg.executeDelimiter(cmd, delimiter);
            }
        }
        context.postMessage({action: FFmpegActions.EXECUTE, type: 'success', result, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.EXECUTE, type: 'error', result: e.message, id});
    }
};

const executeWithArguments = (args: string[], id: string) => {
    try {
        let result;
        if (isAndroid) {
            result = com.arthenica.mobileffmpeg.FFmpeg.execute(args);
        } else {
            result = MobileFFmpeg.executeWithArguments(args);
        }
        context.postMessage({action: FFmpegActions.EXECUTEWITHARGUMENTS, type: 'success', result, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.EXECUTEWITHARGUMENTS, type: 'error', result: e.message, id});
    }
};

const getFFmpegVersion = (id: string) => {
    try {
        let version;
        if (isAndroid) {
            version = 'version ' + com.arthenica.mobileffmpeg.FFmpeg.getFFmpegVersion();
        } else {
            version = 'version ' + MobileFFmpeg.getFFmpegVersion();
        }
        context.postMessage({action: FFmpegActions.GETFFMPEGVERSION, type: 'success', result: version, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETFFMPEGVERSION, type: 'error', result: e.message, id});
    }
};

const getPlatform = (id: string) => {
    try {
        let platform;
        if (isAndroid) {
            platform = 'android-' + com.arthenica.mobileffmpeg.AbiDetect.getAbi();
        } else {
            platform = 'ios-' + ArchDetect.getArch();
        }
        context.postMessage({action: FFmpegActions.GETPLATFORM, type: 'success', result: platform, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETPLATFORM, type: 'error', result: e.message, id});
    }
};

const cancel = (id: string) => {
    try {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.FFmpeg.cancel();
        } else {
            MobileFFmpeg.cancel();
        }
        context.postMessage({action: FFmpegActions.CANCEL, type: 'success', id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.CANCEL, type: 'error', result: e.message, id});
    }
};

const getMediaInformation = (file: string, id: string) => {
    try {
        let mediaInfo: FFmpegMediaInformation;
        if (isAndroid) {
            const info = com.arthenica.mobileffmpeg.FFmpeg.getMediaInformation(file);
            const streams = [];
            const nativeStreams = info.getStreams();
            if (nativeStreams) {
                const length = nativeStreams.size();
                for (let i = 0; i < length; i++) {
                    const item = nativeStreams.get(i);
                    item.getAverageFrameRate();
                    streams.push({
                        id: item.getIndex(),
                        type: item.getType(),
                        codec: item.getCodec(),
                        fullCodec: item.getFullCodec(),
                        format: item.getFormat(),
                        fullFormat: item.getFullFormat(),
                        width: item.getWidth(),
                        height: item.getHeight(),
                        bitrate: item.getBitrate(),
                        sampleRate: item.getSampleRate(),
                        sampleFormat: item.getSampleFormat(),
                        channelLayout: item.getChannelLayout(),
                        sampleAspectRatio: item.getSampleAspectRatio(),
                        displayAspectRatio: item.getDisplayAspectRatio(),
                        averageFrameRate: item.getAverageFrameRate(),
                        realFrameRate: item.getRealFrameRate(),
                        timeBase: item.getTimeBase(),
                        codecTimeBase: item.getCodecTimeBase()
                    });
                }
            }
            mediaInfo = {
                bitrate: info.getBitrate().longValue(),
                duration: info.getDuration().longValue(),
                format: info.getFormat(),
                path: info.getPath(),
                startTime: info.getStartTime().longValue(),
                rawInformation: info.getRawInformation(),
                streams
            };
            context.postMessage({action: FFmpegActions.GETMEDIAINFORMATION, type: 'success', id, result: mediaInfo});
        } else {
            const info = MobileFFmpeg.getMediaInformation(file);
            const streams = [];
            const nativeStreams = info.getStreams();
            if (nativeStreams) {
                const length = nativeStreams.count;
                for (let i = 0; i < length; i++) {
                    const item = nativeStreams.objectAtIndex(i);

                    item.getAverageFrameRate();
                    streams.push({
                        id: item.getIndex(),
                        type: item.getType(),
                        codec: item.getCodec(),
                        fullCodec: item.getFullCodec(),
                        format: item.getFormat(),
                        fullFormat: item.getFullFormat(),
                        width: item.getWidth(),
                        height: item.getHeight(),
                        bitrate: item.getBitrate(),
                        sampleRate: item.getSampleRate(),
                        sampleFormat: item.getSampleFormat(),
                        channelLayout: item.getChannelLayout(),
                        sampleAspectRatio: item.getSampleAspectRatio(),
                        displayAspectRatio: item.getDisplayAspectRatio(),
                        averageFrameRate: item.getAverageFrameRate(),
                        realFrameRate: item.getRealFrameRate(),
                        timeBase: item.getTimeBase(),
                        codecTimeBase: item.getCodecTimeBase()
                    });
                }
            }
            mediaInfo = {
                bitrate: info.getBitrate(),
                duration: info.getDuration(),
                format: info.getFormat(),
                path: info.getPath(),
                startTime: info.getStartTime(),
                rawInformation: info.getRawInformation(),
                streams
            };

            context.postMessage({action: FFmpegActions.GETMEDIAINFORMATION, type: 'success', id, result: mediaInfo});
        }
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETMEDIAINFORMATION, type: 'error', result: e.message, id});
    }
};

const getExternalLibraries = (id: string) => {
    try {
        let libs = [];
        if (isAndroid) {
            libs = com.arthenica.mobileffmpeg.Config.getExternalLibraries().toArray() as any;
        } else {
            const nativeLibs = MobileFFmpegConfig.getExternalLibraries();
            const count = nativeLibs.count;
            for (let i = 0; i < count; i++) {
                libs.push(nativeLibs.objectAtIndex(i));
            }
        }
        context.postMessage({action: FFmpegActions.GETEXTERNALLIBRARIES, type: 'success', result: libs, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETEXTERNALLIBRARIES, type: 'error', result: e.message, id});
    }
};

const getLastReturnCode = (id: string) => {
    try {
        let code;
        if (isAndroid) {
            code = com.arthenica.mobileffmpeg.FFmpeg.getLastReturnCode();
        } else {
            code = MobileFFmpeg.getLastReturnCode();
        }
        context.postMessage({action: FFmpegActions.GETLASTRETURNCODE, type: 'success', result: code, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETLASTRETURNCODE, type: 'error', result: e.message, id});
    }
};

const getLastReceivedStatistics = (id: string) => {
    try {
        let stats: FFmpegStatistics;
        if (isAndroid) {
            const statistics = com.arthenica.mobileffmpeg.Config.getLastReceivedStatistics();
            stats = {
                bitrate: statistics.getBitrate(),
                size: statistics.getSize(),
                speed: statistics.getSpeed(),
                time: statistics.getTime(),
                videoFps: statistics.getVideoFps(),
                videoFrameNumber: statistics.getVideoFrameNumber(),
                videoQuality: statistics.getVideoQuality()
            };
        } else {
            const statistics = MobileFFmpegConfig.getLastReceivedStatistics();
            stats = {
                bitrate: statistics.getBitrate(),
                size: statistics.getSize(),
                speed: statistics.getSpeed(),
                time: statistics.getTime(),
                videoFps: statistics.getVideoFps(),
                videoFrameNumber: statistics.getVideoFrameNumber(),
                videoQuality: statistics.getVideoQuality()
            };
        }
        context.postMessage({action: FFmpegActions.GETLASTRECEIVEDSTATISTICS, type: 'success', result: stats, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETLASTRECEIVEDSTATISTICS, type: 'error', result: e.message, id});
    }
};

const getLastCommandOutput = (id: string) => {
    try {
        let output;
        if (isAndroid) {
            output = com.arthenica.mobileffmpeg.FFmpeg.getLastCommandOutput();
        } else {
            output = MobileFFmpeg.getLastCommandOutput();
        }
        context.postMessage({action: FFmpegActions.GETLASTCOMMANDOUTPUT, type: 'success', result: output, id});
    } catch (e) {
        context.postMessage({action: FFmpegActions.GETLASTCOMMANDOUTPUT, type: 'error', result: e.message, id});
    }
};

initListeners();

context.onerror = error => {
    console.error('worker error :- ', error);
};
