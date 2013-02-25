// dependencies
var express = require('express')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals');

// Redis store for sessions
var RedisStore = require('connect-redis')(express);

// set environment before starting express
process.env.NODE_ENV = "production";
//process.env.NODE_ENV = "development";

// start an express app
var app = express();

// routing
var routes = require('./lib/routes')(app);

// logging
var logger = require('./lib/logger').factory();
logger.log('info','Starting app in ' + process.env.NODE_ENV + ' mode...');

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  // use ejs templating
  app.set('view engine', 'ejs');
  // serve up express favicon
  app.use(express.favicon());
  // log incoming requests to console in dev mode
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  // sessions expire in 2 hours
  app.use(express.session({ 
  	secret: "pileated woodpecker",
  	expires: new Date(Date.now() + (2 * 60 * 60 * 1000)) }));  
  // application routes
  app.use(app.router);
  // routes for static assets in public directory
  app.use(express.static(path.join(__dirname, 'public')));   
  // 404 page
  app.use(function(req, res, next) {
    res.status(404).render('error', { title: 'Error 404', description: 'The page you requested cannot be found.' });
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});