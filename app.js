(function() {
    'use strict';

    let express = require('express'),
        app = express(),
        appConfig = require('config')
        .appConfig;
    require('./lib/routes')(app, express);
    require('./lib/templating')(app);
    require('./lib/session')(app);

    // start app; Heroku assigns ports in production
    app.set('port', process.env.PORT || appConfig.port);
    app.listen(app.get('port'), () => {
        console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment...");
    });
})();
