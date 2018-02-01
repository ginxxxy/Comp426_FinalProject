<?php  
require_once('orm/Block.php');

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
}
else{
    $path_components =null;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if(isset($_POST['action'])){
    	if ($_POST['action']=='save') {

    		$user_id = $_POST['user_id'];
    		$block_id = $_POST['block_id'];

    		$response=Block::saveBlock($user_id, $block_id);

    		if($response >= 0){
		        header("Content-type: application/json");
		        print(json_encode($response));
		        exit();
		    }else{
		      header("HTTP/1.0 400 Bad Request");
		      print(json_encode(-1));
		      exit();
		    }

    	}
    }
}else if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if(isset($_GET['action'])){
    	if ($_GET['action']=='delete') {

    		$user_id = $_GET['user_id'];
    		$block_id = $_GET['block_id'];

    		$response=Block::removeBlock($user_id, $block_id);

    		if($response >= 0){
		        header("Content-type: application/json");
		        print(json_encode($response));
		        exit();
		    }else{
		      header("HTTP/1.0 400 Bad Request");
		      print(json_encode(-1));
		      exit();
		    }

    	}
    }
}

?>