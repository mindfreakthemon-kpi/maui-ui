var roles = require('connect-roles');

module.exports = function (app) {
	app.use(roles);

	roles.use('edit own user', '/user/:userID', function (req) {
		if (req.params.userID === req.user.id) {
			return true;
		}

		return null;
	});
};
