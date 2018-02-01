<?php

require_once('orm/User.php');

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
}
else{
    $path_components =null;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
      if(isset($_POST['username'])){
        $username=$_POST['username'];
      }
      if(isset($_POST['password'])){
        $password=$_POST['password']; //md5
      }
      if(isset($_POST['email'])){
        $email=$_POST['email'];
      }

      $response=User::register($username,$password,$email);
      
      if($response >=0){
        header("Content-type: application/json");
        setcookie("username", $username, time()+(1800), '/Courses/comp426-f17/users','wwwp.cs.unc.edu');
        setcookie("userid", $response, time()+(1800), '/Courses/comp426-f17/users','wwwp.cs.unc.edu');
        print(json_encode($response));
        exit();
    }else{
      header("HTTP/1.0 400 Bad Request");
      print(json_encode($response));
      exit();
    }
}
?>