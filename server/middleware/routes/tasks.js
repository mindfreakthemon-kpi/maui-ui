var express = require('express'),
	querystring = require('querystring'),
	form = require('express-form'),
	field = form.field;

module.exports = function (app) {
	var Task = app.models.task;

	function list(req, res, next) {
		var query = querystring.stringify({
			user_id: req.user.id()
		});

		app.api.get('requests?' + query, function (error, response, json) {
			if (error) {
				next(error);
				return;
			}

			res.render('tasks/list', {
				tasks: Task.wrap(json).sort(function (a, b) {
					return b.creationDate() - a.creationDate();
				})
			});
		});
	}

	function view(req, res, next) {
		var query = querystring.stringify({
			id: req.params.id
		});

		app.api.get('requests?' + query, function (error, response, json) {
			if (error) {
				next(error);
				return;
			}

			var tasks = Task.wrap(json);

			res.render('tasks/view', {
				error: error,
				task: tasks.pop()
			});
		});
	}

	function create(req, res) {
		app.api.post('request', {
			request: {
				name: req.body.name,
				user_id: req.user.id(),
				type: 'simple'
			}
		},
		function (error, response, json) {
			if (error) {
				res.redirect('create');
				return;
			}

			res.redirect('/tasks/' + json.id);
		});
	}

	function remove(req, res) {
		var id = req.body.id;

		app.api.del('remove/' + id, function () {
			Task.remove(id, function () {
				res.redirect('/tasks/');
			});
		});
	}

	var router = express.Router();

	router
		.all('*', app.helpers.loggedIn('/auth/login'))
		.get('/', list)
		.get('/create', app.helpers.render('tasks/create'))
		.post('/create',
			form(
				field('name').trim().required()
			), create)
		.post('/remove', remove)
		.get('/:id', view);

	app.use('/tasks', router);
};
