<?php

require_once('orm/User.php');

if (isset( $_SERVER['PATH_INFO'])) {
    $path_components = explode('/', $_SERVER['PATH_INFO']);
}
else{
    $path_components =null;
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if(isset($_GET['action'])){
    if ($_GET['action']=='signin') {
      $username=$_GET['username'];
      $password=$_GET['password'];

      $user=User::checkUser($username,$password);

      if ($user===null) {
        header("HTTP/1.0 404 NOT FOUND");
        print("Username not found!");
        exit();
      }else if ($user===false){
        header("HTTP/1.0 400 Bad Request");
        print("Password Incorrect!");
        exit();
      }else{
          //Login Successful
          header("Content-type: application/json");
          setcookie("username", $user->getUsername(),time()+(3600), '/Courses/comp426-f17/users','wwwp.cs.unc.edu');
          setcookie("userid", $user->getID(),time()+(3600), '/Courses/comp426-f17/users','wwwp.cs.unc.edu');
          print($user->getJSON());
          exit();
      }
    }    
  }
}
?>