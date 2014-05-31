var model = require('nodejs-model');

module.exports = function (app) {
	var Task = app.models.task = model('Task')
		.attr('id', {
			tags: ['private']
		})
		.attr('name')
		.attr('creation_date', {
			tags: ['private']
		})
		.attr('user_id');

	model.patch(Task, 'tasks');
};
