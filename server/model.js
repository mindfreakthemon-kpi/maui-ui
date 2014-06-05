var constructor = require('nodejs-model');

function patch(redis, model, prefix) {
	model.load = function (id, done) {
		redis.hgetall(prefix + ':' + id, function (error, data) {
			if (error) {
				done(error);
				return;
			}

			var instance = model.create();

			if (data) {
				instance.update(data, '*');
			}

			done(null, instance);
		});
	};

	model.save = function (instance, done) {
		redis.hmset(prefix + ':' + instance.id(), instance.toJSON('*'), function (error) {
			if (error) {
				done(error);
				return;
			}

			done(null, instance);
		});
	};

	model.remove = function (id, done) {
		redis.del(prefix + ':' + id, done);
	};

	model.clear = function (done) {
		redis.keys(prefix + ':*', function (error, keys) {
			if (error) {
				done(error);
				return;
			}

			if (keys) {
				var queue = redis.multi();

				keys.forEach(function (key) {
					queue.del(key);
				});

				queue.exec(done);
			}
		});
	};

	model.wrap = function wrap(data) {
		if (data instanceof Array) {
			return data
				.filter(function (v) {
					return !!v;
				})
				.map(wrap);
		}

		var instance = model.create();

		instance.update(data, '*');

		return instance;
	};

	model.list = function list(array, done) {
		if (arguments.length === 1) {
			done = array;

			redis.keys(prefix + ':*', function (error, keys) {
				if (error) {
					done(error);
					return;
				}

				array = keys.map(function (key) {
					return key.replace(prefix + ':', '');
				});

				list(array, done);
			});

			return;
		} else if (!array) {
			done(null, []);

			return;
		}

		var queue = redis.multi();

		array.forEach(function (id) {
			queue.hgetall(prefix + ':' + id);
		});

		queue.exec(function (error, tasks) {
			if (error) {
				done(error);
				return;
			}

			done(null, model.wrap(tasks));
		});
	};

	model.on('model:created', function (instance) {
		var update = instance.update;

		instance.update = function (object, tags) {
			update.call(this, object, tags);

			var attrs = this.attrs;

			Object.keys(attrs)
				.forEach(function (key) {
					if (typeof attrs[key] === 'undefined' || attrs[key] === null) {
						delete attrs[key];
					}
				}, this);

			return this;
		};

		instance.defaults = function (object, tags) {
			var json = this.toJSON('*');

			this.update(object, tags || '*');
			this.update(json, '*');
		};
	});
}

module.exports = function (app) {
	constructor.patch = patch.bind(null, app.db.redis);
};
