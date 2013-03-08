// dependencies
var auth = require('../lib/auth');
var bcrypt = require('bcrypt');
if (process.env.REDISTOGO_URL) {
  	// redistogo connection
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var redis = require("redis").createClient(rtg.port, rtg.hostname);
	redis.auth(rtg.auth.split(":")[1]);  
} else {
	var redis = require("redis"),
	    client = redis.createClient();
}

client.on("error", function (err) {
    console.log("Redis Error: " + err);
});

// auth controller actions
exports.login = function(req, res){
	auth.ssl_required(req,res,true);
	res.render('auth/login', { locals: { title: 'Login', flash: req.flash() } });
};
exports.authenticate = function(req, res){
	auth.ssl_required(req,res,true);
	// extract username and password from POST
	var username = req.body.username;
	var password = req.body.password;
	client.get(username, function(err, reply) {
		if (err) {
			req.flash("error","An error occurred.");
			res.redirect('/auth/login');
			return;
		}
		if (!reply) {
			req.flash("error","Invalid username/password combination.");
			res.redirect('/auth/login');
			return;
		}
		bcrypt.compare(password,reply,function(err, same) {
			if (err) {
				req.flash("error","An error occurred.");
				res.redirect('/auth/login');
				return;		
			}
			if (! same) {
				req.flash("error","Invalid username/password combination.");
				res.redirect('/auth/login');
				return;	
			} else {	
				req.session.auth = true;
    			req.session.username = username;				
				res.redirect('/content/menu');
				return;			
			}
		});
	});	
};
// need a logout / destroy session action here
exports.logout = function(req,res) {
  req.session.regenerate(function(){
    res.redirect('/auth/login');
  })
}