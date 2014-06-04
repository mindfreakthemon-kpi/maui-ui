var nconf = require('nconf');

module.exports = function (app) {
	var conf = app.conf = nconf;

	conf.env({
		separator: '__',
		whitelist: [
			'BACKEND__ENDPOINT',
			'BACKEND__OFFLINE',
			'ADMIN__KEY',
			'COOKIE__SECRET',
			'SESSION__SECRET',
			'PASSPORT__YANDEX__CLIENT_ID',
			'PASSPORT__YANDEX__CLIENT_SECRET',
			'PASSPORT__GITHUB__CLIENT_ID',
			'PASSPORT__GITHUB__CLIENT_SECRET'
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
				client_secret: ''
			},
			github: {
				client_id: '',
				client_secret: ''
			}
		}
	});
};
