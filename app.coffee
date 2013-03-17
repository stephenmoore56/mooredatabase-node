express = require('express')
http = require('http')
path = require('path')
engine = require('ejs-locals')
MemStore = express.session.MemoryStore
flash = require('connect-flash')

# connect to mongoose and stay connected
# Makes connection asynchronously.  Mongoose will queue up database
# operations and release them when the connection is complete.
mongoose = require('mongoose')
uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/local'
mongoose.connect(uristring, (err, res) ->
  if (err)
    console.log('Error connecting to: ' + uristring + '. ' + err)
  else
    console.log('Connected to Mongoose')
)

process.env.NODE_ENV = "production"
process.env.NODE_ENV = "development"

app = express()
app.engine('ejs', engine)

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
    store: MemStore(
      reapInterval: 60000 * 10
    )
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