module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('index');
	});

	app.get('/params', function (req, res) {
		app.api.getParams('simple', function (error, response, json) {
			res.render('params', {
				params: json.param
			});
		});
	});

	app.post('/params', function (req, res) {
		app.api.makeRequest(req.body, function (error, response, json) {
			// @todo save json.id as request id
			res.redirect('/params');
		});
	});
};
