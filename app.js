// Generated by CoffeeScript 1.6.1
(function() {
  var RedisStore, app, ejs, ejsFilters, engine, express, flash, http, mongoose, path, url;

  if (process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
      accountKey: process.env.NODETIME_ACCOUNT_KEY,
      appName: 'MOORE+DATABASE Node'
    });
  }

  express = require('express');

  http = require('http');

  path = require('path');

  engine = require('ejs-locals');

  ejs = require('ejs');

  flash = require('connect-flash');

  url = require('url');

  RedisStore = require('connect-redis')(express);

  mongoose = require('./lib/mongoose');

  if (process.env.REDISTOGO_URL != null) {
    process.env.NODE_ENV = "production";
  } else {
    process.env.NODE_ENV = "development";
  }

  app = express();

  app.engine('ejs', engine);

  ejsFilters = require('./lib/ejsFilters')(ejs);

  app.configure('production', function() {
    var redisAuth, redisUrl;
    redisUrl = url.parse(process.env.REDISTOGO_URL);
    redisAuth = redisUrl.auth.split(':');
    app.set('redisHost', redisUrl.hostname);
    app.set('redisPort', redisUrl.port);
    app.set('redisDb', redisAuth[0]);
    return app.set('redisPass', redisAuth[1]);
  });

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
      store: new RedisStore({
        host: app.set('redisHost'),
        port: app.set('redisPort'),
        db: app.set('redisDb'),
        pass: app.set('redisPass')
      }),
      cookie: {
        maxAge: 3600000
      }
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
