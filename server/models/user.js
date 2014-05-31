var model = require('nodejs-model'),
	uuid = require('node-uuid');

module.exports = function (app) {
	var redis = app.db.redis;

	var User = app.models.user = model('User')
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

	model.patch(User, 'users');

	User.init = function (instance) {
		instance.creationDate(+new Date());
		instance.id(uuid.v4());
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

	User.remove = function (id, done) {
		var queue = redis.multi();

		queue.del('users:' + id);

		redis.keys('accounts:*:' + id, function (error, keys) {
			if (error) {
				done(error);
				return;
			}

			if (keys) {
				keys.forEach(function (key) {
					queue.del(key);
				});
			}

			queue.exec(done);
		});
	};
};
