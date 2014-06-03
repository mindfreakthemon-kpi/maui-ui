require({
	baseUrl: '/static/js/',
	paths: {
		jquery: '../lib/jquery-2.1.1.min.js',
		bootstrap: '../lib/bootstrap/js/bootstrap',
		jade: '../lib/jade/runtime'
	}
}, ['templates'], function (templates) {
	alert(templates.tpl({
		test: 1
	}));
});