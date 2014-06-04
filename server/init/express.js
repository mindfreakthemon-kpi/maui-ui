module.exports = function (app) {
	app.set('views', './server/views');
	app.set('view engine', 'jade');
	app.enable('case sensitive routing');
	app.disable('view cache');
	app.disable('x-powered-by');
};
