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
	firstname:
    type: String
    require: true
    trim: true    
  lastname:
    type: String
    trim: true    
  email:
    type: String
    require: true
    trim: true
    lowercase: true
  created:
    type: Date
    default: Date.now 
    require: true
  updated:
    type: Date
    default: Date.now 
    require: true          
)

module.exports = mongoose.model('User',User)