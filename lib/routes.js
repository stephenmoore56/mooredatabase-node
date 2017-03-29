(function() {
    'use strict';
    let appConfig = require('config')
        .appConfig;
    let content = require('../controllers/static-content');
    let birding = require('../controllers/birding');
    module.exports = (app, express) => {

        // static / template routes
        app.use(express.static(appConfig.public_dir));
        app.get('/', content.nodejs);
        app.get('/birding', content.menu);

        // API routes
        app.get('/birding/clearCache', birding.clearCache);
        app.get('/birding/ordersjson', birding.ordersjson);
        app.get('/birding/monthsjson', birding.monthsjson);
        app.get('/birding/speciesjson', birding.speciesjson);
        app.get('/birding/yearsjson', birding.yearsjson);
        app.get('/birding/allsightingsjson', birding.allsightingsjson);
        app.get('/birding/detailjson/:id', birding.detailjson);
        app.get('/birding/detailmonthsjson/:id', birding.detailmonthsjson);
        app.get('/birding/testMongoConnect', birding.testMongoConnect);

        // 404
        app.get('*', (req, res) => {
            res.render('error', {
                title: '404 Error',
                description: 'File not found.'
            });
        });
    };
})();
