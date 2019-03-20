
declare class ArchDetect extends NSObject {

	static alloc(): ArchDetect; // inherited from NSObject

	static getArch(): string;

	static getCpuArch(): string;

	static isLTSBuild(): number;

	static new(): ArchDetect; // inherited from NSObject
}

interface AudioChannelMap {
	file_idx: number;
	stream_idx: number;
	channel_idx: number;
	ofile_idx: number;
	ostream_idx: number;
}
declare var AudioChannelMap: interop.StructType<AudioChannelMap>;

declare const enum HWAccelID {

	CCEL_NONE = 0,

	CCEL_AUTO = 1,

	CCEL_GENERIC = 2,

	CCEL_VIDEOTOOLBOX = 3,

	CCEL_QSV = 4,

	CCEL_CUVID = 5
}

declare var LIB_NAME: string;

interface LogDelegate extends NSObjectProtocol {

	logCallback(level: number, message: string): void;
}
declare var LogDelegate: {

	prototype: LogDelegate;
};

declare var MOBILE_FFMPEG_VERSION: string;

declare class MediaInformation extends NSObject {

	static alloc(): MediaInformation; // inherited from NSObject

	static new(): MediaInformation; // inherited from NSObject

	addMetadata(key: string, value: string): void;

	addStream(stream: StreamInformation): void;

	getBitrate(): number;

	getDuration(): number;

	getFormat(): string;

	getMetadataEntries(): NSDictionary<any, any>;

	getPath(): string;

	getRawInformation(): string;

	getStartTime(): number;

	getStreams(): NSArray<any>;

	setBitrate(bitrate: number): void;

	setDuration(duration: number): void;

	setFormat(format: string): void;

	setPath(path: string): void;

	setRawInformation(rawInformation: string): void;

	setStartTime(startTime: number): void;
}

declare class MediaInformationParser extends NSObject {

	static alloc(): MediaInformationParser; // inherited from NSObject

	static countOf(string: string, substring: string): number;

	static from(rawCommandOutput: string): MediaInformation;

	static indexOfFromTimes(string: string, substring: string, startIndex: number, n: number): number;

	static new(): MediaInformationParser; // inherited from NSObject

	static parseAudioStreamSampleRate(input: string): number;

	static parseDuration(input: string): number;

	static parseDurationBlock(input: string): (p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>, p3: interop.Pointer | interop.Reference<number>) => void;

	static parseInputBlock(input: string): (p1: interop.Pointer | interop.Reference<string>, p2: interop.Pointer | interop.Reference<string>) => void;

	static parseMetadataBlock(input: string): (p1: interop.Pointer | interop.Reference<string>, p2: interop.Pointer | interop.Reference<string>) => void;

	static parseStartTime(input: string): number;

	static parseStreamBlock(input: string): StreamInformation;

	static parseStreamCodec(input: string): string;

	static parseStreamFullCodec(input: string): string;

	static parseStreamIndex(input: string): number;

	static parseStreamType(input: string): string;

	static parseVideoDimensions(input: string): (p1: interop.Pointer | interop.Reference<number>, p2: interop.Pointer | interop.Reference<number>) => void;

	static parseVideoStreamDisplayAspectRatio(input: string): string;

	static parseVideoStreamSampleAspectRatio(input: string): string;

	static safeGetFrom(array: NSArray<any> | any[], index: number): string;

	static substringFromIgnoring(string: string, start: string, ignoredTokens: NSArray<any> | any[]): string;

	static substringFromToIgnoring(string: string, start: string, end: string, ignoredTokens: NSArray<any> | any[]): string;

	static substringToIgnoring(string: string, start: string, ignoredTokens: NSArray<any> | any[]): string;

	static toInteger(input: string): number;

	static toIntegerObject(input: string): number;
}

declare class MobileFFmpeg extends NSObject {

	static alloc(): MobileFFmpeg; // inherited from NSObject

	static cancel(): void;

	static execute(command: string): number;

	static executeDelimiter(command: string, delimiter: string): number;

	static executeWithArguments(_arguments: NSArray<any> | any[]): number;

	static getFFmpegVersion(): string;

	static getLastCommandOutput(): string;

	static getLastReturnCode(): number;

	static getMediaInformation(path: string): MediaInformation;

