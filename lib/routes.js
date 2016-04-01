(function() {
    'use strict';
    let _ = require('underscore');
    module.exports = function(app, express) {
        app.use(express.static('public'));
        let controllers = require('../controllers');
        let content = _.extend(require('../controllers/static-content'));
        controllers.content = content;
        let birding = _.extend(require('../controllers/birding'));
        controllers.birding = birding;
        app.get('/', controllers.content.nodejs);
        app.get('/birding', controllers.birding.menu);
        app.get('/birding/ordersjson', controllers.birding.ordersjson);
        app.get('/birding/monthsjson', controllers.birding.monthsjson);
        app.get('/birding/speciesjson', controllers.birding.speciesjson);
        app.get('/birding/yearsjson', controllers.birding.yearsjson);
        app.get('/birding/menu', controllers.birding.menu);
        app.get('*', function(req, res) {
            res.render('error', {
                title: '404 Error',
                description: 'File not found.'
            });
        });
    };
})();