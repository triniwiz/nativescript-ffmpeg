export declare enum FFmpegActions {
    EXECUTE = "execute",
    EXECUTEWITHARGUMENTS = "executeWithArguments",
    GETFFMPEGVERSION = "ffmpegVersion",
    GETPLATFORM = "platform",
    CANCEL = "cancel",
    GETMEDIAINFORMATION = "mediaInformation",
    LOG = "log",
    STATISTICS = "statistics",
    GETEXTERNALLIBRARIES = "externalLibraries",
    GETLASTRECEIVEDSTATISTICS = "lastReceivedStatistics",
    GETLASTRETURNCODE = "lastReturnCode",
    GETLASTCOMMANDOUTPUT = "lastCommandOutput",
    ENABLELOG = "enableLog",
    ENABLESTATISTICS = "enableStatistics"
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
export declare enum LogLevel {
    AV_LOG_QUIET = -8,
    AV_LOG_PANIC = 0,
    AV_LOG_FATAL = 8,
    AV_LOG_ERROR = 16,
    AV_LOG_WARNING = 24,
    AV_LOG_INFO = 32,
    AV_LOG_VERBOSE = 40,
    AV_LOG_DEBUG = 48,
    AV_LOG_TRACE = 56
}
export declare class FFmpeg {
    static execute(cmd: string, delimiter?: string): Promise<any>;
    static executeWithArguments(args: string[]): Promise<any>;
    static getFFmpegVersion(): Promise<string>;
    static getPlatform(): Promise<String>;
    static cancel(): Promise<any>;
    static getMediaInformation(file: string): Promise<any>;
    static disableRedirection(): void;
    static enableRedirection(): void;
    static getLogLevel(): LogLevel;
    static setLogLevel(level: LogLevel): void;
    static disableLogs(): void;
    static disableStatistics(): void;
    static enableLogCallback(callback?: Function): void;
    static enableStatisticsCallback(callback?: Function): void;
    static resetStatistics(): void;
    static getExternalLibraries(): Promise<string[]>;
    static getLastReceivedStatistics(): Promise<FFmpegStatistics>;
    static getLastReturnCode(): Promise<number>;
    static getLastCommandOutput(): Promise<string>;
}
