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

		app.logger.info('[OUT] making %s request to %s', method, path, {
			json: json
		});

		request({
			url: endpoint + path,
			method: method,
			json: json
		}, function (error, response, json) {
			if (error) {
				app.logger.warn('[IN] error while making %s request to %s: %s', method, path, error);
			} else {
				app.logger.info('[IN] received response from a %s request to %s', method, path);
			}

			callback.apply(null, arguments);
		});
	}

	api.get = api.bind(api, 'get');
	api.post = api.bind(api, 'post');
	api.del = api.bind(api, 'delete');

	app.api = api;
};
