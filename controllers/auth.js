// dependencies
var auth = require('../lib/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function(err, user) {
      // if (err) { return done(err); }
      // if (!user) {
        // return done(null, false, { message: 'Incorrect username.' });
      // }
      // if (!user.validPassword(password)) {
        // return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
    // });
    var user;
    return done(null, user);
  }
));

// auth controller actions
exports.login = function(req, res){
	auth.ssl_required(req,res,true);
	res.render('auth/login', { title: 'Login' });
};
exports.authenticate = function(req, res){
	auth.ssl_required(req,res,true);
	// passport.authenticate('local', { successRedirect: '/content/menu',
   									 // failureRedirect: '/login'})
   	res.redirect('/content/menu');
};
// need a logout / destroy session action here
exports.logout = function(req,res) {
  req.logout();
  res.redirect('/');	
}