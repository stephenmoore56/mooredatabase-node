// static content controller
var auth = require('../lib/auth');
exports.nodejs = function(req, res){
	auth.ssl_not_required(req,res);
	res.render('static-content/nodejs', { title: 'Node.js' });
};
exports.menu = function(req, res){
	auth.ssl_required(req,res);
	res.render('static-content/menu', { title: 'Menu' });
};