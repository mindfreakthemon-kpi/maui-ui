module.exports = function (app) {
	var passport = require('passport'),
		GoogleStrategy = require('passport-google').Strategy;

	passport.use(new GoogleStrategy({
			returnURL: 'http://localhost/auth/google/return',
			realm: 'http://localhost',
			passReqToCallback: true
		},
		function (req, identifier, profile, done) {
			var User = app.get('models:User');

			User.auth(req, 'google', identifier, {
				name: profile.displayName
			}, done);
		}
	));
};
