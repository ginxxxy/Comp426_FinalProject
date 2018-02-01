$(document).ready(function(){
	if($.cookie("username")!=undefined){
		let username = $.cookie("username");
		let userid = $.cookie("userid");
 		$('#username').empty().append("Hello! ".concat(username));
 		//loading all public blocks
 		load_all_blocks();
 		//loading all saved blocks
 		load_saved_blocks(userid);

 	}else{
 		alert("Not Signed in!");
 		window.location.replace("./index.html");
 	}
})

var load_all_blocks = function(){
	$.ajax({
 	 			type: 'GET',
 	 			url: "../server-side/block.php",
 	 			data: {
 	 				"action": "all"
 	 			},
 	 			datatype: "json",
 	 			cache: false,
 	 			success: function(json){
 	 				// alert("Get Public Blocks success! ");
 	 				console.log(json);
 	 				load_blocks(json, "#blocks_array", "#public-block-popup", 1);
 	 			},
 	 			error: function(xhr,status){
 	 				alert(xhr.status);
 	 			}
 	 		});
}

var load_saved_blocks = function(userid){
	$.ajax({
 	 			type: 'GET',
 	 			url: "../server-side/block.php",
 	 			data: {
 	 				"action": "saved",
 	 				"user_id": userid
 	 			},
 	 			datatype: "json",
 	 			cache: false,
 	 			success: function(json){
 	 				// alert("Get Saved Blocks success! ");
 	 				if(json){
 	 					load_blocks(json,"#saved-blocks-array", "#saved-block-popup", -1);
 	 				}else if(json === null){
 	 					$("#saved-blocks-array").empty();
 	 					$("#saved-block-popup").empty();
 	 				}
 	 			},
 	 			error: function(xhr,status){
 	 				// alert("No saved Block Found. Go and Save some!");
 	 			}
 	 		});
}