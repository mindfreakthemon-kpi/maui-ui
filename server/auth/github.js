module.exports = function (app) {
	var passport = require('passport'),
		GitHubStrategy = require('passport-github').Strategy;

	passport.use(new GitHubStrategy({
			clientID: app.conf.get('passport:github:client_id'),
			clientSecret: app.conf.get('passport:github:client_secret'),
			scope: ['user:email'],
			passReqToCallback: true
		},
		function (req, accessToken, refreshToken, profile, done) {
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

			User.auth(req, 'github', profile.id, data, done);
		}
	));
};
