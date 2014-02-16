var passport = require('passport');

module.exports = function (app) {
	app.get('/auth/google', passport.authenticate('google'));

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

	app.get('/login', function(req, res){
		res.render('login');
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};
