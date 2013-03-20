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
  users = _.extend(require('../controllers/users'))
  controllers.users = users  
  
  # routes to controllers
  app.get('/', controllers.content.nodejs)
  app.get('/content', controllers.content.nodejs)
  app.get('/content/nodejs', controllers.content.nodejs)
  app.get('/birding', controllers.birding.orders)
  app.get('/birding/orders', controllers.birding.orders)
  app.get('/birding/ordersajax', controllers.birding.ordersajax)
  app.get('/logout', controllers.auth.logout)   

  # routes requiring https
  app.get('/auth/login', controllers.auth.login)
  app.post('/auth/login', controllers.auth.authenticate) 
  app.get('/login', controllers.auth.login)  
  app.get('/logout', controllers.auth.logout) 
  app.get('/auth/logout', controllers.auth.logout) 
  app.get('/content/menu', controllers.content.menu)
  
  # user routes
  app.get('/users', controllers.users.index) 
  app.get('/users/index', controllers.users.index)
  app.get('/users/destroy/:id', controllers.users.destroy)
  true