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
				user_id: req.user.id(),
				type: 'simple',
				name: req.form.name,
				priority: req.form.priority,
				description: req.form.description,
				number_of_nodes: req.form.number_of_nodes,
				input_arguments: req.form.input_arguments,
				dependencies: req.form.dependencies,
				env: req.form.env,
				processor: req.form.processor,
				memory: req.form.memory,
				storage: req.form.storage,
				timeout: req.form.timeout,
				bash: req.form.bash,
				file_url: req.form.file_url,
				hook_start: req.form.hook_start,
				hook_end: req.form.hook_end
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
				field('name').trim().required(),
				field('priority').trim().required(),
				field('description').trim().required(),
				field('number_of_nodes').trim().required(),
				field('input_arguments').trim(),
				field('dependencies').trim(),
				field('env').trim(),
				field('processor').trim().required(),
				field('memory').trim().required(),
				field('storage').trim().required(),
				field('timeout').trim().required(),
				field('bash').trim(),
				field('file_url').trim(),
				field('hook_start').trim(),
				field('hook_end').trim()
			), create)
		.post('/remove', remove)
		.get('/:id', view);

	app.use('/tasks', router);
};
