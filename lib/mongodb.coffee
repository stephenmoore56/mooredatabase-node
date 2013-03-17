mongoose = require ("mongoose")

# Here we find an appropriate database to connect to, defaulting to
# localhost if we don't find one.  
uristring = 
process.env.MONGOLAB_URI ||
'mongodb://localhost/local';

# Makes connection asynchronously.  Mongoose will queue up database
# operations and release them when the connection is complete.
mongoose.connect(uristring, (err, res) ->
  if (err)
    console.log('ERROR connecting to: ' + uristring + '. ' + err)
)

db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', ->

  # create user schema
  userSchema = mongoose.Schema(
    username:
      type: String
      require: true
      trim: true
      unique: true
    password:
      type: String 
      require: true
  )
  
  # create User model
  User = mongoose.model('User', userSchema)
  
  # clear out old data
  User.remove({}, (err) ->
    if (err)
      console.log('Error deleting old data.')
  )

  ###
  admin / 28rTu932Ypxz987
  pickpocket23bazooka / dY78vNqP37sS94U
  stephenmoore56 / Ty84Db0U6qM33
  ###
  # create salt for hashing
  salt = bcrypt.genSaltSync(10)
  
  # add users
  newUser = new User({ username: 'admin', password: bcrypt.hashSync("28rTu932Ypxz987", salt) });
  newUser.save();
  newUser = new User({ username: 'pickpocket23bazooka', password: bcrypt.hashSync("dY78vNqP37sS94U", salt) });
  newUser.save();
  newUser = new User({ username: 'stephenmoore56', password: bcrypt.hashSync("Ty84Db0U6qM33",   salt) });
  newUser.save();

  console.log('Added three users.');
)