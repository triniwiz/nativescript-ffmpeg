const fs = require('fs');
const path = require('path');

module.exports = function ($logger, $projectData, hookArgs) {
	return new Promise(function (resolve, reject) {
		if (hookArgs.platform.toLowerCase() === 'android') {
			$logger.out('Configuring FFmpeg');
			let projectManifestPath = path.join($projectData.platformsDir, 'android','app', 'src', 'main', 'AndroidManifest.xml');
			if (fs.existsSync(projectManifestPath)) {
				let projectManifestContent = fs.readFileSync(projectManifestPath).toString();
				if (projectManifestContent.indexOf('xmlns:tools="http://schemas.android.com/tools"') > -1 && projectManifestContent.indexOf('tools:replace="android:icon"') > -1) {
					resolve();
				} else {
					let newContent = projectManifestContent.replace('<manifest', '<manifest xmlns:tools="http://schemas.android.com/tools" ').replace('<application', '<application tools:replace="android:icon" ');
					fs.writeFileSync(projectManifestPath, newContent);
					resolve();
				}
			}
		} else {
			resolve();
		}
	});
};
