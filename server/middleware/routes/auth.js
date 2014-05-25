var express = require('express'),
	passport = require('passport');

module.exports = function (app) {
	var router = express.Router();

	router
		.get('/google',
		function (req, res, next) {
			var url = req.protocol + '://' + req.get('host');

			passport._strategies.google._relyingParty.returnUrl = url + '/auth/google/return';
			passport._strategies.google._relyingParty.realm = url;
			passport.authenticate('google')(req, res, next);
		})

		.get('/google/return',
		passport.authenticate('google', {
			// let the middleware do the redirect
			// successRedirect: '/',
			failureRedirect: 'login'
		}),
		app.helpers.loggedTo('/'))

		.get('/login',
		app.helpers.loggedOut('/'),
		app.helpers.render('auth/login'))

		.get('/logout',
		app.helpers.loggedIn('login'),
		function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.use('/auth', router);
};
