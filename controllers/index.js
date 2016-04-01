(function() {
    'use strict';
    exports.index = (req, res) => {
        res.render('static-content/nodejs', {
            title: 'Node.js'
        });
    };
})();