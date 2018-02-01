<?php

class User{
	private $id;
	private $username;
	private $email;
	private $password;

	public static function connect() {
    	return new mysqli("classroom.cs.unc.edu", 
		      	"chenhk", 
				"123888LR", 
		      	"chenhkdb");
    }

  	private function __construct($id, $username, $password, $email){
  		$this->id=$id;
  		$this->username=$username;
  		$this->password=$password;
  		$this->email=$email;
  	}

	public static function checkUser($username, $password){
		$mysqli = User::connect();
		$result = $mysqli->query("SELECT * FROM final_User WHERE username='$username'");

		if ($result) {
			if($result->num_rows==0){
				return null; // no User found according to Username
			}

			$row=$result->fetch_array();
			$pass=$row['password'];

			if($pass==md5($password)){
				// Sign in Successful
				return new User(intval($row['id']),$row['username'],$row['password'],$row['email']); 
			}
			else{
				return false; //password incorrect
			}	
		}
	}

	public static function findUserByName($username){
		$mysqli=User::connect();
		$result= $mysqli->query("SELECT * FROM final_User WHERE username='$username'");
		$row=$result->fetch_array();
		if($result->num_rows==1){
			return new Login(intval($row['id']),$row['email'],$row['username'],$row['password']);
		}
	}

	public static function register($username,$password,$email){
		$mysqli=User::connect();
		
		$num_res1=$mysqli->query("SELECT * FROM final_User WHERE username='".$username."'");
		$num_res2=$mysqli->query("SELECT * FROM final_User WHERE email='".$email."'");

		if($num_res1->num_rows==0 && $num_res2->num_rows==0){
			$result=$mysqli->query("INSERT INTO final_User (username,password,email) values ('".
				 $mysqli->real_escape_string($username) . "','" .
			      md5($mysqli->real_escape_string($password)) . "','" .
			      $mysqli->real_escape_string($email) . "')"
			);
			if($result){
				$id=$mysqli->insert_id;
				return $id;//successfully created
			}else{
				return -4;//error when inserting
			}
		}else if($num_res1->num_rows==0 && $num_res2->num_rows!=0){
			return -1; //duplicate email
		}else if($num_res1->num_rows!=0 && $num_res2->num_rows==0){
			return -2; //duplicate username
		}else{
			return -3; //Both username and email are duplicate
		}	
	}

	public function getID(){
		return $this->id;
	}

	public function getUsername(){
		return $this->username;
	}
	public function getEmail(){
		return $this->email;
	}
	public function getJSON(){
		$json_obj = array('userid' => $this->id,
			      'email' => $this->email,
			      'username' => $this->username,
			      'password' =>$this->password
			      );
	    return json_encode($json_obj);
	}
}
?>