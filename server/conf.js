var nconf = require('nconf');

module.exports = function (app) {
	var conf = app.conf = app.locals.conf = nconf;

	conf.env({
		separator: '__',
		whitelist: [
			'backend__endpoint',
			'backend__offline',
			'admin__key',
			'cookie__secret',
			'session__secret',
			'passport__yandex__client_id',
			'passport__yandex__client_secret',
			'passport__github__client_id',
			'passport__github__client_secret'
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
