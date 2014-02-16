var fs = require('fs'),
	path = require('path');

module.exports = function (dirname, index_path) {
	var index_name = path.basename(index_path);

	return function (app) {
		fs.readdirSync(dirname)
			.forEach(function (filename) {
				if (filename === index_name) {
					return;
				}

				console.log(dirname, filename);

				require(path.join(dirname, filename))(app);
			});
	};
};

