<?php  
require_once('orm/Block.php');

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
}
else{
    $path_components =null;
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if(isset($_GET['action'])){
    	if ($_GET['action']=='all') {

    		$blocks=Block::findAllBlocks();

    		if($blocks){
		        header("Content-type: application/json");
		        print(json_encode($blocks));
		        exit();
		    }else{
		      header("HTTP/1.0 400 Bad Request");
		      print(json_encode(-1));
		      exit();
		    }

    	}else if ($_GET['action']=='saved') {
    		$userid = $_GET['user_id'];

    		$saved_blocks=Block::findSavedBlocks($userid);

    		if($saved_blocks){
		        header("Content-type: application/json");
		        print(json_encode($saved_blocks));
		        exit();
		    }else{
		      header("Content-type: application/json");
		      print(json_encode(null));
		      exit();
		    }

    	}
    }
}

?>