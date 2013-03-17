// Generated by CoffeeScript 1.4.0
(function() {
  var MemStore, app, engine, express, flash, http, mongoose, path, uristring;

  express = require('express');

  http = require('http');

  path = require('path');

  engine = require('ejs-locals');

  MemStore = express.session.MemoryStore;

  flash = require('connect-flash');

  mongoose = require('mongoose');

  uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/local';

  mongoose.connect(uristring, function(err, res) {
    if (err) {
      return console.log('Error connecting to: ' + uristring + '. ' + err);
    } else {
      return console.log('Connected to Mongoose');
    }
  });

  process.env.NODE_ENV = "production";

  process.env.NODE_ENV = "development";

  app = express();

  app.engine('ejs', engine);

  app.configure(function() {
    var routes;
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express["static"](path.join(__dirname, 'public')));
    app.use(express.session({
      secret: 'pileated_woodpecker',
      store: MemStore({
        reapInterval: 60000 * 10
      })
    }));
    app.use(flash());
    app.use(function(req, res, next) {
      var _base, _base1, _ref, _ref1;
      if ((_ref = (_base = req.session).auth) == null) {
        _base.auth = false;
      }
      if ((_ref1 = (_base1 = req.session).username) == null) {
        _base1.username = 'nobody';
      }
      res.locals.authenticated = req.session.auth;
      res.locals.username = req.session.username;
      next();
    });
    routes = require('./lib/routes')(app);
    app.use(app.router);
    app.use(function(err, req, res, next) {
      return res.status(err.status || 500).render('error', {
        title: 'Error',
        description: err.message
      });
    });
    return app.use(function(req, res, next) {
      return res.status(404).render('error', {
        title: 'Error 404',
        description: 'The page you requested cannot be found.'
      });
    });
  });

  app.configure('development', function() {
    app.use(express.logger());
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler({
      dumpExceptions: false,
      showStack: false
    }));
  });

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment");
  });

}).call(this);
