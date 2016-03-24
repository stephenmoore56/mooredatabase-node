(function () {
    'use strict';
    let express = require('express');
    let app = express();
    let engine = require('ejs-locals');
    let ejs = require('ejs');
    app.engine('ejs', engine);
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    let routes = require('./lib/routes')(app, express);
    app.listen(app.get('port'), () => {
        console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment");
    });
})();