var express = require('express.io');

module.exports = function (app) {
	app.use(express.json());
	app.use(express.query());
	app.use(express.urlencoded());
	app.use(express.cookieParser('TEST'));
	app.use(express.session({
		secret: 'TEST'
	}));

	require('./passport')(app);

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		next();
	});
};
