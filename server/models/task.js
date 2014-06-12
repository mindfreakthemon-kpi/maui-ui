var model = require('nodejs-model');

module.exports = function (app) {
	var Task = app.models.task = model('Task')
		.attr('id')
		.attr('name')
		.attr('priority')
		.attr('status')
		.attr('user_id')
		.attr('creation_date')
		.attr('description')
		.attr('percent_complete')
		.attr('number_of_nodes');

	model.patch(Task, 'tasks');

	Task.STATUS = {
		CREATED: 'CREATED',
		PROCESSING: 'PROCESSING',
		COMPLETE: 'COMPLETE',
		FAILED: 'FAILED'
	};
};
