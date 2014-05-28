var express = require('express'),
	helmet = require('helmet'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session);

module.exports = function (app) {
	app.require('./helpers');

	app.use('/static', express.static('static'));

	helmet.defaults(app);

	app.use(require('body-parser')());
	app.use(require('cookie-parser')(app.get('config:cookie-secret')));

	app.use(session({
		secret: app.get('config:session-secret'),
		store: new RedisStore({
			client: app.db.redis,
			prefix: app.get('config:session-redis-prefix')
		}),
		cookie: {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: app.get('config:session-maxAge')
		}
	}));

	require('./passport/index')(app);

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		next();
	});

	app.require('./routes');

	app.use(function (req, res) {
		res.render('error', {
			code: 404
		});
	});

	app.use(function (err, req, res, next) {
		res.render('error', {
			code: 500,
			error: err
		});
	});
};
