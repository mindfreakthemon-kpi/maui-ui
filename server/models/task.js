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
		.attr('number_of_nodes')
		.attr('input_arguments')
		.attr('dependencies')
		.attr('env')
		.attr('processor')
		.attr('memory')
		.attr('storage')
		.attr('timeout')
		.attr('bash') // or file
		.attr('file_url') // or bash
		.attr('hook_start')
		.attr('hook_end');


	model.patch(Task, 'tasks');

	Task.STATUS = {
		CREATED: 'CREATED',
		PROCESSING: 'PROCESSING',
		COMPLETE: 'COMPLETE',
		FAILED: 'FAILED'
	};
};
