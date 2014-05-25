var fs = require('fs'),
	path = require('path'),
	callerId = require('caller-id');

module.exports = function (app) {
	app.require = function (dirname) {
		var caller = callerId.getData(),
			resolved = path.resolve(path.dirname(caller.filePath), dirname),
			direct_file = path.extname(resolved) === '.js' ? resolved : resolved + '.js',
			index_file = path.join(resolved, 'index.js');

		if (fs.existsSync(direct_file) && fs.statSync(direct_file).isFile()) {
			require(direct_file)(app);
		} else if (fs.existsSync(index_file)) {
			require(index_file)(app);
		} else {
			fs.readdirSync(resolved)
				.forEach(function (filename) {
					require(path.join(resolved, filename))(app);
				});
		}
	};
};
