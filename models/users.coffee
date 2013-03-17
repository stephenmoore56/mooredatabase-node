mongoose = require('mongoose')
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

# User model
User = new Schema(
	username:
		type: String
		require: true
		trim: true
		unique: true
	password:
		type: String 
		require: true
)

module.exports = mongoose.model('User',User)