Contactable jQuery plugin.
========================================================

GitHub  : https://github.com/philipbeel/Contactable<br/>
Demo    : http://plugins.theodin.co.uk/jquery/contactable.1.5/<br/>
Website : http://theodin.co.uk<br/>
Email   : contact@theodin.co.uk<br/>
Twitter : @philipbeel<br/>

### Descrpition
Contactable is a jQuery plugin that enables users to incorporate a feature rich contact form into any website running PHP and Apache.

### Usage
Call in the jQuery framework and jquery.contactable.js in your webpage

	<script type="text/javascript" src="jquery.contactable.js"></script>

Create an element in your HTML that you want the contact form to be generated into.

	<div id="contactable"></div>

Initiate the contactable plugin when the page loads

	$('#contactable').contactable({
  		subject: 'A Feeback Message'
 	});

### IMPORTANT
Open the **mail.php** file and look for **CHANGE@YOURADDRESS.COM** and replace with the email address you wish to receive contact messages to.

### Plugin parameters
You can extend the contactables configuration with some of the following configuration

>subject: {String}			 // Email subject heading<br/>
>url: {String}	 			 // URL path of mail.php file **must be absolute**<br/>
>name: {String} 		 	 // Name label<br/>
>email: {String} 			 // Email label<br/>
>dropdownTitle: {String}	 // Dropdown label, if empty no dropdown is displayed<br/>
>dropdownOptions: {Array}    // Select options for dropdown<br/>
>message: {String}			 // Message label<br/>
>submit: {String}	 		 // Label text for the submit button<br/>
>recievedMsg: {String} 	 	 // Message successfully wording<br/>
>notRecievedMsg: {String}    // Message failed wording<br/>
>disclaimer: {String} 		 // Text to display at the bottom of the form<br/>
>hideOnSubmit: {Boolean} 	 // hide the form after submitting it<br/>



