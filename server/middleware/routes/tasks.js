var express = require('express');

module.exports = function (app) {
	function list(req, res) {
		app.api.get('requests', function (error, response, json) {
			res.render('tasks/list', {
				error: error,
				data: json
			});
		});
	}

	function create(req, res) {
		app.api.get('param/simple', function (error, response, json) {
			res.render('tasks/create', {
				error: error,
				data: json || {}
			});
		});
	}

	function createPost(req, res) {
		app.api.post('postrequest', {
			request: req.body,
			type: req.body.type
		},
		function (error, response, json) {
			if (error) {
				res.redirect('create');
			} else {
				res.redirect(json.id);
			}
		});
	}

	function delPost(req, res) {
		app.api.get('remove/' + req.body.id, function (error, response, json) {
			res.redirect('.');
		});
	}

	function view(req, res) {
		app.api.get('request/' + req.params.id, function (error, response, json) {
			res.render('tasks/status', {
				error: error,
				data: json
			});
		});
	}

	var router = express.Router();

	router
		.all('*', app.helpers.loggedIn('/auth/login'))
		.get('/', list)
		.get('/create', create)
		.post('/create', createPost)
		.post('/delete', delPost)
		.get('/:id', view);

	app.use('/tasks', router);
};
