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
};
