/*
 * grunt-file-status
 * https://github.com/wzalazar/grunt-file-status
 *
 * Copyright (c) 2015 Walter Zalazar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
 // grunt.loadTasks('tasks');
  grunt.loadTasks('tasks');
  grunt.registerTask('file-status', ['file_status','watch']);
};
