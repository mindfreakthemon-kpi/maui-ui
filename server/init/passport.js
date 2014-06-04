var passport = require('passport');

module.exports = function (app) {
	passport.serializeUser(function (user, done) {
		done(null, user.id());
	});

	passport.deserializeUser(function (id, done) {
		app.models.user.load(id, done);
	});
};
