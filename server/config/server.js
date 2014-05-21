var crypto = require('crypto');

module.exports = function (app) {
	app.set('domain', 'localhost');
	app.set('views', './server/views');
	app.set('view engine', 'jade');

	var sessionSecret = process.env.SESSION_SECRET,
		cookieSecret = process.env.COOKIE_SECRET;

	if (!sessionSecret) {
		try {
			sessionSecret = crypto.randomBytes(48).toString('hex');
		} catch (e) {
			sessionSecret = Math.random();
		}
	}

	if (!cookieSecret) {
		try {
			cookieSecret = crypto.randomBytes(48).toString('hex');
		} catch (e) {
			cookieSecret = Math.random();
		}
	}

	app.set('session secret', sessionSecret);
	app.set('cookie secret', cookieSecret);
};
