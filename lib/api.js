var request = require('request');

module.exports = function (app) {
	var endpoint = app.get('backend endpoint'),
		api = app.api = {};

	// @todo add cache
	api.getParams = function (type, callback) {
		request.get({
			url: endpoint + 'param/' + type,
			json: true
		}, callback);
	};

	api.makeRequest = function (callback) {
		request.post({
			url: endpoint + 'postrequest',
			json: {
				request: {
					name: 'pikachu',
					priority: 42
				}
			}
		}, callback);
	};
};
