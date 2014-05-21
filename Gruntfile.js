var path = require('path');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			main: [
				'Gruntfile.js',
				'server.js',
				'config/**/*.js',
				'middlewares/**/*.js',
				'models/**/*.js',
				'routes/**/*.js'
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
						'config/**/*.js',
						'middlewares/**/*.js',
						'models/**/*.js',
						'routes/**/*.js'
					]
				}
			}
		},

		watch: {
			jshint: {
				files: [
					'Gruntfile.js',
					'server.js',
					'config/**/*.js',
					'middlewares/**/*.js',
					'models/**/*.js',
					'routes/**/*.js'
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
