var fs = require('fs'),
	path = require('path'),
	callerId = require('caller-id');

module.exports = function (app) {
	app.require = function (dirname) {
		var args = Array.prototype.slice.call(arguments, 1), // w/o dir
			caller = callerId.getData(),
			resolved = path.resolve(path.dirname(caller.filePath), dirname),
			direct_file = path.extname(resolved) === '.js' ? resolved : resolved + '.js',
			index_file = path.join(resolved, 'index.js');

		args.unshift(app);

		if (fs.existsSync(direct_file) && fs.statSync(direct_file).isFile()) {
			require(direct_file).apply(null, args);
		} else if (fs.existsSync(index_file)) {
			require(index_file).apply(null, args);
		} else {
			fs.readdirSync(resolved)
				.forEach(function (filename) {
					var file = path.join(resolved, filename);

					if (fs.statSync(file).isFile()) {
						require(file).apply(null, args);
					}
				});
		}
	};
};
