declare module com {
	export module github {
		export module triniwiz {
			export module fancyffmpeg {
				export class BuildConfig {
					public static class: java.lang.Class<com.github.triniwiz.fancyffmpeg.BuildConfig>;
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
}

declare module com {
	export module github {
		export module triniwiz {
			export module fancyffmpeg {
				export class FancyFFmpeg {
					public static class: java.lang.Class<com.github.triniwiz.fancyffmpeg.FancyFFmpeg>;
					public static getMediaInformation(param0: string, param1: java.lang.Long, param2: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static disableRedirection(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static executeWithArguments(param0: native.Array<string>, param1: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static disableLogs(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static enableStatisticsCallback(param0: com.github.triniwiz.fancyffmpeg.LogListener): void;
					public static cancel(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static resetStatistics(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getLastReturnCode(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static setFontconfigConfigurationPath(param0: string, param1: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getExternalLibraries(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static setFontDirectory(param0: globalAndroid.content.Context, param1: string, param2: java.util.Map<string,string>, param3: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static disableStatistics(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getFFmpegVersion(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public constructor();
					public static getPlatform(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getLogLevel(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getLastCommandOutput(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static execute(param0: string, param1: string, param2: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static enableLogCallback(param0: com.github.triniwiz.fancyffmpeg.LogListener): void;
					public static enableRedirection(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getMediaInformation(param0: string, param1: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static setLogLevel(param0: com.github.triniwiz.fancyffmpeg.LogLevel, param1: com.github.triniwiz.fancyffmpeg.Listener): void;
					public static getLastReceivedStatistics(param0: com.github.triniwiz.fancyffmpeg.Listener): void;
				}
			}
		}
	}
}

declare module com {
	export module github {
		export module triniwiz {
			export module fancyffmpeg {
				export class Listener {
					public static class: java.lang.Class<com.github.triniwiz.fancyffmpeg.Listener>;
					/**
					 * Constructs a new instance of the com.github.triniwiz.fancyffmpeg.Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onSuccess(param0: any): void;
						onError(param0: any): void;
					});
					public constructor();
					public onSuccess(param0: any): void;
					public onError(param0: any): void;
				}
			}
		}
	}
}

declare module com {
	export module github {
		export module triniwiz {
			export module fancyffmpeg {
				export class LogLevel {
					public static class: java.lang.Class<com.github.triniwiz.fancyffmpeg.LogLevel>;
					public static AV_LOG_QUIET: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_PANIC: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_FATAL: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_ERROR: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_WARNING: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_INFO: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_VERBOSE: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_DEBUG: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static AV_LOG_TRACE: com.github.triniwiz.fancyffmpeg.LogLevel;
					public static values(): native.Array<com.github.triniwiz.fancyffmpeg.LogLevel>;
					public static getLogLevelByValue(param0: number): com.github.triniwiz.fancyffmpeg.LogLevel;
					public static valueOf(param0: string): com.github.triniwiz.fancyffmpeg.LogLevel;
					public getLevel(): number;
				}
			}
		}
	}
}

declare module com {
	export module github {
		export module triniwiz {
			export module fancyffmpeg {
				export class LogListener {
					public static class: java.lang.Class<com.github.triniwiz.fancyffmpeg.LogListener>;
					/**
					 * Constructs a new instance of the com.github.triniwiz.fancyffmpeg.LogListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onResult(param0: any): void;
					});
					public constructor();
					public onResult(param0: any): void;
				}
			}
		}
	}
}

//Generics information:

