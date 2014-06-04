module.exports = function (app) {
	var passport = require('passport'),
		GoogleStrategy = require('passport-google').Strategy;

	passport.use(new GoogleStrategy({
			// defaults, must be overridden in routes
			returnURL: 'http://localhost/auth/google/return',
			realm: 'http://localhost',
			passReqToCallback: true
		},
		function (req, identifier, profile, done) {
			var User = app.models.user;

			User.auth(req, 'google', identifier, {
				name: profile.displayName
			}, done);
		}
	));
};
