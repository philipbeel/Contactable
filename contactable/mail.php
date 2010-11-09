<?php
	//declare our assets 
	$name = stripcslashes($_POST['name']);
	$emailAddr = stripcslashes($_POST['email']);
	$comment = stripcslashes($_POST['comment']);
	$subject = stripcslashes($_POST['subject']);	
	$contactMessage = "Message: $comment \r \n From: $name \r \n Reply to: $emailAddr";

	//validate the email address on the server side
	if(eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $emailAddr) ) {
		//if successful lets send the message
		mail('/*RECIPIENTS EMAIL ADDRESS HERE*/', $subject, $contactMessage);
		echo('success'); //return success callback
	} else {
		echo('An invalid email address was entered'); //email was not valid
	}
?>
