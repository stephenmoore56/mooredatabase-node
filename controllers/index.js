// index or root controller
var auth = require('../lib/auth');
exports.index = function(req, res){
	auth.ssl_not_required(req,res);
	res.render('static-content/nodejs', { title: 'Node.js' });
};