var express = require('express');

module.exports = function (app) {
	var router = express.Router();

	router
		.all('*', app.helpers.loggedIn('/auth/login'))
		.get('/', app.helpers.render('dashboard/main'))
		.all('*', app.helpers.redirect('.'));

	app.use('/dashboard', router);
};
