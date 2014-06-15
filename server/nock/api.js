var url = require('url'),
	nock = require('nock'),
	http = require('http'),
	request = require('request');

module.exports = function (app) {
	var endpoint = app.conf.get('backend:endpoint'),
		u = url.parse(endpoint);

	function setup() {
		console.log('setuping stuff');
		var scope = nock(endpoint);

		scope
			.persist()
			.filteringPath(/\?.+$/g, '')
			.get(u.path + 'requests')
			.replyWithFile(200, './server/nock/mock/tasks.json');
	}

	app.conf.on('set:backend:offline', function (val) {
		console.log('cleaning stuff');
		nock.cleanAll();

		if (val) {
			setup();
		}
	});

	if (app.conf.get('backend:offline')) {
		setup();
	}
};
