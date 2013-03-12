# dependencies
bcrypt = require('bcrypt')
auth = require('../lib/auth')

if (process.env.REDISTOGO_URL)
  	# redistogo connection
	rtg   = require("url").parse(process.env.REDISTOGO_URL)
	client = require("redis").createClient(rtg.port, rtg.hostname)
	client.auth(rtg.auth.split(":")[1])
else
	redis = require("redis")
	client = redis.createClient()

client.on("error", (err) ->
    console.log("Redis Error: " + err)
    return
)

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
	client.get(username, (err, reply) ->
		if (err)
			req.flash("error","An error occurred.")
			res.redirect('/auth/login')
			return
		if (!reply)
			req.flash("error","Invalid username/password combination.")
			res.redirect('/auth/login')
			return
		bcrypt.compare(password, reply, (err, same) ->
			if (err)
				req.flash("error","An error occurred.")
				res.redirect('/auth/login')
				return	
			if (! same)
				req.flash("error","Invalid username/password combinationxxx.")
				res.redirect('/auth/login')
				return
			else	
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
	