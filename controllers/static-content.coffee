# static content controller
auth = require('../lib/auth')
exports.nodejs = (req, res) ->
	auth.ssl_required(req,res,false)
	res.render('static-content/nodejs', { title: 'Node.js' })
exports.menu = (req, res) ->
	auth.ssl_required(req,res,true)
	auth.auth_required(req,res)
	res.render('static-content/menu', { title: 'Menu' })