	static getMediaInformationTimeout(path: string, timeout: number): MediaInformation;

	static getVersion(): string;

	static new(): MobileFFmpeg; // inherited from NSObject
}

declare class MobileFFmpegConfig extends NSObject {

	static alloc(): MobileFFmpegConfig; // inherited from NSObject

	static disableRedirection(): void;

	static enableRedirection(): void;

	static getExternalLibraries(): NSArray<any>;

	static getLastReceivedStatistics(): Statistics;

	static getLogLevel(): number;

	static getPackageName(): string;

	static logLevelToString(level: number): string;

	static new(): MobileFFmpegConfig; // inherited from NSObject

	static resetStatistics(): void;

	static setFontDirectoryWith(fontDirectoryPath: string, fontNameMapping: NSDictionary<any, any>): void;

	static setFontconfigConfigurationPath(path: string): void;

	static setLogDelegate(newLogDelegate: LogDelegate): void;

	static setLogLevel(level: number): void;

	static setStatisticsDelegate(newStatisticsDelegate: StatisticsDelegate): void;
}

declare const enum OSTFinished {

	ENCODER_FINISHED = 1,

	MUXER_FINISHED = 2
}

interface OptionGroupDef {
	name: string;
	sep: string;
	flags: number;
}
declare var OptionGroupDef: interop.StructType<OptionGroupDef>;

declare var RETURN_CODE_CANCEL: number;

declare var RETURN_CODE_SUCCESS: number;

declare class Statistics extends NSObject {

	static alloc(): Statistics; // inherited from NSObject

	static new(): Statistics; // inherited from NSObject

	constructor(o: { videoFrameNumber: number; fps: number; quality: number; size: number; time: number; bitrate: number; speed: number; });

	getBitrate(): number;

	getSize(): number;

	getSpeed(): number;

	getTime(): number;

	getVideoFps(): number;

	getVideoFrameNumber(): number;

	getVideoQuality(): number;

	initWithVideoFrameNumberFpsQualitySizeTimeBitrateSpeed(newVideoFrameNumber: number, newVideoFps: number, newVideoQuality: number, newSize: number, newTime: number, newBitrate: number, newSpeed: number): this;

	update(statistics: Statistics): void;
}

interface StatisticsDelegate extends NSObjectProtocol {

	statisticsCallback(statistics: Statistics): void;
}
declare var StatisticsDelegate: {

	prototype: StatisticsDelegate;
};

declare class StreamInformation extends NSObject {

	static alloc(): StreamInformation; // inherited from NSObject

	static new(): StreamInformation; // inherited from NSObject

	addMetadata(key: string, value: string): void;

	getAverageFrameRate(): string;

	getBitrate(): number;

	getChannelLayout(): string;

	getCodec(): string;

	getCodecTimeBase(): string;

	getDisplayAspectRatio(): string;

	getFormat(): string;

	getFullCodec(): string;

	getFullFormat(): string;

	getHeight(): number;

	getIndex(): number;

	getMetadataEntries(): NSDictionary<any, any>;

	getRealFrameRate(): string;

	getSampleAspectRatio(): string;

	getSampleFormat(): string;

	getSampleRate(): number;

	getTimeBase(): string;

	getType(): string;

	getWidth(): number;

	setAverageFrameRate(averageFrameRate: string): void;

	setBitrate(bitrate: number): void;

	setChannelLayout(channelLayout: string): void;

	setCodec(codec: string): void;

	setCodecTimeBase(codecTimeBase: string): void;

	setDisplayAspectRatio(displayAspectRatio: string): void;

	setFormat(format: string): void;

	setFullCodec(fullCodec: string): void;

	setFullFormat(fullFormat: string): void;

	setHeight(height: number): void;

	setIndex(index: number): void;

	setRealFrameRate(realFrameRate: string): void;

	setSampleAspectRatio(sampleAspectRatio: string): void;

	setSampleFormat(sampleFormat: string): void;

	setSampleRate(sampleRate: number): void;

	setTimeBase(timeBase: string): void;

	setType(type: string): void;

	setWidth(width: number): void;
}

interface StreamMap {
	disabled: number;
	file_index: number;
	stream_index: number;
	sync_file_index: number;
	sync_stream_index: number;
	linklabel: string;
}
declare var StreamMap: interop.StructType<StreamMap>;

