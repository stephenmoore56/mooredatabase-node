User = require('../models/users.js')
auth = require('../lib/auth')
bcrypt = require('bcrypt')

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

exports.add = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)  
  res.render('users/add', {title: 'Add New User', flash: req.flash()})
  return
  
exports.create = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)
  salt = bcrypt.genSaltSync(10)
  newUser =
    username: req.body.username
    password: bcrypt.hashSync(req.body.password, salt)
    firstname: req.body.firstname
    lastname: req.body.lastname
    email: req.body.email
    
  userObj = new User(newUser)
  
  userObj.save( (err,data) ->
    if (err)
      req.flash("error", "" + err)
      res.redirect('users/add')
    else
      req.flash("error","User added.")
      res.redirect('users/index')
    return
  )      
  return
  
exports.edit = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)  
  id = req.params.id
  User.findOne({_id : id}, (err,user) ->
    if (err)
      res.send(err)
    else
      res.render('users/edit', {title: 'Edit User', user: user, flash: req.flash()})
    return
  )
  return
  
exports.update = (req,res) ->
  auth.ssl_required(req,res,true)
  auth.auth_required(req,res)
  if (req.body.password != "")
    salt = bcrypt.genSaltSync(10)
    newUser =
      username: req.body.username
      password: bcrypt.hashSync(req.body.password, salt)
      firstname: req.body.firstname
      lastname: req.body.lastname
      email: req.body.email
      updated: Date.now()
  else
    newUser =
      username: req.body.username
      firstname: req.body.firstname
      lastname: req.body.lastname
      email: req.body.email
      updated: Date.now()
  
  User.update({_id: req.body.id}, newUser, (err,data) ->
    if (err)
      req.flash("error", "" + err)
      res.redirect('users/edit/' + id)
    else
      req.flash("error","User updated.")
      res.redirect('users/index')
    return
  )      
  return