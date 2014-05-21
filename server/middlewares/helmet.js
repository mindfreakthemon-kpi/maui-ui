var helmet = require('helmet');

module.exports = function (app) {
	helmet.defaults(app);
};
