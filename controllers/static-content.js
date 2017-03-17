(function() {
    'use strict';
    exports.nodejs = (req, res) => {
        res.render('static-content/nodejs', {
            title: 'Node.js'
        });
    };

    exports.menu = (req, res) => {
        res.render('birding/menu', {
            title: 'Bird Species and Sightings'
        });
    };
})();