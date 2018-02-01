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
    	if ($_POST['action']=='upload') {
    		$user_id = $_POST['user_id'];
    		$title = $_POST['title'];
    		$language = $_POST['language'];
    		$description = $_POST['description'];
    		$code_body = $_POST['code_body'];

    		$response=Block::uploadBlock($user_id,$title,$language,$description,$code_body);

    		if($response >=0){
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