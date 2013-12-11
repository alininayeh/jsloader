'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
            'jsLoader.min.js': 'jsLoader.js'
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> Compiled at: <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'gzip'
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register tasks
  grunt.registerTask('default', [
    'uglify'
  ]);

};
