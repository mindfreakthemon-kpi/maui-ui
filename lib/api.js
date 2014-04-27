var request = require('request');

module.exports = function (app) {
	var endpoint = app.get('backend endpoint'),
		api = app.api = {};

	function offlineMock(callback) {
		if (app.get('backend offline')) {
			callback(true);

			return true;
		}

		return false;
	}

	// @todo add cache
	api.getParams = function (type, callback) {
		if (offlineMock(callback)) {
			return;
		}

		request.get({
			url: endpoint + 'param/' + type,
			json: true
		}, callback);
	};

	api.makeRequest = function (json, callback) {
		if (offlineMock(callback)) {
			return;
		}

		request.post({
			url: endpoint + 'newpostrequest',
			json: {
				request: json
			}
		}, callback);
	};

	api.getStatus = function (id, callback) {
		if (offlineMock(callback)) {
			return;
		}

		request.post({
			url: endpoint + 'type',
			json: true
		}, callback);
	};
};
