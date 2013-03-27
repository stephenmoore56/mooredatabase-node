# index or root controller
auth = require('../lib/auth')

exports.index = (req, res) ->
	auth.ssl_required(req,res,false)
	res.render('static-content/nodejs', { title: 'Node.js' })
	return