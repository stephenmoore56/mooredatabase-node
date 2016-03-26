(function () {
    "use strict";
    let gulp = require('gulp');
    let jshint = require('gulp-jshint');

    let jsFiles = [
        "*.js",
        "controllers/*.js",
        "lib/*.js",
        "models/*.js",
        "public/javascripts/app/js/*.js",
        "views/**/*.js"];

    /* style check */
    gulp.task('style', function () {
        gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                verbose: true
            }));
    });
})();