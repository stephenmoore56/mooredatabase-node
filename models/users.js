// Generated by CoffeeScript 1.4.0
(function() {
  var ObjectId, Schema, User, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  User = new Schema({
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    }
  });

  module.exports = mongoose.model('User', User);

}).call(this);