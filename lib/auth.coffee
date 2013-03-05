exports.ssl_required = (req,res,required) ->
  console.log 'Environment:' + process.env.NODE_ENV
  # only check for http/https in production
  if process.env.NODE_ENV is 'production'
    if required  
      if req.headers['x-forwarded-proto'] isnt 'https'
        res.redirect('https://node.moore-database.com' + req.url) 
    else
      if req.headers['x-forwarded-proto'] is 'https'
          res.redirect('http://node.moore-database.com' + req.url)        
  true