(function() {
    'use strict';
    module.exports = (app, express) => {
        // static / template routes
        app.use(express.static('public'));
        let content = require('../controllers/static-content');
        let birding = require('../controllers/birding');
        app.get('/', content.nodejs);
        app.get('/birding', birding.menu);
        // API routes
        app.get('/birding/ordersjson', birding.ordersjson);
        app.get('/birding/monthsjson', birding.monthsjson);
        app.get('/birding/speciesjson', birding.speciesjson);
        app.get('/birding/yearsjson', birding.yearsjson);
        app.get('/birding/detailjson/:id', birding.detailjson);
        app.get('/birding/detailmonthsjson/:id', birding.detailmonthsjson);
        // app.get('/birding/menu', birding.menu);
        app.get('*', (req, res) => {
            res.render('error', {
                title: '404 Error',
                description: 'File not found.'
            });
        });
    };
})();