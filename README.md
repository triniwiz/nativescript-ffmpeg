# NativeScript FFmpeg

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/triniwiz/nativescript-ffmpeg.svg?branch=master
[build-url]:https://travis-ci.org/triniwiz/nativescript-ffmpeg
[npm-image]:http://img.shields.io/npm/v/nativescript-ffmpeg-plugin.svg
[npm-url]:https://npmjs.org/package/nativescript-ffmpeg-plugin
[downloads-image]:http://img.shields.io/npm/dm/nativescript-ffmpeg-plugin.svg
[twitter-image]:https://img.shields.io/twitter/follow/triniwiz.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/triniwiz

## Installation

```javascript
tns plugin add nativescript-ffmpeg-plugin
```

## Usage

1. Execute commands.

    - Use execute() method with a single command line and an argument delimiter

    ```
    import { LogLevel, FFmpeg } from 'nativescript-ffmpeg-plugin';

    FFmpeg.execute('-i file1.mp4 -c:v mpeg4 file2.mp4', ' ').then(result => console.log("FFmpeg process exited with result " + result));
    ```

    - Use executeWithArguments() method with an array of arguments

    ```
    import { LogLevel, FFmpeg } from 'nativescript-ffmpeg-plugin';

    FFmpeg.executeWithArguments(["-i", "file1.mp4", "-c:v", "mpeg4", "file2.mp4"]).then(result => console.log("FFmpeg process exited with result " + result));
    ```

2. Check execution output. Zero represents successful execution, non-zero values represent failure.
    ```
    FFmpeg.getLastReturnCode().then(result => {
        console.log("Last return code: " + result);
    });

    FFmpeg.getLastCommandOutput().then(result => {
        console.log("Last command output: " + result;
    });
    ```

3. Stop an ongoing operation.
    ```
    FFmpeg.cancel();
    ```

4. Get media information for a file.
    - Print all fields
    ```
    FFmpeg.getMediaInformation('<file path or uri>').then(info => {
        console.log('Result: ' + JSON.stringify(info));
    });
    ```
    - Print selected fields
    ```
    FFmpeg.getMediaInformation('<file path or uri>').then(info => {
        console.log('Result: ' + JSON.stringify(info));
        console.log('Media Information');
        console.log('Path: ' + info.path);
        console.log('Format: ' + info.format);
        console.log('Duration: ' + info.duration);
        console.log('Start time: ' + info.startTime);
        console.log('Bitrate: ' + info.bitrate);
        if (info.streams) {
            for (var i = 0; i < info.streams.length; i++) {
                console.log('Stream id: ' + info.streams[i].index);
                console.log('Stream type: ' + info.streams[i].type);
                console.log('Stream codec: ' + info.streams[i].codec);
                console.log('Stream full codec: ' + info.streams[i].fullCodec);
                console.log('Stream format: ' + info.streams[i].format);
                console.log('Stream full format: ' + info.streams[i].fullFormat);
                console.log('Stream width: ' + info.streams[i].width);
                console.log('Stream height: ' + info.streams[i].height);
                console.log('Stream bitrate: ' + info.streams[i].bitrate);
                console.log('Stream sample rate: ' + info.streams[i].sampleRate);
                console.log('Stream sample format: ' + info.streams[i].sampleFormat);
                console.log('Stream channel layout: ' + info.streams[i].channelLayout);
                console.log('Stream sar: ' + info.streams[i].sampleAspectRatio);
                console.log('Stream dar: ' + info.streams[i].displayAspectRatio);
                console.log('Stream average frame rate: ' + info.streams[i].averageFrameRate);
                console.log('Stream real frame rate: ' + info.streams[i].realFrameRate);
                console.log('Stream time base: ' + info.streams[i].timeBase);
                console.log('Stream codec time base: ' + info.streams[i].codecTimeBase);
            }
        }
    });
    ```

5. Enable log callback and redirect all `FFmpeg` logs to a console/file/widget.
    ```
    logCallback = (logData) => {
        console.log(logData.text);
    };
    ...
    FFmpeg.enableLogCallback(logCallback);
    ```

6. Enable statistics callback and follow the progress of an ongoing operation.
    ```
    statisticsCallback = (statisticsData) => {
        console.log('Statistics; frame: ' + statisticsData.videoFrameNumber.toFixed(1) + ', fps: ' + statisticsData.videoFps.toFixed(1) + ', quality: ' + statisticsData.videoQuality.toFixed(1) +
        ', size: ' + statisticsData.size + ', time: ' + statisticsData.time);
    };
    ...
    FFmpeg.enableStatisticsCallback(statisticsCallback);
    ```

7. Poll statistics without implementing statistics callback.
    ```
    FFmpeg.getLastReceivedStatistics().then(stats => console.log('Stats: ' + JSON.stringify(stats)));
    ```

8. Reset statistics before starting a new operation.
    ```
    FFmpeg.resetStatistics();
    ```

9. Set log level.
    ```
    FFmpeg.setLogLevel(LogLevel.AV_LOG_WARNING);
    ```

10. Register your own fonts by specifying a custom fonts directory, so they are available to use in `FFmpeg` filters. Please note that this function can not work on relative paths, you need to provide full file system path.
    - Without any font name mappings
    ```
    FFmpeg.setFontDirectory('<folder with fonts>', null);
    ```
    - Apply custom font name mappings. This functionality is very useful if your font name includes ' ' (space) characters in it.
    ```
    FFmpeg.setFontDirectory('<folder with fonts>', { my_easy_font_name: "my complex font name" });
    ```

11. Use your own `fontconfig` configuration.
    ```
    FFmpeg.setFontconfigConfigurationPath('<fontconfig configuration directory>');
    ```

12. Disable log functionality of the library. Logs will not be printed to console and log callback will be disabled.
    ```
    FFmpeg.disableLogs();
    ```

13. Disable statistics functionality of the library. Statistics callback will be disabled but the last received statistics data will be still available.
    ```
    FFmpeg.disableStatistics();
    ```

14. List enabled external libraries.
    ```
    FFmpeg.getExternalLibraries().then(externalLibraries => {
        console.log(externalLibraries);
    });
    ```
## License

Apache License Version 2.0, January 2004

## See Also

- [FFmpeg](https://www.ffmpeg.org)
- [Mobile FFmpeg Wiki](https://github.com/tanersener/mobile-ffmpeg/wiki)
- [FFmpeg License and Legal Considerations](https://ffmpeg.org/legal.html)
