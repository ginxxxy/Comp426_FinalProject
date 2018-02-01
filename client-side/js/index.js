$(document).ready(function(){

  $.ajax({
        type: 'GET',
        url: "../server-side/block.php",
        data: {
          "action": "all"
        },
        datatype: "json",
        cache: false,
        success: function(json){
          var blocks = json.slice(0,6);
          load_blocks(blocks, "#blocks_showcase_array", "#blocks_showcase_modal", 0);
          console.log(blocks);
          // load_block_pic(json[0],"#blocks_array",);
          // load_block_form(json[0]);
        },
        error: function(xhr,status){
          alert("errors loading index page");
        }
      });
});