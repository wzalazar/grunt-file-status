/**
 * Grunt watch plugin
 * ==================
 *
 * URL: https://www.npmjs.com/package/grunt-contrib-watch
 *
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 */
module.exports = {

    // Configure LiveReload watcher (used with Chrome Plugin)
    // ======================================================
    // Choose files
    // Choose tasks
    // Enable LiveReload trigger
    //
    livereload: {
        files: [
            "<%= appConfig.appPath %>/js/{,**/}*.js",
            "<%= appConfig.appPath %>/templates/{,**/}*.hbs",
            "test/spec/{,**/}*.js"
        ],
        options: {
            // Enable LiveReload through browser extension
            livereload: true
        }
    }
};
