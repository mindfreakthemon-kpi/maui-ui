var fs = require('fs'),
	path = require('path');

module.exports = function (app) {
	app.require = function (dirname) {
		console.log('require %s', dirname);

		var resolved = path.resolve(dirname),
			direct_file = path.extname(resolved) === '.js' ? resolved : resolved + '.js',
			index_file = path.join(resolved, 'index.js');

		if (fs.existsSync(direct_file) && fs.statSync(direct_file).isFile()) {
			console.log('directly requiring file %s', dirname);

			require(direct_file)(app);
		} else if (fs.existsSync(index_file)) {
			console.log('requiring index.js file in %s', dirname);

			require(index_file)(app);
		} else {
			console.log('reading dir %s', dirname);

			fs.readdirSync(dirname)
				.forEach(function (filename) {
					console.log('sub requiring %s in %s', filename, dirname);

					require(path.join(resolved, filename))(app);
				});
		}

	};
};
