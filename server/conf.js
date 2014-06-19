var nconf = require('nconf'),
	events = require('events'),
	util = require('util');

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
		port: 8080,
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
			offline: true
		},
		passport: {
			yandex: {
				client_id: 'undefined',
				client_secret: 'undefined'
			},
			github: {
				client_id: 'undefined',
				client_secret: 'undefined'
			}
		}
	});

	/* Event emitting for nconf */
	util._extend(conf, events.EventEmitter.prototype);

	var _set = conf.set;

	conf.set = function () {
		var args = Array.prototype.slice.call(arguments, 0);

		_set.apply(this, args);

		// (propName, value)
		this.emit.apply(this, ['set'].concat(args));
		// (value)
		this.emit.apply(this, ['set:' + args.shift()].concat(args));
	};
};
