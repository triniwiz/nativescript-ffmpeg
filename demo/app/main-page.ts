import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
import { FFmpeg } from 'nativescript-ffmpeg-plugin-fixed';
import * as fs from 'tns-core-modules/file-system';

let vm;

export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    vm = new HelloWorldModel();
    page.bindingContext = vm;
}

FFmpeg.enableStatisticsCallback(function(stats) {
    console.dir(stats);
});

export function convertToMp4() {
    const file = fs.path.join(fs.knownFolders.currentApp().path, 'assets/BigBuckBunny.mp4');
    const newPath = fs.path.join(fs.knownFolders.documents().path, 'assets');
    fs.Folder.fromPath(newPath); // creates new directory;
    const newFile = fs.path.join(fs.knownFolders.documents().path, 'assets/BigBuckBunny.mp4');
    if (fs.File.exists(newFile)) {
        console.log('oldFile size', fs.File.fromPath(file).size, 'newFile size', fs.File.fromPath(newFile).size);
        vm.set('src', newFile);
        getFileInfo();
    } else {
        FFmpeg.resetStatistics();
        FFmpeg.execute(`-i ${file} -r 15 -c:v mpeg4 ${newFile}`)
            .then(success => {
                console.log('success');
                vm.set('src', newFile);
                getFileInfo();
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export function getFileInfo() {
    const newFile = fs.path.join(fs.knownFolders.documents().path, 'assets/BigBuckBunny.mp4');
    FFmpeg.getMediaInformation(newFile)
        .then(info => {
            console.log(info);
        })
        .catch(error => {
            console.error(error.message);
        });
}
