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
    gulp.task('js', function(cb) {
        runSequence('js-server', 'js-browser', cb);
    });
    gulp.task('js-server', function() {
        log('Analyzing code and code style for server JS...');
        return gulp.src(config.allserverjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint('./.jshintrc_server'))
            .pipe($.jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe($.jscs());
    });
    gulp.task('js-browser', function() {
        log('Analyzing code and code style for browser JS...');
        return gulp.src(config.allbrowserjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint('./.jshintrc_browser'))
            .pipe($.jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe($.jscs());
    });

    // concatenate and minify JavaScript files
    gulp.task('uglify', function(cb) {
        runSequence('uglify-angular', 'uglify-custom', 'js-inject', cb);
    });
    // concatenate and minify AngularJS application files
    gulp.task('uglify-angular', function() {
        log('Concatenating and minifying Angular files...');
        return gulp.src(config.angularfiles)
            .pipe($.concat(config.angularminfile)) //the name of the resulting file
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest('.'));
    });
    // concatenate and minify custom application files
    gulp.task('uglify-custom', function() {
        log('Concatenating and minifying custom Javascript files...');
        return gulp.src(config.customfiles)
            .pipe($.concat(config.customminfile)) //the name of the resulting file
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest('.'));
    });
    // inject minified JS into scripts partial
    gulp.task('js-inject', function() {
        let target = gulp.src(config.scriptpartial);
        let sources = gulp.src(config.jsinjectsources, {
            read: false
        });
        return target.pipe($.inject(sources))
            .pipe($.replace('/public', ''))
            .pipe(gulp.dest('./views/partials'));
    });

    // compile and minify SASS to CSS with compass
    gulp.task('css', function(cb) {
        runSequence('clean-css', 'compass', 'clean-sass-cache', 'css-inject', cb);
    });
    gulp.task('compass', function() {
        log('Compiling SASS -> CSS...');
        return gulp.src(config.sassfiles)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.plumber())
            .pipe($.compass({
                config_file: config.configrb,
                css: config.builddir,
                sass: config.sassdir
            }))
            .pipe($.rev())
            .pipe(gulp.dest(config.cssdir));
    });
    // watcher task for CSS
    gulp.task('css-watch', function() {
        gulp.watch(config.sassfiles, ['css']);
    });
    // clean up css/sass files and directories
    gulp.task('clean-css', function() {
        var files = config.cssfiles;
        return clean(files);
    });
    gulp.task('clean-sass-cache', function() {
        var files = config.sasscache;
        return clean(files);
    });
    // inject CSS into stylesheets partial
    gulp.task('css-inject', function() {
        let target = gulp.src('./views/partials/stylesheets.ejs');
        let sources = gulp.src(['./public/css/*.css'], {
            read: false
        });
        return target.pipe($.inject(sources))
            .pipe($.replace('/public', ''))
            .pipe(gulp.dest('./views/partials'));
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
