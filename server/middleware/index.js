var express = require('express'),
	helmet = require('helmet');

module.exports = function (app) {
	app.require('./helpers');

	app.use('/static', express.static('static'));

	helmet.defaults(app);

	app.use(require('body-parser')());
	app.use(require('cookie-parser')(app.get('cookie secret')));
	app.use(require('express-session')({
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
