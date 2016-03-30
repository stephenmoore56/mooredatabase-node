(function () {
    "use strict";
    let gulp = require('gulp');

    /* style check */
    let jshint = require('gulp-jshint');
    let jscs = require('gulp-jscs');
    let jsFiles = [
        "*.js",
        "controllers/*.js",
        "lib/*.js",
        "models/*.js",
        "public/javascripts/app/*.js",
        "public/javascripts/*.js",
        "views/**/*.js"];
    gulp.task('style', function () {
        return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe(jscs());
    });

    // compile and minify SASS to CSS with compass
    let compass = require('gulp-compass');
    gulp.task('compass', function () {
        gulp.src('./public/sass/*.scss')
            .pipe(compass({
                config_file: './public/config.rb',
                css: './public/stylesheets',
                sass: './public/sass'
            }))
            .pipe(gulp.dest('./public/stylesheets/'));
    });


})();