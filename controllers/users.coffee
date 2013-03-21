User = require('../models/users.js')
auth = require('../lib/auth')

# index listing of users at /users/
exports.index = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)  
  User.find({}, (err,users) ->
    res.render('users/index', {title : 'Users', users : users, flash: req.flash()})
    return
  )
  return
  
# delete a user
exports.destroy = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)
  id = req.params.id
  User.remove({_id : id}, (err) ->
    if (err)
      req.flash("error","Invalid user id.")
      res.redirect('/users/index')
      return
    else
      req.flash("error","User deleted.")
      res.redirect('/users/index')
      return     
  )
  return
