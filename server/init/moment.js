var moment = require('moment');

module.exports = function (app) {
	app.locals.moment = moment;
};
