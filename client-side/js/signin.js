 $(document).ready(function () {
 	 $('#signin').on('click', function (e) {

 	 	var username=$("#username_signin").val();
 	 	var password=$("#password_signin").val();

		e.stopPropagation();
		e.preventDefault();

 	 	if(username==""){
 	 		alert("Please type in username");
 	 	}else if(password==""){
 	 		alert("Please type in password");
 	 	}else{
			$.ajax(
		       {type: 'GET',
		        url: "../server-side/signin.php",
		        data: {
		        	"action":"signin",
		        	"username":username,
		        	"password":password
		        }, 
		       	datatype: "json",
				cache: false,
	        	success: function(json){ 
	                alert("Sign in Successfully!");
	                window.location.replace("./dashboard.html");
		       },
		       	error: function(xhr,status){
		       		alert(xhr.responseText);
		       	}
		   });
		}
    }); 
});

$(document).ready(function(){
  if($.cookie("username")!=undefined){
    alert("You have already Sign In!");
    window.location.replace("./dashboard.html");
  }
});