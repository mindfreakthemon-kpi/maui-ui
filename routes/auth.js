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
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.post('/auth/ldap',
		passport.authenticate('ldapauth', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.get('/login', function (req, res) {
		res.render('login');
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};
