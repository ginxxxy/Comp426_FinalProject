 $(document).ready(function () {
 	 $('#signup').on('click', function (e) {

 	 	var username=$("#username_signup").val();
 	 	var password=$("#password_signup").val();
 	 	var email=$("#email_signup").val();

		e.stopPropagation();
		e.preventDefault();

 	 	if(username==""){
 	 		alert("Please type in username");
 	 	}else if(password==""){
 	 		alert("Please type in password");
 	 	}else if (username.includes("&") || username.includes("=") || username.includes("<") ||
 	 			username.includes(">") || username.includes("+") || username.includes(",")){
			alert("Username has invalid character.");
 	 	} else if (password.length < 6){
 	 		alert("Password must contain at least 6 characters.");
 	 	} else if (!(/[a-z]/).test(password)){
 	 		alert("Password must include one character from a-z.");
 	 	} else if (!email.includes("@")){
 	 		alert("Email address is not valid.");
 	 	} else if (username.includes(" ")|| password.includes(" ")){
 	 		alert("Username and password cannot contain white space.");
 	 	}
 	 	else{
		$.ajax(
		       {type: 'POST',
		        url: "../server-side/signup.php", 
		        data:{
		        	username: username,
		        	password: password,
		        	email: email
		        },

		       	datatype: "json",
				cache: false,
	        	success: function(json){ 
		            if(json>=0){//regi success
		                alert("Successfully registered");
						window.location.replace("./dashboard.html");
		            }
	            },
		       	error: function(xhr,status){
			       	if(xhr.responseText==-1){//email redundent
		            	alert("Duplicate Email");
		            }else if(xhr.responseText==-2){//username redundent
		            	alert("Username Already Exists");
		            }else if(xhr.responseText==-3){//both username and email are redundent
		            	alert("Both Email and Username already exist");
		            }else if(xhr.responseText==-4){ // Database Bug
		            	alert("Database Bug");
		            }else{
		            	alert("testing");
		            }
		       	}
		    });
		}
    }); 
});