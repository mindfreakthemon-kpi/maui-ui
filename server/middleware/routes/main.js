module.exports = function (app) {
	app.get('/',
		app.helpers.loggedOut('/dashboard'),
		app.helpers.render('main/index'));
};
