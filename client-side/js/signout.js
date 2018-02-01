$(document).ready(function(){
	$('#signout').on('click', function (e) {
		$.ajax(
			{
				type:'GET',
				url: "../server-side/signout.php",
				cache: false,
				success: function(e){ 
	                alert("Log out success!");
	   				window.location.replace("./index.html");
		       }
			}
		);
	});
});