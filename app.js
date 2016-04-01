(function() {
    'use strict';
    // express
    let express = require('express'),
        app = express();
    require('./lib/routes')(app, express);
    // ejs / ejs-locals templating
    let engine = require('ejs-locals');
    require('ejs');
    app.engine('ejs', engine);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    /* start app */
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), () => {
        console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment");
    });
})();