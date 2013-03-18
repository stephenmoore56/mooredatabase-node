var mongoose = require ("mongoose");
var bcrypt = require('bcrypt');
User = require('./models/users.js')

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
process.env.MONGOLAB_URI || 
'mongodb://localhost/local';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
  	console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  	console.log ('Succeeded connecting to: ' + uristring);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {

	// // create user schema
	// var userSchema = mongoose.Schema({
    	// username: {type: String, require: true, trim: true, unique: true},
    	// password: {type: String, require: true}
	// });
// 	
	// // create User model
	// var User = mongoose.model('User', userSchema);
	
	// clear out old data
	User.remove({}, function(err) {
		if (err) {
			console.log ('Error deleting old data.');
  		}
	});

	/*
	admin / 28rTu932Ypxz987
	pickpocket23bazooka / dY78vNqP37sS94U
	stephenmoore56 / Ty84Db0U6qM33
	*/
	// create salt for hashing
	var salt = bcrypt.genSaltSync(10);
	
	// add users
	var newUser = new User({ username: 'admin', password: bcrypt.hashSync("28rTu932Ypxz987", salt) });
	newUser.save();
	var newUser = new User({ username: 'pickpocket23bazooka', password: bcrypt.hashSync("dY78vNqP37sS94U", salt) });
	newUser.save();
	var newUser = new User({ username: 'stephenmoore56', password: bcrypt.hashSync("Ty84Db0U6qM33",   salt) });
	newUser.save();

	console.log('Added three users.');
});