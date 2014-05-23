module.exports = function (app) {
	// locking all /dashboard urls
	// to only logged-in users
	app.all('/dashboard/*',
		app.get('middlewares:logged-in')('login'));

	app.get('dashboard', '/dashboard',
		function (req, res) {
			res.render('dashboard/dashboard');
		});

	app.get('dashboard.status', '/dashboard/status/:id',
		function (req, res) {
			app.api.get('task', req.params.id,
				function (error, response, json) {
					res.render('dashboard/status', {
						task: {
							id: req.params.id
						}
					});
				});
		});

	app.get('dashboard.create', '/dashboard/create',
		function (req, res) {
			app.api.get('param/simple',
				function (error, response, json) {
					res.render('dashboard/create', {
						params: error ? [] : json.parameters
					});
				});
		});

	app.post('/dashboard/create',
		function (req, res) {
			app.api.post('newpostrequest', {
					request: req.body
				},
				function (error, response, json) {
					res.redirect(
						app.reverse('dashboard.status', {
							id: error ? 0 : json.id
						}));
				});
		});
};
