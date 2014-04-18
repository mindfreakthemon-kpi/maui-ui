module.exports = function (app) {
	var map = {},
		_route = app._router.route;

	app._router.route = function () {
		if (arguments.length > 2) {
			if (typeof arguments[2] === 'string') {
				var name = arguments[1];

				map[name] = arguments[2];

				Array.prototype.splice.call(arguments, 1, 1);
			}
		}

		_route.apply(this, arguments);
	};

	app.reverse = function (name, obj) {
		var url = map[name];

		if (!url) {
			return name;
		}

		return url.replace(/(\/:\w+\??)/g, function (m, c) {
			c = c.replace(/[/:?]/g, '');
			return obj.hasOwnProperty(c) ? '/' + obj[c] : '';
		});
	};
};
