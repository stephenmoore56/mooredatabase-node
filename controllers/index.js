// index or root controller
var auth = require('../lib/auth');
exports.index = function(req, res){
	auth.ssl_required(req,res,false);
	res.render('static-content/nodejs', { title: 'Node.js' });
};