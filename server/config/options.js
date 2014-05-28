var crypto = require('crypto');

module.exports = function (app) {
	app.set('config:admin-key', process.env.ADMIN_KEY);
	app.set('config:backend-endpoint', process.env.BACKEND_ENDPOINT);
	app.set('config:backend-offline', process.env.BACKEND_OFFLINE);
	app.set('config:session-redis-prefix', 'session:');
	app.set('config:session-maxAge', 1000 * 60 * 60 * 24 * 2);
	app.set('config:session-secret', 'test');// || crypto.randomBytes(48).toString('hex'));
	app.set('config:cookie-secret', 'test');// || crypto.randomBytes(48).toString('hex'));
};
