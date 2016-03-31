(function () {
    'use strict';
    module.exports = () => {
        let config = {
            // All the JS we want to check
            alljs: [
                "*.js",
                "controllers/*.js",
                "lib/*.js",
                "models/*.js",
                "public/javascripts/app/*.js",
                "public/javascripts/*.js",
                "views/**/*.js"
            ],
            sassdir: './public/sass',
            sassfiles: './public/sass/*.scss',
            cssdir: './public/stylesheets',
            cssfiles: './public/stylesheets/*.css',
            configrb: './config.rb'
        };
        return config;
    };
})();