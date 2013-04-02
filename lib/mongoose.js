// Generated by CoffeeScript 1.6.1
(function() {
  var mongoose, uristring;

  mongoose = require('mongoose');

  uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/local';

  mongoose.connect(uristring, function(err, res) {
    if (err) {
      console.log('Error connecting to: ' + uristring + '. ' + err);
    }
  });

  exports.mongoose = mongoose;

}).call(this);