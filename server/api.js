var request = require('request');

module.exports = function (app) {
	function api(method, path) {
		var offline = app.get('config:backend-offline'),
			endpoint = app.get('config:backend-endpoint'),
			callback,
			json = true;

		if (arguments.length < 3) {
			throw new TypeError();
		}

		if (arguments.length === 3) {
			callback = arguments[2];
		} else if (arguments.length > 3) {
			json = arguments[2];
			callback = arguments[3];
		}

		if (offline || !endpoint) {
			callback(true);
			return;
		}

		request({
			url: endpoint + path,
			method: method,
			json: json
		}, callback);
	}

	api.get = api.bind(api, 'get');
	api.post = api.bind(api, 'post');

	app.api = api;
};
