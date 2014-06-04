module.exports = function (app) {
	app.helpers.render = function (template) {
		return function (req, res) {
			res.render(template);
		};
	};

	app.helpers.redirect = function (url) {
		return function (req, res) {
			res.redirect(url);
		};
	};
};
