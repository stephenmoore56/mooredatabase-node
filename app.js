// Generated by CoffeeScript 1.4.0
(function() {
  var RedisStore, app, engine, express, flash, http, logger, path, redis, rtg;

  express = require('express');

  http = require('http');

  path = require('path');

  engine = require('ejs-locals');

  RedisStore = require('connect-redis')(express);

  flash = require('connect-flash');

  if (process.env.REDISTOGO_URL) {
    rtg = require('url').parse(process.env.REDISTOGO_URL);
    redis = require('redis').createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(':')[1]);
  } else {
    redis = require("redis").createClient();
  }

  process.env.NODE_ENV = "production";

  app = express();

  logger = require('./lib/logger').factory();

  logger.log('info', 'Starting app in ' + process.env.NODE_ENV + ' mode...');

  app.engine('ejs', engine);

  app.configure(function() {
    var routes;
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express["static"](path.join(__dirname, 'public')));
    app.use(express.session({
      store: new RedisStore({
        client: redis
      }),
      secret: 'pileatedwoodpecker'
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
    return app.use(express.errorHandler());
  });

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment");
  });

}).call(this);
