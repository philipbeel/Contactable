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

	// Format message
	$contactMessage =
	"<div>
	<p><strong>Name:</strong> $name <br />
	<strong>E-mail:</strong> $emailAddr <br />
	<strong>Issue:</strong> $issue </p>

	<p><strong>Message:</strong> $comment </p>

	<p><strong>Sending IP:</strong> $_SERVER[REMOTE_ADDR]<br />
	<strong>Sent via:</strong> $_SERVER[HTTP_HOST]</p>
	</div>";

	// Send and check the message status
	$response = (mail('CHANGE@YOURADDRESS.COM', $subject, $contactMessage, $headers) ) ? "success" : "failure" ;
	$output = json_encode(array("response" => $response));

	header('content-type: application/json; charset=utf-8');
	echo($output);

?>