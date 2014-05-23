var model = require('nodejs-model'),
	uuid = require('node-uuid');

module.exports = function (app) {
	var redis = app.get('databases:redis');

	var User = model('User')
		.attr('id', {
			tags: ['private']
		})
		.attr('name')
		.attr('creation_date', {
			tags: ['private']
		})
		.attr('role', {
			tags: ['private']
		})
		.attr('password', {
			validations: {
				length: {
					minimum: 5,
					maximum: 20
				}
			},
			tags: ['private']
		})
		.attr('google_id', {
			tags: ['accounts']
		})
		.attr('ldap_id', {
			tags: ['accounts']
		});

	User.init = function (instance) {
		instance.creationDate(+new Date());
		instance.id(uuid.v4());
	};

	/**
	 * Loads user from redis by it's id
	 * @param id
	 * @param done
	 */
	User.load = function (id, done) {
		redis.hgetall('users:' + id, function (error, data) {
			if (error) {
				done(error);
				return;
			}

			var instance = User.create();

			if (data) {
				instance.update(data, '*');
			}

			done(null, instance);
		});
	};

	/**
	 * Authenticates current user or create account
	 * @param req
	 * @param provider
	 * @param id
	 * @param data
	 * @param done
	 */
	User.auth = function (req, provider, id, data, done) {
		var instance,
			providerField = provider + 'Id';

		function callback(error, instance) {
			if (error) {
				done(error);
				return;
			}

			instance[providerField](id);
			instance.update(data);

			redis.set('accounts:' + provider + ':' + id, instance.id());

			User.save(instance, done);
		}

		if (req.user) {
			// already logged in user
			instance = req.user;

			if (instance[providerField]()) {
				// already got it, remove reference
				redis.del('accounts:' + provider + ':' + instance[providerField]());
			}

			callback(null, instance);
		} else {
			// try to find one
			redis.get('accounts:' + provider + ':' + id, function (error, id) {
				if (error) {
					done(error);
					return;
				}

				if (id) {
					User.load(id, callback);
				} else {
					callback(null, User.create());
				}
			});
		}
	};

	User.save = function (instance, done) {
		redis.hmset('users:' + instance.id(), instance.toJSON('*'), function (error) {
			if (error) {
				done(error);
				return;
			}

			done(null, instance);
		});
	};

	/**
	 * Saving model to apps config
	 */
	app.set('models:User', User);

	/**
	 * For ensuring that user is logged in
	 */
	app.set('middlewares:logged-in', function (url, params) {
		return function (req, res, next) {
			if (!req.user) {
				if (req.session) {
					req.session.returnTo = req.originalUrl || req.url;
				}

				res.redirect(
					app.reverse(url, params));
				return;
			}

			next();
		};
	});

	/**
	 * For ensuring that user is logged out
	 */
	app.set('middlewares:logged-out', function (url, params) {
		return function (req, res, next) {
			if (req.user) {
				res.redirect(
					app.reverse(url, params));
				return;
			}

			next();
		};
	});

	app.set('middlewares:logged-to', function (url, params) {
		return function (req, res) {
			if (req.session && req.session.returnTo) {
				res.redirect(req.session.returnTo);

				delete req.session.returnTo;

				return;
			}

			res.redirect(
				app.reverse(url, params));
		};
	});
};
