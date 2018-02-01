<?php  
if ($_SERVER['REQUEST_METHOD'] == "GET") {
	unset($_COOKIE['username']);
    setcookie("username", null, -1 , '/Courses/comp426-f17/users','wwwp.cs.unc.edu');
    return true;
}

?>