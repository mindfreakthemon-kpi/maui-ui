module.exports = function (app) {
	var passport = require('passport'),
		YandexStrategy = require('passport-yandex').Strategy;

	passport.use(new YandexStrategy({
			clientID: app.conf.get('passport:yandex:client_id'),
			clientSecret: app.conf.get('passport:yandex:client_secret'),
			passReqToCallback: true
		},
		function (req, accessToken, refreshToken, profile, done) {
			var User = app.models.user;

			User.auth(req, 'yandex', profile.id, {
				name: profile.displayName
			}, done);
		}
	));
};
