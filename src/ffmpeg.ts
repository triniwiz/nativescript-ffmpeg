import { isAndroid } from '@nativescript/core/platform';

export enum FFmpegActions {
    EXECUTE = 'execute',
    EXECUTEWITHARGUMENTS = 'executeWithArguments',
    GETFFMPEGVERSION = 'ffmpegVersion',
    GETPLATFORM = 'platform',
    CANCEL = 'cancel',
    GETMEDIAINFORMATION = 'mediaInformation',
    LOG = 'log',
    STATISTICS = 'statistics',
    GETEXTERNALLIBRARIES = 'externalLibraries',
    GETLASTRECEIVEDSTATISTICS = 'lastReceivedStatistics',
    GETLASTRETURNCODE = 'lastReturnCode',
    GETLASTCOMMANDOUTPUT = 'lastCommandOutput',
    ENABLELOG = 'enableLog',
    ENABLESTATISTICS = 'enableStatistics'
}

export interface FFmpegStatistics {
    bitrate: number;
    size: number;
    speed: number;
    time: number;
    videoFps: number;
    videoFrameNumber: number;
    videoQuality: number;
}

export interface FFmpegMediaStream {
    id: number;
    type: string;
    codec: string;
    fullCodec: string;
    format: string;
    fullFormat: string;
    width: number;
    height: number;
    bitrate: number;
    sampleRate: number;
    sampleFormat: number;
    channelLayout: string;
    sampleAspectRatio: number;
    displayAspectRatio: number;
    averageFrameRate: number;
    realFrameRate: number;
    timeBase: number;
    codecTimeBase: number;
}

export interface FFmpegMediaInformation {
    bitrate: number;
    duration: number;
    format: string;
    path: string;
    startTime: number;
    rawInformation: string;
    streams: FFmpegMediaStream[];
}

export enum LogLevel {
    /**
     * Print no output.
     */
    AV_LOG_QUIET = -8,

    /**
     * Something went really wrong and we will crash now.
     */
    AV_LOG_PANIC = 0,

    /**
     * Something went wrong and recovery is not possible.
     * For example, no header was found for a format which depends
     * on headers or an illegal combination of parameters is used.
     */
    AV_LOG_FATAL = 8,

    /**
     * Something went wrong and cannot losslessly be recovered.
     * However, not all future data is affected.
     */
    AV_LOG_ERROR = 16,

    /**
     * Something somehow does not look correct. This may or may not
     * lead to problems. An example would be the use of '-vstrict -2'.
     */
    AV_LOG_WARNING = 24,

    /**
     * Standard information.
     */
    AV_LOG_INFO = 32,

    /**
     * Detailed information.
     */
    AV_LOG_VERBOSE = 40,

    /**
     * Stuff which is only useful for libav* developers.
     */
    AV_LOG_DEBUG = 48,

    /**
     * Extremely verbose debugging, useful for libav* development.
     */
    AV_LOG_TRACE = 56
}

export class FFmpeg {
    private static _worker: Worker;
    private static _logCallback: Function;
    private static _statisticsCallback: Function;

    public static get worker(): Worker {
        if (!this._worker) {
            // @ts-ignore
            if (global['TNS_WEBPACK']) {
                // @ts-ignore
                const FFmpegWorker = require('nativescript-worker-loader!./worker');
                this._worker = new FFmpegWorker();
            } else {
                this._worker = new Worker('./worker');
            }

            this._worker.onmessage = msg => {
                const id = msg.data.id;
                const action = msg.data.action;
                const type: 'success' | 'error' = msg.data.type;
                const result = msg.data.result;
                const callback = this.callbackMap.get(id);
                if (callback) {
                    if (type === 'success') {
                        switch (action) {
                            case FFmpegActions.CANCEL:
                                callback.resolve();
                                break;
                            case FFmpegActions.EXECUTE:
                            case FFmpegActions.EXECUTEWITHARGUMENTS:
                            case FFmpegActions.GETFFMPEGVERSION:
                            case FFmpegActions.GETPLATFORM:
                            case FFmpegActions.GETMEDIAINFORMATION:
                            case FFmpegActions.GETEXTERNALLIBRARIES:
                            case FFmpegActions.GETLASTCOMMANDOUTPUT:
                            case FFmpegActions.GETLASTRECEIVEDSTATISTICS:
                            case FFmpegActions.GETLASTRETURNCODE:
                                callback.resolve(result);
                                break;
                            default:
                                break;
                        }
                    } else {
                        callback.reject(result);
                    }
                } else if (action === FFmpegActions.LOG) {
                    if (!this._logCallback) {
                        console.log(result);
                    } else {
                        this._logCallback(result);
                    }
                } else if (FFmpegActions.STATISTICS) {
                    if (this._statisticsCallback) {
                        this._statisticsCallback(result);
                    }
                }
            };

            this._worker.onerror = error => {
                console.error(error);
            };
        }
        return this._worker;
    }

    private static callbackMap: Map<string,
        { resolve: any; reject: any }> = new Map();

