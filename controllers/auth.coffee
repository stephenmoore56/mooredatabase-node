# dependencies
bcrypt = require('bcrypt')
auth = require('../lib/auth')
User = require('../models/users.js')

# auth controller actions
exports.login = (req, res) ->
	auth.ssl_required(req,res,true)
	res.render('auth/login', { locals: { title: 'Login', flash: req.flash() } })
	return
	
exports.authenticate = (req, res) ->
	auth.ssl_required(req,res,true)
	# extract username and password from POST
	username = req.body.username
	password = req.body.password
	User.findOne({username : username}, (err,user) ->
	  if (err)
      req.flash("error","Invalid username/password combination.")
      res.redirect('/auth/login')
      return
    if (! user)
      req.flash("error","Invalid username/password combination.")
      res.redirect('/auth/login')
      return      
    bcrypt.compare(password, user.password, (err, same) ->
      if (err)
        req.flash("error","An error occurred.")
        res.redirect('/auth/login')
        return  
      if (! same)
        req.flash("error","Invalid username/password combination.")
        res.redirect('/auth/login')
        return
      else  
        req.flash("error","Welcome, #{username}.")
        req.session.auth = true
        req.session.username = username
        res.locals.authenticated = true
        res.locals.username = username    
        res.redirect('/content/menu')
        return
      return
    ) 
    return   
	)
	return
	
# need a logout / destroy session action here
exports.logout = (req,res) ->
	req.session.regenerate ->
    	res.redirect('/auth/login')
    	return
    return