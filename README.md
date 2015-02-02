# grunt-file-status

> Real time connection with others co-workers, you will able to resolve the merge online

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-status --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-status');
```

Once the plugin has been installed, you need clone this repository. This system is based in Meteor.js. There https://github.com/wzalazar/meteor-file-status you will able to find the configuration.

```js
git clone git@github.com:wzalazar/meteor-file-status.git
```

## The "fileStatus" task

### Overview
In your project's Gruntfile, add a section named `fileStatus` to the data object passed into `grunt.initConfig()`.

```js
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
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
# grunt-file-status
