<?php
	//declare our assets 
	$name = stripcslashes($_POST['name']);
	$emailAddr = stripcslashes($_POST['email']);
	$issue = stripcslashes($_POST['issue']);
	$comment = stripcslashes($_POST['message']);
	$subject = stripcslashes($_POST['subject']);	
	$contactMessage =  
"Message:
$comment 

Name: $name
E-mail: $emailAddr
Issue: $issue

Sending IP:$_SERVER[REMOTE_ADDR]
Sending Script: $_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]
";
		// If successful lets send the message
		mail('yourEmailAddress@gmail.com', $subject, $contactMessage);
		// Return success callback
		echo('success');
?>