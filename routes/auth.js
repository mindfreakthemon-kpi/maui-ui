var passport = require('passport');

module.exports = function (app) {
	app.get('/auth/google', function (req, res, next) {
		var url = req.protocol + '://' + req.get('host');

		passport._strategies.google._relyingParty.returnUrl = url + '/auth/google/return';
		passport._strategies.google._relyingParty.realm = url;
		passport.authenticate('google')(req, res, next);
	});

	app.get('/auth/google/return',
		passport.authenticate('google', {
			// successRedirect: '/',
			failureRedirect: '/login'
		}),
		app.get('middlewares:logged-to')('/'));

//	app.post('/auth/ldap',
//		passport.authenticate('ldapauth', {
//			successRedirect: '/',
//			failureRedirect: '/login'
//		}));

	app.get('/login',
		app.get('middlewares:logged-out')('/'),
		function (req, res) {
			res.render('login');
		});

	app.get('/logout',
		app.get('middlewares:logged-in')('/login'),
		function (req, res) {
			req.logout();
			res.redirect('/');
		});
};
