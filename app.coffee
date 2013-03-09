# dependencies
express = require('express')
http = require('http')
path = require('path')
engine = require('ejs-locals')
RedisStore = require('connect-redis')(express)
flash = require('connect-flash')

if process.env.REDISTOGO_URL
  rtg   = require('url').parse process.env.REDISTOGO_URL
  redis = require('redis').createClient rtg.port, rtg.hostname
  redis.auth rtg.auth.split(':')[1] # auth 1st part is username and 2nd is password separated by ":"
# Localhost
else
  redis = require("redis").createClient()

# set environment before starting express
process.env.NODE_ENV = "production"
#process.env.NODE_ENV = "development"

# start an express app
app = express()

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
  # log incoming requests to console in dev mode
  app.use(express.logger('dev'))
  # gzip output
  app.use(express.compress())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  # routes for static assets in public directory; put before
  # stuff for pages that require sessions, flash, ssl, authentication, etc.
  app.use(express.static(path.join(__dirname, 'public')))    
  # sessions expire in 2 hours
  app.use(express.session
    store: new RedisStore {client: redis}
    secret: 'pileatedwoodpecker'
  )
  # flash message support
  app.use(flash()) 
  # stick some session variables where views can see them	
  app.use (req, res, next) ->
    req.session.auth ?= false
    req.session.username ?= 'nobody'
    res.locals.authenticated = req.session.auth
    res.locals.username = req.session.username            
    next()
    return  
  # set up routes after bodyParser() is called	 
  routes = require('./lib/routes')(app)  	
  # application routes
  app.use(app.router) 
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
  console.log "Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment")