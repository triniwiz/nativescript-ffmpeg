declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class Abi {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.Abi>;
				public static ABI_ARMV7A_NEON: com.arthenica.mobileffmpeg.Abi;
				public static ABI_ARMV7A: com.arthenica.mobileffmpeg.Abi;
				public static ABI_ARM: com.arthenica.mobileffmpeg.Abi;
				public static ABI_X86: com.arthenica.mobileffmpeg.Abi;
				public static ABI_X86_64: com.arthenica.mobileffmpeg.Abi;
				public static ABI_ARM64_V8A: com.arthenica.mobileffmpeg.Abi;
				public static ABI_UNKNOWN: com.arthenica.mobileffmpeg.Abi;
				public static from(param0: string): com.arthenica.mobileffmpeg.Abi;
				public static valueOf(param0: string): com.arthenica.mobileffmpeg.Abi;
				public static values(): native.Array<com.arthenica.mobileffmpeg.Abi>;
				public getName(): string;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class AbiDetect {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.AbiDetect>;
				public static getNativeCpuAbi(): string;
				public static getAbi(): string;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class BuildConfig {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.BuildConfig>;
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class Config {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.Config>;
				public static TAG: string;
				public static getExternalLibraries(): java.util.List<string>;
				public static enableStatisticsCallback(param0: com.arthenica.mobileffmpeg.StatisticsCallback): void;
				public static getPackageName(): string;
				public static setFontDirectory(param0: globalAndroid.content.Context, param1: string, param2: java.util.Map<string,string>): void;
				public static enableRedirection(): void;
				public static enableLogCallback(param0: com.arthenica.mobileffmpeg.LogCallback): void;
				public static setFontconfigConfigurationPath(param0: string): void;
				public static disableRedirection(): void;
				public static setLogLevel(param0: com.arthenica.mobileffmpeg.Level): void;
				public static getLastReceivedStatistics(): com.arthenica.mobileffmpeg.Statistics;
				public static getLogLevel(): com.arthenica.mobileffmpeg.Level;
				public static resetStatistics(): void;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class FFmpeg {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.FFmpeg>;
				public static RETURN_CODE_SUCCESS: number;
				public static RETURN_CODE_CANCEL: number;
				public static getMediaInformation(param0: string, param1: java.lang.Long): com.arthenica.mobileffmpeg.MediaInformation;
				public static getMediaInformation(param0: string): com.arthenica.mobileffmpeg.MediaInformation;
				public static isLTSBuild(): boolean;
				public static execute(param0: string, param1: string): number;
				public static getLastReturnCode(): number;
				public static getFFmpegVersion(): string;
				public static execute(param0: string): number;
				public static getVersion(): string;
				public static execute(param0: native.Array<string>): number;
				public static cancel(): void;
				public static getLastCommandOutput(): string;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class Level {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.Level>;
				public static AV_LOG_QUIET: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_PANIC: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_FATAL: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_ERROR: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_WARNING: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_INFO: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_VERBOSE: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_DEBUG: com.arthenica.mobileffmpeg.Level;
				public static AV_LOG_TRACE: com.arthenica.mobileffmpeg.Level;
				public static valueOf(param0: string): com.arthenica.mobileffmpeg.Level;
				public static from(param0: number): com.arthenica.mobileffmpeg.Level;
				public static values(): native.Array<com.arthenica.mobileffmpeg.Level>;
				public getValue(): number;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class LogCallback {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.LogCallback>;
				/**
				 * Constructs a new instance of the com.arthenica.mobileffmpeg.LogCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					apply(param0: com.arthenica.mobileffmpeg.LogMessage): void;
				});
				public constructor();
				public apply(param0: com.arthenica.mobileffmpeg.LogMessage): void;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class LogMessage {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.LogMessage>;
				public constructor(param0: com.arthenica.mobileffmpeg.Level, param1: string);
				public getLevel(): com.arthenica.mobileffmpeg.Level;
				public getText(): string;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class MediaInformation {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.MediaInformation>;
				public setFormat(param0: string): void;
				public setBitrate(param0: java.lang.Long): void;
				public addMetadata(param0: string, param1: string): void;
				public getFormat(): string;
				public setDuration(param0: java.lang.Long): void;
				public getBitrate(): java.lang.Long;
				public setStartTime(param0: java.lang.Long): void;
				public getPath(): string;
				public getDuration(): java.lang.Long;
				public getStartTime(): java.lang.Long;
				public constructor();
				public getRawInformation(): string;
				public getStreams(): java.util.List<com.arthenica.mobileffmpeg.StreamInformation>;
				public setRawInformation(param0: string): void;
				public getMetadataEntries(): java.util.Set<java.util.Map.Entry<string,string>>;
				public setPath(param0: string): void;
				public addStream(param0: com.arthenica.mobileffmpeg.StreamInformation): void;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class MediaInformationParser {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.MediaInformationParser>;
				public static DURATION_FORMAT: java.text.SimpleDateFormat;
				public static REFERENCE_DURATION: java.util.Date;
				public static from(param0: string): com.arthenica.mobileffmpeg.MediaInformation;
				public static index(param0: string, param1: string, param2: number, param3: number): number;
				public static count(param0: string, param1: string): number;
				public static substring(param0: string, param1: string, param2: java.util.List<string>): string;
				public static substring(param0: string, param1: string, param2: string, param3: java.util.List<string>): string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class Packages {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.Packages>;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class Statistics {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.Statistics>;
				public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number);
				public getVideoQuality(): number;
				public setSize(param0: number): void;
				public getTime(): number;
				public setBitrate(param0: number): void;
				public getBitrate(): number;
				public constructor();
				public setVideoFps(param0: number): void;
				public setVideoQuality(param0: number): void;
				public getSize(): number;
				public update(param0: com.arthenica.mobileffmpeg.Statistics): void;
				public setVideoFrameNumber(param0: number): void;
				public getSpeed(): number;
				public setSpeed(param0: number): void;
				public setTime(param0: number): void;
				public getVideoFrameNumber(): number;
				public getVideoFps(): number;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class StatisticsCallback {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.StatisticsCallback>;
				/**
				 * Constructs a new instance of the com.arthenica.mobileffmpeg.StatisticsCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					apply(param0: com.arthenica.mobileffmpeg.Statistics): void;
				});
				public constructor();
				public apply(param0: com.arthenica.mobileffmpeg.Statistics): void;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export class StreamInformation {
				public static class: java.lang.Class<com.arthenica.mobileffmpeg.StreamInformation>;
				public setRealFrameRate(param0: string): void;
				public setWidth(param0: java.lang.Long): void;
				public getRealFrameRate(): string;
				public getBitrate(): java.lang.Long;
				public getSampleFormat(): string;
				public getDisplayAspectRatio(): string;
				public getCodec(): string;
				public setType(param0: string): void;
				public setTimeBase(param0: string): void;
				public constructor();
				public getChannelLayout(): string;
				public setIndex(param0: java.lang.Long): void;
				public setCodec(param0: string): void;
				public setCodecTimeBase(param0: string): void;
				public getSampleAspectRatio(): string;
				public getAverageFrameRate(): string;
				public setChannelLayout(param0: string): void;
				public getFullCodec(): string;
				public getTimeBase(): string;
				public getSampleRate(): java.lang.Long;
				public getType(): string;
				public setFormat(param0: string): void;
				public setBitrate(param0: java.lang.Long): void;
				public addMetadata(param0: string, param1: string): void;
				public getFormat(): string;
				public setSampleRate(param0: java.lang.Long): void;
				public setSampleAspectRatio(param0: string): void;
				public getFullFormat(): string;
				public getCodecTimeBase(): string;
				public setDisplayAspectRatio(param0: string): void;
				public getMetadataEntries(): java.util.Set<java.util.Map.Entry<string,string>>;
				public getHeight(): java.lang.Long;
				public setSampleFormat(param0: string): void;
				public setAverageFrameRate(param0: string): void;
				public setFullFormat(param0: string): void;
				public getWidth(): java.lang.Long;
				public setFullCodec(param0: string): void;
				public setHeight(param0: java.lang.Long): void;
				public getIndex(): java.lang.Long;
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export module util {
				export class Pair<A, B>  extends java.lang.Object {
					public static class: java.lang.Class<com.arthenica.mobileffmpeg.util.Pair<any,any>>;
					public first: A;
					public second: B;
					public getSecond(): B;
					public constructor(param0: A, param1: B);
					public getFirst(): A;
				}
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export module util {
				export class RunCallback {
					public static class: java.lang.Class<com.arthenica.mobileffmpeg.util.RunCallback>;
					/**
					 * Constructs a new instance of the com.arthenica.mobileffmpeg.util.RunCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						apply(param0: number): void;
					});
					public constructor();
					public apply(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module arthenica {
		export module mobileffmpeg {
			export module util {
				export class Trio<A, B, C>  extends java.lang.Object {
					public static class: java.lang.Class<com.arthenica.mobileffmpeg.util.Trio<any,any,any>>;
					public first: A;
					public second: B;
					public third: C;
					public getSecond(): B;
					public constructor(param0: A, param1: B, param2: C);
					public getThird(): C;
					public getFirst(): A;
				}
			}
		}
	}
}

//Generics information:
//com.arthenica.mobileffmpeg.util.Pair:2
//com.arthenica.mobileffmpeg.util.Trio:3

