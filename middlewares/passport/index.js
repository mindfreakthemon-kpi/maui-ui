var passport = require('passport');

module.exports = function (app) {
	var User = app.get('models:User');

	passport.serializeUser(function (user, done) {
		done(null, user.id());
	});

	passport.deserializeUser(function (id, done) {
		User.load(id, done);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	require('../../lib/require_dir')(__dirname, __filename)(app);
};
