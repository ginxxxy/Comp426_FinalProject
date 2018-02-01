<?php

class Block{
	private $id;
	private $user_id;
	private $title;
	private $language;
	private $description;
	private $code;

	public static function connect() {
    	return new mysqli("classroom.cs.unc.edu", 
		      	"chenhk", 
				"123888LR", 
		      	"chenhkdb");
    }

  	private function __construct($id, $user_id, $title, $language, $description, $code){
  		$this->id=$id;
  		$this->user_id=$user_id;
  		$this->title=$title;
  		$this->language=$language;
  		$this->description=$description;
  		$this->code=$code;
  	}

	public static function findAllBlocks(){
		$mysqli=Block::connect();

		$result= $mysqli->query("SELECT * FROM final_CodeBlock");
		
		$block_array = array();

		if ($result) {
	      while ($next_row = $result->fetch_array()) {
	      	$id = $next_row['id'];
	      	$user_id = $next_row['user_id'];
	      	$title = $next_row['title'];
	      	$language = $next_row['language'];
	      	$description = $next_row['description'];
	      	$code = $next_row['code'];
	      	$real_code = base64_decode($code);

	      	$real_next_row = array('id' => $id, 'user_id'=> $user_id,'title' => $title,'language' => $language,'description' => $description, 'code' => $real_code);

			$block_array[] = $real_next_row;
	      }
	      return $block_array;
	    }
	}

	public static function findSavedBlocks($user_id){
		$mysqli=Block::connect();

		$result= $mysqli->query("SELECT * FROM final_CodeBlock 
			WHERE id IN 
			(SELECT blockid FROM final_SavedBlock WHERE user_id = $user_id) ");
		
		$block_array = array();

		if ($result) {
	      while ($next_row = $result->fetch_array()) {
			$id = $next_row['id'];
	      	$user_id = $next_row['user_id'];
	      	$title = $next_row['title'];
	      	$language = $next_row['language'];
	      	$description = $next_row['description'];
	      	$code = $next_row['code'];
	      	$real_code = base64_decode($code);

	      	$real_next_row = array('id' => $id, 'user_id'=> $user_id,'title' => $title,'language' => $language,'description' => $description, 'code' => $real_code);

			$block_array[] = $real_next_row;
			
	      }
	      return $block_array;
	    }
	}

	public static function uploadBlock($user_id,$title,$language,$description,$code){
		$mysqli=Block::connect();
		$real_code = base64_encode($code);

		$result=$mysqli->query("INSERT INTO final_CodeBlock (user_id,title,language,description,code) 
			values ($user_id, '$title', '$language', '$description', '$real_code')"
			);

		if($result){
			return $mysqli->insert_id;
		}else{
			return -1;
		}
	}

	public static function saveBlock($user_id,$block_id){
		$mysqli=Block::connect();

		$result=$mysqli->query("INSERT INTO final_SavedBlock (user_id, blockid) 
			values ($user_id, $block_id)");

		if($result){
			return $mysqli->insert_id;
		}else{
			return -1;
		}
	}

	public static function removeBlock($user_id, $block_id){
		$mysqli=Block::connect();

		$result=$mysqli->query("DELETE FROM final_SavedBlock WHERE user_id = $user_id AND blockid = $block_id");

		if($result){
			return 1;
		}else{
			return -1;
		}
	}


	public function getID(){
		return $this->id;
	}

	public function getUserID(){
		return $this->user_id;
	}
	public function getLanguage(){
		return $this->language;
	}
	public function getJSON(){
		$json_obj = array('id' => $this->id,
			      'user_id' => $this->user_id,
			      'language' => $this->language,
			      'description' =>$this->description,
			      'code' =>$this->code
			      );
	    return json_encode($json_obj);
	}
}
?>