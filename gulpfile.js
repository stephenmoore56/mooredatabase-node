(function() {
    'use strict';
    let gulp = require('gulp');
    let runSequence = require('run-sequence');
    let args = require('yargs')
        .argv;
    let config = require('./gulp.config')();
    let del = require('del');

    // lazy loading plugins
    // now we can use $. and name of plugin without gulp-
    let $ = require('gulp-load-plugins')({
        lazy: true
    });

    // check out the JS; separate .jshintrc files for server
    // and browser code so I can run ES6 on server side
    gulp.task('jshint', function(cb) {
        runSequence('jshint-server', 'jshint-browser', cb);
    });
    gulp.task('jshint-server', function() {
        log('Analyzing code and code style for server JS...');
        return gulp.src(config.allserverjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint('./.jshintrc_server'))
            .pipe($.jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe($.jscs());
    });
    gulp.task('jshint-browser', function() {
        log('Analyzing code and code style for browser JS...');
        return gulp.src(config.allbrowserjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint('./.jshintrc_browser'))
            .pipe($.jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe($.jscs());
    });

    // compile and minify SASS to CSS with compass
    gulp.task('css', function(cb) {
        runSequence('clean-css', 'compass', 'clean-sass-cache', cb);
    });
    gulp.task('compass', function() {
        log('Compiling SASS -> CSS...');
        return gulp.src(config.sassfiles)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.plumber())
            .pipe($.compass({
                config_file: config.configrb,
                css: config.cssdir,
                sass: config.sassdir
            }))
            .pipe(gulp.dest(config.cssdir));
    });
    // watcher task for CSS
    gulp.task('css-watch', function() {
        gulp.watch(config.sassfiles, ['compass']);
    });
    gulp.task('clean-css', function() {
        var files = config.cssfiles;
        return clean(files);
    });
    gulp.task('clean-sass-cache', function() {
        var files = config.sasscache;
        return clean(files);
    });

    // logging utility
    function log(msg) {
        if (typeof(msg) === 'object') {
            for (let item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }

    // for clearing directories
    function clean(path) {
        log('Cleaning: ' + $.util.colors.red(path));
        return del(path);
    }
})();