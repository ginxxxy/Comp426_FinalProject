var save_block = function(user_id, block_id){
	$.ajax({
 	 			type: 'POST',
 	 			url: "../server-side/save.php",
 	 			data: {
 	 				"action": "save",
 	 				"user_id": user_id,
 	 				"block_id": block_id
 	 			},
 	 			datatype: "json",
 	 			cache: false,
 	 			success: function(json){
 	 				alert("Saved block successfully!");

 	 				let id = "#block-modal-" + block_id;
 	 				$(id).modal('toggle');

 	 				load_saved_blocks(user_id);
 	 			},
 	 			error: function(xhr,status){
 	 				alert("You have saved this block before.");
 	 			}
 	 		});
}

var remove_block = function(user_id, block_id){
	let id = "#block-modal-" + block_id+"-already";
 	$(id).modal('toggle');

	$.ajax({
 	 			type: 'GET',
 	 			url: "../server-side/save.php",
 	 			data: {
 	 				"action": "delete",
 	 				"user_id": user_id,
 	 				"block_id": block_id
 	 			},
 	 			datatype: "json",
 	 			cache: false,
 	 			success: function(json){
 	 				alert("Remove Block successfully!");
 	 				load_saved_blocks(user_id);
 	 				// location.reload(true);
 	 			},
 	 			error: function(xhr,status){
 	 				alert("This Block cannot be removed.");
 	 			}
 	 		});
}