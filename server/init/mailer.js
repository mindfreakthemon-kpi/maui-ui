var mailer = require('express-mailer');

module.exports = function (app) {
	mailer.extend(app, {
		from: 'no-reply@example.com',
		host: 'smtp.gmail.com',
		secureConnection: true,
		port: 465,
		auth: {
			user: 'gmail.user@gmail.com',
			pass: 'userpass'
		}
	});
};
