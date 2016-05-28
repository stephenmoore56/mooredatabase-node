(() => {
    'use strict';

    let gulp = require('gulp'),
        runSequence = require('run-sequence'),
        args = require('yargs')
        .argv,
        config = require('./gulp.config')(),
        del = require('del'),
        // lazy loading plugins; use $. and name of plugin without gulp-
        $ = require('gulp-load-plugins')({
            lazy: true
        });

    // check out the JS; separate .jshintrc files for server
    // and browser code so I can run ES6 on server side
    gulp.task('js', (cb) => {
        runSequence('js-server', 'js-browser', cb);
    });
    gulp.task('js-server', () => {
        log('Analyzing code and code style for server JS...');
        return gulp.src(config.allserverjs)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jshint('./.jshintrc_server'))
            .pipe($.jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe($.jscs());
    });
    gulp.task('js-browser', () => {
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
    gulp.task('uglify', (cb) => {
        runSequence('uglify-angular', 'uglify-custom', 'js-inject', cb);
    });
    // concatenate and minify AngularJS application files
    gulp.task('uglify-angular', () => {
        log('Concatenating and minifying Angular files...');
        return gulp.src(config.angularfiles)
            .pipe($.concat(config.angularminfile)) //the name of the resulting file
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest('.'));
    });
    // concatenate and minify custom application files
    gulp.task('uglify-custom', () => {
        log('Concatenating and minifying custom Javascript files...');
        return gulp.src(config.customfiles)
            .pipe($.concat(config.customminfile)) //the name of the resulting file
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest('.'));
    });
    // inject minified JS into scripts partial
    gulp.task('js-inject', () => {
        let target = gulp.src(config.scriptpartial);
        let sources = gulp.src(config.jsinjectsources, {
            read: false
        });
        return target.pipe($.inject(sources))
            .pipe($.replace('/public', ''))
            .pipe(gulp.dest('./views/partials'));
    });

    // compile and minify SASS to CSS with compass
    gulp.task('css', (cb) => {
        runSequence('clean-css', 'compass', 'clean-sass-cache', 'css-inject', cb);
    });
    gulp.task('compass', () => {
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
    gulp.task('css-watch', () => {
        gulp.watch(config.sassfiles, ['css']);
    });
    // clean up css/sass files and directories
    gulp.task('clean-css', () => {
        let files = config.cssfiles;
        return clean(files);
    });
    gulp.task('clean-sass-cache', () => {
        let files = config.sasscache;
        return clean(files);
    });
    // inject CSS into stylesheets partial
    gulp.task('css-inject', () => {
        log('Injecting CSS filename into template...');
        let target = gulp.src(config.stylesheetpartial);
        let sources = gulp.src(config.cssinjectsources, {
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
