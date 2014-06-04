var redis = require('redis'),
	url = require('url');

module.exports = function (app) {
	var client;

	if (process.env.REDISTOGO_URL) {
		var params = url.parse(process.env.REDISTOGO_URL);

		client = redis.createClient(params.port, params.hostname);
		client.auth(params.auth.split(':')[1]);
	} else {
		client = redis.createClient();
	}

	app.db.redis = client;
};
