// login controller
var auth = require('../lib/auth');
exports.login = function(req, res){
	auth.ssl_required(req,res,true);
	res.render('auth/login', { title: 'Login' });
};
exports.authenticate = function(req, res){
	auth.ssl_required(req,res,true);
	// redirect if successful; eventually, will add a check_auth call before
	// routing to certain pages and redirect to login if user hasn't been authenticated
	res.redirect("/content/menu");
};
// need a logout / destroy session action here