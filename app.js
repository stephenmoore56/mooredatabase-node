(function() {
    'use strict';

    // express / ejs
    let express = require('express'),
        app = express();
    require('./lib/routes')(app, express);
    require('./lib/templating')(app);

    // start app; Heroku assigns ports in production
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), () => {
        console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment");
    });

})();