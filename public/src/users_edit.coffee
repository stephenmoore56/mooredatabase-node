$(document).ready ->
    # set focus to user name field when form loads
    if (!Modernizr.input.autofocus)
        $("#username").focus()      

    # login form validation
    $("#editUserForm").validate
        rules : 
            'username' : 
                required : true
            'firstname' : 
                required : true  
            'email' : 
                required : true
                email : true
        messages: 
            username: ''
            firstname: ''
            email: 
              required : ''    
              email : ''                             
        errorClass : 'invalid'
        
  return true