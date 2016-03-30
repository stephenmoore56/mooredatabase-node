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
            ]
        };
        return config;
    };
})();