/*
 * grunt-file-status
 * https://github.com/wzalazar/grunt-file-status
 *
 * Copyright (c) 2015 Walter Zalazar
 * Licensed under the MIT license.
 */

'use strict';

//var watch = require('grunt-contrib-watch');

module.exports = function(grunt) {
    console.log("corriendo task");
  grunt.registerTask('file_status', 'Real time connection with others co-workers, minified conflicts with alert and resolve it s with a merge online', function() {

    var DDPClient = require("ddp");

    var ddpclient = new DDPClient({
        // All properties optional, defaults shown
        host: "localhost",
        port: 3000,
        path: "websocket",
        ssl: false,
        autoReconnect: true,
        autoReconnectTimer: 500,
        maintainCollections: true,
        ddpVersion: '1' // ['1', 'pre2', 'pre1'] available
    });

    /*
     * Connect to the Meteor Server
     */
    ddpclient.connect(function(error, wasReconnect) {
        // If autoReconnect is true, this callback will be invoked each time
        // a server connection is re-established
        if (error) {
            console.log('DDP connection error!');
            return;
        }

        if (wasReconnect) {
            console.log('Reestablishment of a connection.');
        }

        console.log('connected!');

        var user = {
            email: "1@hotmail.com",
            password: "1qaz2wsx"
        };

        ddpclient.call("login", [{
            user: {
                email: user.email
            },
            password: user.password
        }], function(err, result) {
            if (err) {
                grunt.log.writeln("Error login");
            } else {
                console.log("Logged.");
                var userId = result.id;

                ddpclient.subscribe(
                    'updateFiles', // name of Meteor Publish function to subscribe to
                    [], // any parameters used by the Publish function
                    function() { // callback when the subscription is complete
                        console.log('Subscription files is complete.');
                    }
                );

                ddpclient.subscribe(
                    'allUsersOutMe', // name of Meteor Publish function to subscribe to
                    [], // any parameters used by the Publish function
                    function() { // callback when the subscription is complete
                        console.log('Subscription users is complete.');
                    }
                );

                var observer = ddpclient.observe("files");

                observer.changed = function(id, oldFields, clearedFields, newFields) {
                    
                    var date = newFields.modified[0].dateCreated;
                    var modified= newFields.modified[0];
                    var filepath;

                    for (var x = 0; x < newFields.modified.length; x++) {
                        if (newFields.modified[x].dateCreated > date) {
                            date = newFields.modified[x].dateCreated;
                            modified= newFields.modified[x];
                        }
                    }
                  
                    ddpclient.call(
                        'findFile', // name of Meteor Method being called
                        [id], // parameters to send to Meteor Method
                        function(err, result) { // callback which returns the method call results
                            if (err) {
                                console.log(err);
                            } else {
                                for (var x = 0; x < result.modified.length; x++) {
                                    if (result.modified[x].userId === userId && modified.userId === userId) {
                                        grunt.file.write(result.filepath, result.modified[x].file);
                                        filepath= result.filepath;
                                    }
                                }
                            }
                        },
                        function() { // callback which fires when server has finished
                        }
                    );

                    ddpclient.call(
                            'getUser', // name of Meteor Method being called
                            [modified.userId], // parameters to send to Meteor Method
                            function(err, result) { // callback which returns the method call results
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (result._id!=userId){
                                        grunt.log.error("The user "+ result.username +" has modified "+filepath);
                                    }
                                    else{
                                        grunt.log.error("Update your "+filepath);
                                    }
                                }
                            },
                            function() { // callback which fires when server has finished
                            }
                    );


                };


                grunt.event.on('watch', function(action, filepath, target) {
                    var file = grunt.file.read(filepath);
                    var change = {
                        userId: userId,
                        filepath: filepath,
                        modified: {
                            'userId': userId,
                            'action': action,
                            'file': file
                        }
                    };
                    ddpclient.call(
                        'changefile', // name of Meteor Method being called
                        [change], // parameters to send to Meteor Method
                        function(err, result) { // callback which returns the method call results
                            //console.log('called function, result: ' + result);
                        },
                        function() { // callback which fires when server has finished
                        }
                    );
                });
            }
        });
    });

























  });

  console.log("saliendo task");
};
