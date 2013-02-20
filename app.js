
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , winston = require('winston');

// Redis store for sessions
var RedisStore = require('connect-redis')(express);

// start an express app
var app = express();

// configure winston error logging; add file transport
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      filename: './error.log',
      handleExceptions: true,
      json: true
    })
  ]
});
// log startup
logger.log('info', 'Starting app...');

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "pileated woodpecker" }));  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));   
  app.use(function(req, res, next) {
    res.status(404).render('error', { title: 'Error 404', description: 'The page you requested cannot be found.' });
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/mysqltest', routes.mysqltest);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});