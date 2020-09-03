const fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('./node_modules/@rpdg/epg-panel/dist/index.bundle.js', './src/js/epg.min.js', (err) => {
	if (err) {
		throw err;
	}
	console.log('epg.js was copied to src directory');
});
