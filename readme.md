# Contactable jQuery plugin.


Website : [http://theodin.co.uk](https://theodin.co.uk)  
Twitter : [@philipbeel](https://twitter.com/philipbeel)

### Descrpition
Contactable is a jQuery plugin that enables users to incorporate a feature rich contact form into any website running PHP or Java.

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

For Java web applications configure JNDI resource for javax.mail.Session for your servlet container (example for Tomcat included), customize **Mail.java**, , and change **CHANGE@YOURADDRESS.COM**.

### Plugin parameters
You can extend the contactables configuration with some of the following configuration

```
{
  subject: {String}           // Email subject heading
  header: {String}            // Text to display at the top of the form
  url: {String}               // URL path of mail.php file **must be absolute**
  name: {String}              // Name label
  email: {String}             // Email label
  dropdownTitle: {String}     // Dropdown label, if empty no dropdown is displayed
  dropdownOptions: {Array}    // Select options for dropdown
  message: {String}           // Message label
  submit: {String}            // Label text for the submit button
  recievedMsg: {String}       // Message successfully wording
  notRecievedMsg: {String}    // Message failed wording
  footer: {String}            // Text to display at the bottom of the form
  hideOnSubmit: {Boolean}     // hide the form after submitting it
}
```


