/*
 * contactable 1.5 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.min.js 2012-05-26 $
 *
 */
 
(function(jQuery){

	// Define the new for the plugin ans how to call it	
	jQuery.fn.contactable = function(options) {
		// Set default options  
		var defaults = {
			url: 'mail.php',
			name: 'Name',
			email: 'Email',
			dropdownTitle: '',
			dropdownOptions: ['General', 'Website bug', 'Feature request'],
			message : 'Message',
			subject : 'A contactable message',
			submit : 'SEND',
			recievedMsg : 'Thank you for your message',
			notRecievedMsg : 'Sorry but your message could not be sent, try again later',
			disclaimer: 'Please feel free to get in touch, we value your feedback',
			hideOnSubmit: true
		};

		var options = jQuery.extend(defaults, options);
		
		return this.each(function() {

			// Create the form and inject it into the DOM
			var dropdown = ''
			,	filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			,	dropdownLen = options.dropdownOptions.length
			,	i;

			// Add select option if applicable
			if(options.dropdownTitle) {
				dropdown += '<p><label for="contactable-dropdown">'+options.dropdownTitle+' </label><br /><select name="dropdown" id="contactable-dropdown" class="contactable-dropdown">';

				for(i=0; i < dropdownLen; i++) {
					dropdown += '<option value="'+options.dropdownOptions[i]+'">'+options.dropdownOptions[i]+'</option>';
				}			
				
				dropdown += '</select></p>';
			}
			// Form layout
			/*	
			*	<div id="contactable-inner"></div>
			*	<form id="contactable-contactForm" method="" action="">
			*  		<div id="contactable-loading"></div>
			*		<div id="contactable-callback"></div>
			* 		<div class="contactable-holder">
			* 			<p>
			*				<label for="contactable-name">Name<span class="contactable-green"> * </span></label><br />
			*				<input id="contactable-name" class="contactable-contact contactable-validate" name="name" />
			*			</p>
			*			<p>
			*				<label for="contactable-email"> Email address <span class="contactable-green"> * </span></label><br />
			* 				<input id="contactable-email" class="contactable-contact contactable-validate" name="email" />
			*			</p>
			* 			<p>
			*				<label for="contactable-message"> Message <span class="contactable-green"> * </span></label><br />
			* 				<textarea id="contactable-message" name="message" class="contactable-message contactable-validate" rows="4" cols="30" ></textarea>
			*			</p>
			*			<p>
			*				<input class="contactable-submit" type="submit" value="Submit"/>
			*			</p>
			*			<p class="contactable-disclaimer">Disclaimer</p>
			*		</div>
			*	</form>
			*/

			jQuery(this).html('<div id="contactable-inner"></div><form id="contactable-contactForm" method="" action=""><div id="contactable-loading"></div><div id="contactable-callback"></div><div class="contactable-holder"><p><label for="contactable-name">'+options.name+'<span class="contactable-green"> * </span></label><br /><input id="contactable-name" class="contactable-contact contactable-validate" name="name" /></p><p><label for="contactable-email">'+options.email+' <span class="contactable-green"> * </span></label><br /><input id="contactable-email" class="contactable-contact contactable-validate" name="email" /></p>'+dropdown+'<p><label for="contactable-message">'+options.message+' <span class="contactable-green"> * </span></label><br /><textarea id="contactable-message" name="message" class="contactable-message contactable-validate" rows="4" cols="30" ></textarea></p><p><input class="contactable-submit" type="submit" value="'+options.submit+'"/></p><p class="contactable-disclaimer">'+options.disclaimer+'</p></div></form>');
			
			// Toggle the form visibility
			jQuery('#contactable-inner').toggle(function() {
				jQuery('#contactable-overlay').css({display: 'block'});
				jQuery(this).animate({"marginLeft": "-=5px"}, "2000"); 
				jQuery('#contactable-contactForm').animate({"marginLeft": "-=0px"}, "2000");
				jQuery(this).animate({"marginLeft": "+=387px"}, "4000"); 
				jQuery('#contactable-contactForm').animate({"marginLeft": "+=390px"}, "4000"); 
			}, 
			function() {
				jQuery('#contactable-contactForm').animate({"marginLeft": "-=390px"}, "4000");
				jQuery(this).animate({"marginLeft": "-=387px"}, "4000").animate({"marginLeft": "+=5px"}, "2000"); 
				jQuery('#contactable-overlay').css({display: 'none'});
			});
			
			// Submit the form
			jQuery("#contactable-contactForm").submit(function() {
				
				// Validate the entries
				var valid = true
				,	params;

				//Remove any previous errors
				jQuery("#contactable-contactForm .contactable-validate").each(function() {
					jQuery(this).removeClass('contactable-invalid');
				});

				// Loop through required field
				jQuery("#contactable-contactForm .contactable-validate").each(function() {
					
					// Check the min length
					if(jQuery(this).val().length < 2) {
						jQuery(this).addClass("contactable-invalid");
						valid = false;
					}

					//Check email is valid
					if (!filter.test(jQuery("#contactable-contactForm #contactable-email").val())) {
						jQuery("#contactable-contactForm #contactable-email").addClass("contactable-invalid");
						valid = false;
					}						
				});

				if(valid === true) {
					submitForm();
				}
				return false;
			});

			function submitForm() {
				// Display loading animation
				jQuery('.contactable-holder').hide();
				jQuery('#contactable-loading').show();
				
				// Trigger form submission if form is valid
				jQuery.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:jQuery('#contactable-name').val(), 
						email:jQuery('#contactable-email').val(), 
						issue:jQuery('#contactable-dropdown').val(), 
						message:jQuery('#contactable-message').val()
					},
					success: function(data) {
						// Hide loading animation
						jQuery('#contactable-loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery('#contactable-callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								jQuery('#contactable-contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								jQuery('#contactable-inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								jQuery('#contactable-overlay').css({display: 'none'});	
							}
						} else {
							jQuery('#contactable-callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery('.contactable-holder').show();
								jQuery('#contactable-callback').hide().html('');
							},2000);
						}
					},
					error:function(e){
						jQuery('#contactable-loading').css({display:'none'}); 
						jQuery('#contactable-callback').show().append(options.notRecievedMsg);
					}
				});		
			}
		});
	};
 
})(jQuery);
