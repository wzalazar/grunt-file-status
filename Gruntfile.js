/*
 * grunt-file-status
 * https://github.com/wzalazar/grunt-file-status
 *
 * Copyright (c) 2015 Walter Zalazar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    fileStatus: {
      connection:{
        host: "localhost",
        port: 3000,
        path: "websocket",
        ssl: false,
        autoReconnect: true,
        autoReconnectTimer: 500,
        maintainCollections: true,
        ddpVersion: '1'
      },
      login:{
        email: "1@hotmail.com",
        password: "1qaz2wsx"
      }
    },
    watch: {
      files: [
            "js/{,**/}*.js"
      ],
      options: {
        livereload: true,
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "Project Name", // defaults to the name in package.json, or will use project directory's name
        success: false, // whether successful grunt executions should be notified automatically
        duration: 3 // the duration of notification in seconds, for `notify-send only
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.task.run('notify_hooks');
  grunt.loadTasks('tasks');
  grunt.registerTask('file-status', ['fileStatus','watch','notify']);
};
