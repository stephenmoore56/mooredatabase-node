(function() {
    'use strict';
    exports.nodejs = (req, res) => {
        res.render('static-content/nodejs', {
            title: 'Node.js'
        });
    };
})();