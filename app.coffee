# nodetime initialization
if process.env.NODETIME_ACCOUNT_KEY
  require('nodetime').profile(
    accountKey: process.env.NODETIME_ACCOUNT_KEY
    appName: 'MOORE+DATABASE Node' # optional
  )
# dependencies
express = require('express')
http = require('http')
path = require('path')
engine = require('ejs-locals')
ejs = require('ejs')
ejsFilters = require('./lib/ejsFilters.js')
flash = require('connect-flash')
url = require('url')
RedisStore = require('connect-redis')(express)
mongoose = require('./lib/mongoose')

# set environment
if process.env.REDISTOGO_URL?
  process.env.NODE_ENV = "production"
else
  process.env.NODE_ENV = "development"

# express app, templating engine, filters
app = express()
app.engine('ejs', engine)

# parse redis to go URL; use defaults locally
app.configure('production', ->
  redisUrl = url.parse(process.env.REDISTOGO_URL)
  redisAuth = redisUrl.auth.split(':')  
  app.set('redisHost', redisUrl.hostname)
  app.set('redisPort', redisUrl.port)
  app.set('redisDb', redisAuth[0])
  app.set('redisPass', redisAuth[1])
)

app.configure ->
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))    
  app.use(express.session(
    secret: 'pileated_woodpecker'
    store: new RedisStore(
      host: app.set('redisHost')
      port: app.set('redisPort')
      db: app.set('redisDb')
      pass: app.set('redisPass')
    )
    cookie:
      maxAge: 3600000
  ))
  app.use(flash()) 
  app.use (req, res, next) ->
    req.session.auth ?= false
    req.session.username ?= 'nobody'
    res.locals.authenticated = req.session.auth
    res.locals.username = req.session.username            
    next()
    return   
  routes = require('./lib/routes')(app)  	
  app.use(app.router) 
  # error handler
  # middleware with an arity of 4 are considered
  # error handling middleware. When you next(err)
  # it will be passed through the defined middleware
  # in order, but ONLY those with an arity of 4, ignoring
  # regular middleware.
  app.use (err, req, res, next) ->
    res.status(err.status || 500).render('error', { title: 'Error', description: err.message })
  app.use (req, res, next) ->
    res.status(404).render('error', { title: 'Error 404', description: 'The page you requested cannot be found.' })

# error logging
app.configure('development', ->
  app.use(express.logger())
  app.use(express.errorHandler(
    dumpExceptions: true
    showStack : true
  ))
)

app.configure('production', ->
  app.use(express.errorHandler(
    dumpExceptions: false
    showStack: false  
  ))
)

http.createServer(app).listen(app.get('port'), ->
  console.log "Express server listening on port " + app.get('port') + " in " + process.env.NODE_ENV + " environment")