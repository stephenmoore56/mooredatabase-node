# dependencies
express = require('express')
http = require('http')
path = require('path')
engine = require('ejs-locals')
RedisStore = require('connect-redis')(express)

# set environment before starting express
process.env.NODE_ENV = "production"
#process.env.NODE_ENV = "development"

# start an express app
app = express()

# routing
routes = require('./lib/routes')(app)

# logging
logger = require('./lib/logger').factory()
logger.log('info','Starting app in ' + process.env.NODE_ENV + ' mode...')

# use ejs-locals for all ejs templates
app.engine('ejs', engine)

app.configure ->
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  # use ejs templating
  app.set('view engine', 'ejs')
  # serve up express favicon
  app.use(express.favicon())
  # log incoming requests to console in dev mode
  app.use(express.logger('dev'))
  # gzip output
  app.use(express.compress())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  # sessions expire in 2 hours
  app.use(express.session({ 
  	secret: "pileated woodpecker",
  	expires: new Date(Date.now() + (2 * 60 * 60 * 1000)) }))  
  # application routes
  app.use(app.router)
  # routes for static assets in public directory
  app.use(express.static(path.join(__dirname, 'public')))   
  # error handler
  # middleware with an arity of 4 are considered
  # error handling middleware. When you next(err)
  # it will be passed through the defined middleware
  # in order, but ONLY those with an arity of 4, ignoring
  # regular middleware.
  app.use (err, req, res, next) ->
    # whatever you want here, feel free to populate
    # properties on `err` to treat it differently in here.
    res.status(err.status || 500).render('error', { title: 'Error', description: err.message })
  # 404 page
  app.use (req, res, next) ->
    res.status(404).render('error', { title: 'Error 404', description: 'The page you requested cannot be found.' })

app.configure 'development', ->
  app.use express.errorHandler()

http.createServer(app).listen(app.get('port'), ->
  console.log "Express server listening on port " + app.get('port'))