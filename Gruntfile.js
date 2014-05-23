var path = require('path');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			main: [
				'Gruntfile.js',
				'server.js',
				'server/**/*.js'
			]
		},

		nodemon: {
			server: {
				script: 'server.js',
				options: {
					env: {
						PORT: '80'
					},
					ignore: ['node_modules/**'],
					watch: [
						'server.js',
						'server/**/*.js'
					]
				}
			}
		},

		watch: {
			jshint: {
				files: [
					'Gruntfile.js',
					'server.js',
					'server/**/*.js'
				],
				tasks: ['jshint:main']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
//	grunt.loadNpmTasks('grunt-contrib-jade');
//	grunt.loadNpmTasks('grunt-contrib-connect');
//	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('test', 'jshint');
	grunt.registerTask('default', []);
};
