(function() {
    'use strict';
    module.exports = () => {
        let config = {
            // All the JS we want to check
            alljs: ["*.js", "controllers/*.js", "lib/*.js", "models/*.js", "public/js/app/*.js", "public/js/custom/*.js", "views/**/*.js"],
            sassdir: './public/sass',
            sassfiles: './public/sass/*.scss',
            cssdir: './public/css',
            cssfiles: './public/css/*.css',
            configrb: './config.rb',
            angularSrc: './public/js/app/src/*.js',
            angularDist: './public/js/app/dist',
            angularDistConcat: 'app.concat.js',
            angularDistMin: 'app.min.js'
        };
        return config;
    };
})();