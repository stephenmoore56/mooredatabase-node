# connect to mongoose and stay connected
# Makes connection asynchronously.  Mongoose will queue up database
# operations and release them when the connection is complete.
mongoose = require('mongoose')
uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/local'
mongoose.connect(uristring, (err, res) ->
  if (err)
    console.log('Error connecting to: ' + uristring + '. ' + err)
)
exports.mongoose = mongoose