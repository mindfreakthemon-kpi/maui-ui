var express = require('express'),
	passport = require('passport');

module.exports = function (app) {
	var router = express.Router();

	router
		.all('*', function (req, res, next) {
			var url = req.protocol + '://' + req.get('host');

			passport._strategies.google._relyingParty.returnUrl = url + '/auth/google/callback';
			passport._strategies.google._relyingParty.realm = url;
			passport._strategies.github._callbackURL = url + '/auth/github/callback';
			passport._strategies.yandex._callbackURL = url + '/auth/yandex/callback';
			next();
		})

		.get('/google', passport.authenticate('google'))

		.get('/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/auth/login'
		}),
		app.helpers.loggedTo('/'))

		.get('/github', passport.authenticate('github'))

		.get('/github/callback',
		passport.authenticate('github', {
			failureRedirect: '/auth/login'
		}),
		app.helpers.loggedTo('/'))

		.get('/yandex', passport.authenticate('yandex'))

		.get('/yandex/callback',
		passport.authenticate('yandex', {
			failureRedirect: '/auth/login'
		}),
		app.helpers.loggedTo('/'))

		.get('/login',
		app.helpers.loggedOut('/'),
		app.helpers.redirect('/'))

		.get('/logout',
		app.helpers.loggedIn('login'),
		function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.use('/auth', router);
};
