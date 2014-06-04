var nconf = require('nconf');

module.exports = function (app) {
	var conf = app.conf = nconf;

	conf.env({
		separator: '__',
		whitelist: [
			'BACKEND__ENDPOINT',
			'BACKEND__OFFLINE',
			'ADMIN__KEY',
			'COOKIE_SECRET',
			'SESSION_SECRET'
		]
	});

	conf.file('config.json');

	conf.loadFilesSync();

	conf.defaults({
		admin: {
			key: null
		},
		session: {
			prefix: 'session:',
			maxAge: 1000 * 60 * 60 * 24 * 2,
			secret: 'default'
		},
		cookie: {
			secret: 'default'
		},
		backend: {
			endpoint: '',
			offline: false
		},
		passport: {
			yandex: {
				client_id: '',
				client_secret: '',
				callback_url: ''
			},
			github: {
				client_id: '',
				client_secret: '',
				callback_url: ''
			}
		}
	});
};
