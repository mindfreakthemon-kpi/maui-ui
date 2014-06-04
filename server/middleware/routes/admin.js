var express = require('express'),
	form = require('express-form'),
	field = form.field;

module.exports = function (app) {
	function become(req, res, next) {
		var key = app.conf.get('admin:key');

		if (req.user && key &&
			req.query.key === key) {
			req.user.role(req.query.role);

			app.models.user.save(req.user, function () {
				app.logger.info('user %s become a %s just now', req.user.name(), req.user.role());

				res.redirect('..');
			});

			return;
		}

		next();
	}

	function users(req, res) {
		app.models.user.list(function (error, users) {
			res.render('admin/users', {
				error: error,
				users: users
			});
		});
	}

	function removeUser(req, res, next) {
		if (req.params.id === req.user.id()) {
			res.redirect('..');
			return;
		}

		app.models.user.remove(req.params.id, function (error) {
			if (error) {
				next(new Error(error));
				return;
			}

			res.redirect('..');
		});
	}

	function config(req, res) {
		var payload = req.form;

		app.conf.set('backend:endpoint', payload.backend.endpoint);
		app.conf.set('backend:offline', payload.backend.offline);

		app.conf.set('passport:yandex', {
			client_id: payload.passport.yandex.client_id,
			client_secret: payload.passport.yandex.client_secret
		});

		app.conf.set('passport:github', {
			client_id: payload.passport.github.client_id,
			client_secret: payload.passport.github.client_secret
		});

		res.redirect('config');
	}

	function clearTasks(req, res) {
		app.api.del('remove/all', function () {
			app.models.task.clear(function () {
				res.redirect('/admin/');
			});
		});
	}

	var router = express.Router();

	router
		.get('/become', become)

		.get('/error', app.helpers.render('admin/error'))

		.all('*', app.helpers.loggedIn('/auth/login'), app.helpers.isRole('admin', 'error'))
		.get('/', app.helpers.render('admin/main'))

		.get('/users', users)
		.all('/users/remove/:id', removeUser)

		.get('/tasks/clear', clearTasks)

		.get('/config', app.helpers.render('admin/config'))
		.post('/config',
			form(
				field('backend.endpoint').trim().required(),
				field('backend.offline').toBoolean(),
				field('passport.yandex.client_id').trim().required(),
				field('passport.yandex.client_secret').trim().required(),
				field('passport.github.client_id').trim().required(),
				field('passport.github.client_secret').trim().required()
			), config);

	app.use('/admin', router);
};
