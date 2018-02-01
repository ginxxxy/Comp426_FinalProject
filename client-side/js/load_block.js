var load_blocks = function(blocks, pic_location, form_location, option){
  $(pic_location).empty();
  $(form_location).empty();

	blocks.forEach(function(block){
		load_block(block,pic_location,form_location,option);
	});
}

var load_block = function(block, pic_location,form_location, option){
	load_block_pic(block,pic_location,option);
	load_block_form(block, form_location, option);
}

var load_block_pic = function(block, location, option){
	var context = "<div class='col-md-6 col-lg-4'>";
  context = context + '<h3 class="block-title text-center">';
  context = context + block['title'];
  context = context + '</h3>';

	context = context.concat("<a class='portfolio-item d-block mx-auto' data-toggle='modal' data-target='#block-modal-");
	context = context.concat(block['id']);
  if(option == -1){
    context = context + "-already";
  }
	context = context.concat("'>");
	context = context.concat("<div class='portfolio-item-caption d-flex position-absolute h-100 w-100'>");
	context = context.concat("<div class='portfolio-item-caption-content my-auto w-100 text-center text-white'>");
	context = context.concat("<i class='fa fa-search-plus fa-3x'></i>");
	context = context.concat("</div></div><img class='img-fluid' src='img/portfolio/cabin.png' alt=''></a></div>");
	$(location)[0].insertAdjacentHTML('beforeend', context);
}

var load_block_form = function(block, location, option){
	var context = '<div class="modal fade" id="block-modal-';
	context = context.concat(block['id']);
  if(option == -1){
    context = context + "-already";
  }
	context = context.concat('" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
          <div class="modal-dialog" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <h5 class="modal-title">Save this Block if you like!</h5>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                  <span aria-hidden="true">&times;</span>\
                </button>\
              </div>\
              <div class="modal-body">\
                <form>\
                  <label class = "code_title_label">Title:</label>\
                  <br>');
  context = context + "<div class='code_title'>" + block['title'] + "</div>";
	context = context.concat('<br>\
                  <label class = "code_language_label">Language:</label>\
                  <br>');
	context = context + "<div class='code_language'>" + block['language'] + "</div>";
	context = context + '<br>\
                  <label class = "code_description_label">Description:</label>\
                  <br>';
  context = context + "<div class='code_description'>" + block['description'] + "</div>";
  context = context + '<br>\
                  <label class = "code_body_label">Code Body:</label>\
                  <br>\
                  <textarea name="codebody" class="form-control" style="min-width: 100%" rows="10" \
                  class="code_body">';
  context = context + block['code'] + '</textarea>';
  context = context + '</form> \
              </div>\
              <div class="modal-footer">\
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\
                <button type="button" class="btn btn-success" id="block-save';
  context = context + "-" + block['id'];

  if(option == -1){
    context = context + "-already";
  }

  context = context +'">Saved</button>\
              </div>\
            </div>\
          </div>\
        </div>';
  $(location)[0].insertAdjacentHTML('beforeend', context);
  let id = block['id'];
  var listen_id = "#block-save-"+id;
	if(option == 1){
    $(listen_id).on('click', function(e){
    	let user_id = $.cookie("userid");
    	save_block(user_id,id);
      // alert(listen_id + "listener added!");
      });
  }else if(option == 0){
    $(listen_id).empty().append("Login to Save this block!")
  }else{
    $(listen_id+"-already").empty().append("Remove");
    $(listen_id+"-already").addClass("btn-danger");

    $(listen_id+"-already").on('click', function(e){
      let user_id = $.cookie("userid");
      let block_id = id;
      remove_block(user_id, block_id);
    })
  }
}


