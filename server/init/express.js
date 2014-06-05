module.exports = function (app) {
	app.set('views', './server/views');
	app.set('view engine', 'jade');
	app.set('view cache', process.env.NODE_ENV === 'production');
	app.enable('case sensitive routing');
	app.disable('x-powered-by');
};
