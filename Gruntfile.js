"use strict";

module.exports = function(grunt) {

  var source_files = ['jsLoader.js'];
  
  // Setup
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'uglify': {
      options: {},
      build: {
          src: source_files,
          dest: 'jsLoader.min.js'
      }
    },

    'jshint': {
        files: source_files,
        options: {
            browser: true,
            indent: false,
            strict: true,
            globalstrict: true,
            trailing: true,
            loopfunc: true,
            scripturl: true,
            sub: true
        }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register tasks
  grunt.registerTask('default', ['uglify']);
};
