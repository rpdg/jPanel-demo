/// <reference path="./@types/fis.d.ts" />

fis.set('project.fileType.text', 'ts');

if (!fis.util.isFile('./src/js/epg.min.js')) {
	fis.log.warn('copy node_modules/epg-panel/dist/index.bundle.js');
	fis.util.copy('./node_modules/epg-panel/dist/index.bundle.js' , './src/js/epg.min.js');
}


let currentMedia = fis.project.currentMedia();

fis.match('**.html', {
	parser: fis.plugin('art-template4', {
		define: {},
	}),
	useMap: true,
	rExt: '.html',
});

fis.match('**/*.ts', {
	parser: fis.plugin('typescript', {
		sourceMap: false,
		showNotices: false,
		strictNullChecks: true,
		/**
		 * None = 0,
		 * CommonJS = 1,
		 * AMD = 2,
		 * UMD = 3,
		 * System = 4,
		 * ES2015 = 5,
		 * ES2020 = 6,
		 * ESNext = 99
		 */
		module: 0,
		/**
		 * ES3 = 0,
		 * ES5 = 1,
		 * ES2015 = 2,
		 * ES2016 = 3,
		 * ES2017 = 4,
		 * ES2018 = 5,
		 * ES2019 = 6,
		 * ES2020 = 7,
		 * ESNext = 99,
		 * JSON = 100,
		 */
		target: 2,
	}),
	rExt: '.js',
	release: false,
});

// SCSS Compile
fis.match('{*.scss , *.html:scss}', {
	parser: fis.plugin('node-sass', {
		outputStyle: 'compact',
		sourceMap: true,
	}),
	rExt: '.css',
});

fis.match('{/@types/*.*, /layouts/**.*, *.json , *.ts}', {
	release: false,
}).match('*.{js,css,jpg,png,gif}', {
	useHash: true, // 默认的md5 戳
});

fis.match('**/*.*' , {
	url : '.$0',
})


fis.on('release:end', function () {
	fis.time(new Date().toLocaleString());
});
