var express = require('express'),
	helmet = require('helmet'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	winston = require('winston'),
	passport = require('passport'),
	logger = require('express-winston');

module.exports = function (app) {
	app.use('/static', express.static('static'));

	helmet.defaults(app);

	app.use(require('body-parser')());
	app.use(require('cookie-parser')(app.conf.get('cookie:secret')));

	app.use(session({
		secret: app.conf.get('session:secret'),
		store: new RedisStore({
			client: app.db.redis,
			prefix: app.conf.get('session:prefix')
		}),
		cookie: {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: app.conf.get('session:maxAge')
		}
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function (req, res, next) {
		res.locals.conf = app.conf;
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		next();
	});

	app.use(logger.logger({
		transports: [
			new winston.transports.Console({
				json: false,
				colorize: true
			})
		]
	}));

	app.require('./routes');

	app.use(function (req, res) {
		res.status(404);

		res.render('error', {
			code: 404
		});
	});

	app.use(logger.errorLogger({
		transports: [
			new winston.transports.Console({
				json: true,
				colorize: true
			})
		]
	}));

	app.use(function (err, req, res, next) {
		res.render('error', {
			code: 500,
			error: err
		});
	});
};
