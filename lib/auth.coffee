exports.ssl_required = (req,res) ->
  if req.headers['x-forwarded-proto'] isnt 'https'
    if process.env.NODE_ENV is 'production'
      res.redirect('https://node.moore-database.com' + req.url)  
  true
exports.ssl_not_required = (req,res) ->
  if req.headers['x-forwarded-proto'] is 'https'
    if process.env.NODE_ENV is 'production'
      res.redirect('http://node.moore-database.com' + req.url)  
  true  
