module.exports = function (app) {
	app.get('/dashboard',
		app.get('middlewares:logged-in')('/login'));

	app.get('/dashboard',
		function (req, res) {
			res.render('dashboard');
		});

	app.get('/dashboard/create',
		function (req, res) {
			app.api.getParams('simple', function (error, response, json) {
				res.render('params', {
					params: json.param
				});
			});
		});

	app.post('/dashboard/create',
		function (req, res) {
			app.api.makeRequest(req.body, function (error, response, json) {
				// @todo save json.id as request id
				res.redirect('/params');
			});
		});
};
