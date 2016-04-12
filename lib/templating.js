(function() {
    'use strict';
    module.exports = (app) => {
        // ejs / ejs-locals templating
        let engine = require('ejs-locals');
        require('ejs');
        app.engine('ejs', engine);
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'ejs');
    };
})();