var express = require('express'),
	form = require('express-form'),
	field = form.field;

module.exports = function (app) {
	function become(req, res, next) {
		var key = app.get('config:admin-key');

		if (req.user && key &&
			req.query.key === key) {
			req.user.role(req.query.role);

			app.models.user.save(req.user, function () {
				res.redirect('..');
			});

			return;
		}

		next();
	}

	function users(req, res) {
		app.models.user.list(function (err, list) {
			res.render('admin/users', {
				error: err,
				data: list
			});
		});
	}

	function deleteUser(req, res, next) {
		if (req.params.id === req.user.id()) {
			res.redirect('..');
			return;
		}

		app.models.user.remove(req.params.id, function (err) {
			if (err) {
				next(new Error(err));
				return;
			}

			res.redirect('..');
		});
	}

	function configSave(req, res) {
		app.set('config:backend-endpoint', req.form.backend.endpoint);
		app.set('config:backend-offline', req.form.backend.offline);

		res.redirect('config');
	}

	var router = express.Router();

	router
		.get('/become', become)

		.get('/error', app.helpers.render('admin/error'))

		.all('*', app.helpers.loggedIn('/auth/login'), app.helpers.isRole('admin', 'error'))
		.get('/', app.helpers.render('admin/main'))

		.get('/users', users)
		.all('/users/remove/:id', deleteUser)

		.get('/config', app.helpers.render('admin/config'))
		.post('/config',
			form(
				field('backend.endpoint').trim().required(),
				field('backend.offline').toBoolean()
			), configSave);

	app.use('/admin', router);
};
