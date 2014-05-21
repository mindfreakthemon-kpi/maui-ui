var express = require('express.io');

module.exports = function (app) {
	app.use(express.json());
	app.use(express.query());
	app.use(express.urlencoded());
	app.use(express.cookieParser(app.get('cookie secret')));
	app.use(express.session({
		secret: app.get('session secret')
	}));

	require('./passport/index')(app);

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		next();
	});

	app.use(app.router);

	app.use(function (req, res) {
		res.render('error', {
			code: 404
		});
	});

	app.use(function (err, req, res, next) {
		console.error(err.stack);
		res.render('error', {
			code: 500
		});
	});
};
