(function() {
    'use strict';
    module.exports = () => {
        let config = {
            // All the JS we want to check
            allbrowserjs: ["public/js/src/app/*.js", "public/js/src/custom/*.js"],
            allserverjs: [
                "*.js",
                "test/*.js",
                "controllers/*.js",
                "lib/*.js",
                "models/*.js",
                "views/**/*.js"
            ],
            // CSS build
            sassdir: './public/sass',
            sassfiles: './public/sass/*.scss',
            builddir: './public/sass/build',
            cssdir: './public/css',
            cssfiles: [
                './public/css/*.css',
                '/public/sass/build/*.css'
            ],
            sasscache: './.sass-cache',
            cssinjectsources: [
                './public/css/*.css'
            ],
            stylesheetpartial: './views/partials/stylesheets.ejs',
            configrb: './config.rb',
            // JS build
            angularfiles: [
                './public/js/src/app/app.js',
                './public/js/src/app/charts.js',
                './public/js/src/app/services.js',
                './public/js/src/app/controllers.js'
            ],
            angularminfile: './public/js/dist/app/app.min.js',
            customfiles: [
                './public/js/src/custom/mooredatabase.js'
            ],
            customminfile: './public/js/dist/custom/mooredatabase.min.js',
            scriptpartial: './views/partials/scripts.ejs',
            jsinjectsources: [
                './public/js/dist/**/*.min.js'
            ]
        };
        return config;
    };
})();
