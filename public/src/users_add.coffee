$(document).ready ->
    # set focus to user name field when form loads
    if (!Modernizr.input.autofocus)
        $("#username").focus()      

    # login form validation
    $("#newUserForm").validate
        rules : 
            'username' : 
                required : true
            'password' : 
                required : true
            'firstname' : 
                required : true  
            'email' : 
                required : true
                email : true                             
        messages: 
            username: ''
            password: ''
            firstname: ''
            email: 
              required : ''    
              email : ''        
        errorClass : 'invalid'
        
  return true