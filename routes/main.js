module.exports = function (app) {
	app.get('home', '/',
		app.get('middlewares:logged-out')('dashboard'),
		function (req, res) {
			res.render('index');
		});
};
