var express = require('express');

module.exports = function (app) {
	function users(req, res) {
		app.models.user.list(function (err, list) {
			res.render('admin/users', {
				error: err,
				data: list
			});
		});
	}

	var router = express.Router();

	router
		.get('/error', app.helpers.render('admin/error'))
//		.all('*', app.helpers.isRole('admin', 'error'))
		.get('/', app.helpers.render('admin/main'))
		.get('/users', users)
		.get('/config', app.helpers.render('admin/config'));

	app.use('/admin', router);
};
