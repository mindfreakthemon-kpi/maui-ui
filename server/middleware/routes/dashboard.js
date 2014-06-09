var express = require('express'),
	form = require('express-form'),
	field = form.field;

module.exports = function (app) {
	function save(req, res) {
		var payload = req.form,
			user = req.user;

		user.name(payload.name);
		user.email(payload.email);

		app.models.user.save(user, function () {
			res.redirect('.');
		});
	}

	var router = express.Router();

	router
		.all('*', app.helpers.loggedIn('/auth/login'))
		.get('/', app.helpers.render('dashboard/main'))
		.get('/edit', app.helpers.render('dashboard/edit'))
		.post('/edit',
			form(
				field('name').trim().required(),
				field('email').trim().required()
			), save)
		.all('*', app.helpers.redirect('.'));

	app.use('/dashboard', router);
};
