module.exports = function (app) {
	var passport = require('passport'),
		GoogleStrategy = require('passport-google').Strategy;

	passport.use(new GoogleStrategy({
			returnURL: 'http://localhost/auth/google/return',
			realm: 'http://localhost',
			passReqToCallback: true
		},
		function (req, identifier, profile, done) {
			var User = app.models.user,
				data = {
					name: profile.displayName
				};

			profile.emails.some(function (v) {
				if (v.value) {
					data.email = v.value;
					return true;
				}
			});

			User.auth(req, 'google', identifier, data, done);
		}
	));
};