declare var abort_on_flags: number;

declare function assert_avoptions(m: interop.Pointer | interop.Reference<any>): void;

declare var audio_drift_threshold: number;

declare var audio_sync_method: number;

declare var audio_volume: number;

declare function cancel_operation(): void;

declare function check_filter_outputs(): void;

declare var codec_opts: interop.Pointer | interop.Reference<any>;

declare var copy_tb: number;

declare var copy_ts: number;

declare var debug_ts: number;

declare var do_benchmark: number;

declare var do_benchmark_all: number;

declare var do_deinterlace: number;

declare var do_hex_dump: number;

declare var do_pkt_dump: number;

declare var dts_delta_threshold: number;

declare var dts_error_threshold: number;

declare var ex_buf__: interop.Reference<number>;

declare var exit_on_error: number;

declare function exit_program(ret: number): void;

declare function ffmpeg_parse_options(argc: number, argv: interop.Pointer | interop.Reference<string>): number;

declare var filter_complex_nbthreads: number;

declare var filter_nbthreads: number;

declare const enum forced_keyframes_const {

	FKF_N = 0,

	FKF_N_FORCED = 1,

	FKF_PREV_FORCED_N = 2,

	FKF_PREV_FORCED_T = 3,

	FKF_T = 4,

	FKF_NB = 5
}

declare var forced_keyframes_const_names: interop.Reference<string>;

declare var format_opts: interop.Pointer | interop.Reference<any>;

declare var frame_bits_per_raw_sample: number;

declare var frame_drop_threshold: number;

declare function get_preset_file(filename: string, filename_size: number, preset_name: string, is_path: number, codec_name: string): interop.Pointer | interop.Reference<FILE>;

declare function grow_array(array: interop.Pointer | interop.Reference<any>, elem_size: number, size: interop.Pointer | interop.Reference<number>, new_size: number): interop.Pointer | interop.Reference<any>;

declare var hide_banner: number;

declare function hw_device_free_all(): void;

declare function init_dynload(): void;

declare function init_opts(): void;

declare var max_error_rate: number;

declare var nb_filtergraphs: number;

declare var nb_input_files: number;

declare var nb_input_streams: number;

declare var nb_output_files: number;

declare var nb_output_streams: number;

declare function opt_codec_debug(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function opt_cpuflags(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function opt_default(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function opt_loglevel(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function opt_max_alloc(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function opt_output_file(optctx: interop.Pointer | interop.Reference<any>, filename: string): void;

declare function opt_report(opt: string): number;

declare function opt_timelimit(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function parse_number_or_die(context: string, numstr: string, type: number, min: number, max: number): number;

declare function parse_time_or_die(context: string, timestr: string, is_duration: number): number;

declare function print_error(filename: string, err: number): void;

declare var print_stats: number;

declare var program_birth_year: number;

declare var program_name: interop.Reference<number>;

declare var qp_hist: number;

declare function read_yesno(): number;

declare function register_exit(cb: interop.FunctionReference<(p1: number) => void>): void;

declare function remove_avoptions(a: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, b: interop.Pointer | interop.Reference<any>): void;

declare var resample_opts: interop.Pointer | interop.Reference<any>;

declare var sdp_filename: string;

declare function set_report_callback(callback: interop.FunctionReference<(p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number) => void>): void;

declare function show_bsfs(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_buildconf(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_codecs(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_colors(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_decoders(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_demuxers(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_devices(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_encoders(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_filters(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_formats(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_help(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_help_default(opt: string, arg: string): void;

declare function show_layouts(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_license(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_muxers(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_pix_fmts(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_protocols(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_sample_fmts(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_sinks(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_sources(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare function show_usage(): void;

declare function show_version(optctx: interop.Pointer | interop.Reference<any>, opt: string, arg: string): number;

declare var start_at_zero: number;

declare var stdin_interaction: number;

declare var swr_opts: interop.Pointer | interop.Reference<any>;

declare var sws_dict: interop.Pointer | interop.Reference<any>;

declare function term_exit(): void;

declare function term_init(): void;

declare function uninit_opts(): void;

declare var video_sync_method: number;

declare var videotoolbox_pixfmt: string;

declare var vstats_filename: string;

declare var vstats_version: number;