    public static execute(cmd: string, delimiter: string = ' '): Promise<number> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.execute(
                    cmd,
                    delimiter,
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.EXECUTE,
                    cmd,
                    delimiter,
                    id
                });
            }
        });
    }

    public static executeWithArguments(args: string[]): Promise<number> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.executeWithArguments(
                    args,
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.EXECUTEWITHARGUMENTS,
                    args,
                    id
                });
            }
        });
    }

    public static getFFmpegVersion(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getFFmpegVersion(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({action: FFmpegActions.GETFFMPEGVERSION, id});
            }
        });
    }

    public static getPlatform(): Promise<String> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getPlatform(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({action: FFmpegActions.GETPLATFORM, id});
            }
        });
    }

    public static cancel(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.cancel(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({action: FFmpegActions.CANCEL, id});
            }
        });
    }

    public static getMediaInformation(
        file: string,
        timeOut = 10000
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getMediaInformation(
                    file,
                    java.lang.Long.valueOf(timeOut),
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            try {
                                resolve(JSON.parse(result));
                            } catch (e) {
                                console.error(e);
                                resolve(result);
                            }
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.GETMEDIAINFORMATION,
                    file,
                    id,
                    timeOut
                });
            }
        });
    }

    public static disableRedirection() {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.disableRedirection();
        } else {
            MobileFFmpegConfig.disableRedirection();
        }
    }

    public static enableRedirection() {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.enableRedirection();
        } else {
            MobileFFmpegConfig.enableRedirection();
        }
    }

    public static getLogLevel(): LogLevel {
        if (isAndroid) {
            return com.arthenica.mobileffmpeg.Config.getLogLevel().getValue();
        } else {
            return MobileFFmpegConfig.getLogLevel();
        }
    }

    public static setLogLevel(level: LogLevel) {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.setLogLevel(
                com.arthenica.mobileffmpeg.Level.from(level.valueOf())
            );
        } else {
            MobileFFmpegConfig.setLogLevel(level.valueOf());
        }
    }

    public static disableLogs() {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.enableLogCallback(null);
        } else {
            MobileFFmpegConfig.setLogDelegate(null);
        }
    }

    public static disableStatistics() {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.enableStatisticsCallback(null);
        } else {
            MobileFFmpegConfig.setStatisticsDelegate(null);
        }
    }

    public static enableLogCallback(callback?: Function) {
        if (isAndroid) {
            com.github.triniwiz.fancyffmpeg.FancyFFmpeg.enableLogCallback(
                new com.github.triniwiz.fancyffmpeg.LogListener({
                    onResult(result) {
                        try {
                            const data = JSON.parse(result);
                            if (callback) {
                                callback(data);
                            } else {
                                console.log(data);
                            }
                        } catch (e) {
                            if (callback) {
                                callback(result);
                            } else {
                                console.error(e);
                            }
                        }
                    }
                })
            );
        } else {
            this.worker.postMessage({action: FFmpegActions.ENABLELOG});
            if (!callback) {
                this._logCallback = null;
                return;
            }

            this._logCallback = callback;
        }
    }

    public static enableStatisticsCallback(callback?: Function) {
        if (isAndroid) {
            com.github.triniwiz.fancyffmpeg.FancyFFmpeg.enableStatisticsCallback(
                new com.github.triniwiz.fancyffmpeg.LogListener({
                    onResult(result) {
                        if (callback) {
                            try {
                                callback(JSON.parse(result));
                            } catch (e) {
                                callback(result);
                            }
                        }
                    }
                })
            );
        } else {
            this.worker.postMessage({action: FFmpegActions.ENABLESTATISTICS});
            if (!callback) {
                this._statisticsCallback = null;
                return;
            }
            this._statisticsCallback = callback;
        }
    }

    public static resetStatistics() {
        if (isAndroid) {
            com.arthenica.mobileffmpeg.Config.resetStatistics();
        } else {
            MobileFFmpegConfig.resetStatistics();
        }
    }

    public static getExternalLibraries(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getExternalLibraries(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.GETEXTERNALLIBRARIES,
                    id
                });
            }
        });
    }

    public static getLastReceivedStatistics(): Promise<FFmpegStatistics> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getLastReceivedStatistics(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            try {
                                resolve(JSON.parse(result));
                            } catch (e) {
                                resolve(result);
                            }
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.GETLASTRECEIVEDSTATISTICS,
                    id
                });
            }
        });
    }

    public static getLastReturnCode(): Promise<number> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getLastReturnCode(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.GETLASTRETURNCODE,
                    id
                });
            }
        });
    }

    public static getLastCommandOutput(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (isAndroid) {
                com.github.triniwiz.fancyffmpeg.FancyFFmpeg.getLastCommandOutput(
                    new com.github.triniwiz.fancyffmpeg.Listener({
                        onError(error) {
                            reject(error);
                        },
                        onSuccess(result) {
                            resolve(result);
                        }
                    })
                );
            } else {
                const id = this.getUUID();
                this.callbackMap.set(id, {resolve, reject});
                this.worker.postMessage({
                    action: FFmpegActions.GETLASTCOMMANDOUTPUT,
                    id
                });
            }
        });
    }

    public static setFontDirectory() {
    }

    public static setFontconfigConfigurationPath() {
    }

    private static getUUID(): string {
        if (isAndroid) {
            return java.util.UUID.randomUUID().toString();
        } else {
            return NSUUID.UUID().UUIDString;
        }
    }
}
