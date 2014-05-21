module.exports = function (app) {
	app.set('config:backend-endpoint', process.env.BACKEND_ENDPOINT);
	app.set('config:backend-offline', process.env.BACKEND_OFFLINE);
};
