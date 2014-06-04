var winston = require('winston');

module.exports = function (app) {
	app.logger = winston;

	app.logger.info('logger was started');
};
