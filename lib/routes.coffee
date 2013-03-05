_ = require('underscore')
module.exports = (app) ->
  # controllers
  controllers = require('../controllers')
  content = _.extend(require('../controllers/static-content'))
  controllers.content = content
  birding = _.extend(require('../controllers/birding'))
  controllers.birding = birding
  auth = _.extend(require('../controllers/auth'))
  controllers.auth = auth
  
  # routes to controllers
  app.get('/', controllers.content.nodejs)
  app.get('/content', controllers.content.nodejs)
  app.get('/content/nodejs', controllers.content.nodejs)
  app.get('/birding', controllers.birding.orders)
  app.get('/birding/orders', controllers.birding.orders)
  app.get('/birding/ordersajax', controllers.birding.ordersajax)
  
  # # routes that require https
  # app.all('*', (req,res,next) ->
    # if req.headers['x-forwarded-proto'] isnt 'https'
      # res.redirect('https://node.moore-database.com' + req.url)
    # else
      # next() # Continue to other routes if we're not redirecting
  # )  

  # routes requiring https
  app.get('/auth/login', controllers.auth.login)
  app.post('/auth/login', controllers.auth.authenticate)  
  app.get('/login', controllers.auth.login)  
  app.get('/content/menu', controllers.content.menu)  
