$('#upload-submit').on('click',function(e){
 		var title=$("#code_title").val();
 	 	var language=$("#code_language").val();
 	 	var description=$("#code_description").val();
 	 	var code_body=$("#code_body").val();
 	 	var user_id=$.cookie("userid");

 	 	e.stopPropagation();
		e.preventDefault();

		if(title=="" || title.length > 30 ){
 	 		alert("Please Type in your Block title within 30 characters");
 	 	}else if(language=="" || language.length >15 ){
 	 		alert("Please Type in language of your code within 15 characters");
 	 	}else if(description==""){
 	 		alert("Please type in description of your code block");
 	 	}else if(description.length > 255 ){
 	 		alert("Please limit your description within 255 characters");
 	 	}else if(code_body==""){
 	 		alert("Please input your code");
 	 	}else{
 	 		$.ajax({
 	 			type: 'POST',
 	 			url: "../server-side/upload.php",
 	 			data: {
 	 				"action": "upload",
 	 				"user_id": user_id,
 	 				"title": title,
 	 				"language": language,
 	 				"description": description,
 	 				"code_body": code_body
 	 			},
 	 			datatype: "json",
 	 			cache: false,
 	 			success: function(json){
 	 				alert("Upload Block Success!");
 	 				$('#upload').modal('toggle');
 	 				load_all_blocks();
 	 				// location.reload(true);
 	 			},
 	 			error: function(xhr,status){
 	 				alert(xhr.responseText);
 	 			}
 	 		});
 	 	}


 	});