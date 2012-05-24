<?php
	// Assign contact info
	$name = stripcslashes($_POST['name']);
	$emailAddr = stripcslashes($_POST['email']);
	$issue = stripcslashes($_POST['issue']);
	$comment = stripcslashes($_POST['message']);
	$subject = stripcslashes($_POST['subject']);	
	
	// Set headers
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Create message
	$contactMessage =  
	"Message:
	$comment 

	Name: $name
	E-mail: $emailAddr
	Issue: $issue

	Sending IP:$_SERVER[REMOTE_ADDR]
	Sending Script: $_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]";

	// Send and check the message status
	if(mail('philipbeel@googlemail.com', $subject, $contactMessage, $headers) ) {
		echo(" { 'response' : 'success' } ");	
	} else {
		echo(" { 'response' : 'failure' } ");	
	}
	



?>