module.exports = function (app) {
	var passport = require('passport'),
		GitHubStrategy = require('passport-github').Strategy;

	passport.use(new GitHubStrategy({
			clientID: app.conf.get('passport:github:client_id'),
			clientSecret: app.conf.get('passport:github:client_secret'),
			callbackURL: app.conf.get('passport:github:callback_url'),
			passReqToCallback: true
		},
		function (req, accessToken, refreshToken, profile, done) {
			var User = app.models.user;

			User.auth(req, 'github', profile.id, {
				name: profile.displayName
			}, done);
		}
	));
};
