module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {},
		jshint: {
			main: [
				'Gruntfile.js',
				'server.js'
			],
			databases: [
				'databases/**/*.js'
			],
			middlewares: [
				'middlewares/**/*.js'
			],
			models: [
				'models/**/*.js'
			],
			routes: [
				'routes/**/*.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('test', 'jshint');
	grunt.registerTask('default', []);
};
