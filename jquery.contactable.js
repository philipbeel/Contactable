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
			var this_id_prefix = '#'+this.id+' '
			,	dropdown = ''
			,	filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			,	dropdownLen = options.dropdownOptions.length
			,	i;

			// Add select option if applicable
			if(options.dropdownTitle) {
				dropdown += '<p><label for="dropdown">'+options.dropdownTitle+' </label><br /><select name="dropdown" id="dropdown" class="dropdown">';

				for(i=0; i < dropdownLen; i++) {
					dropdown += '<option value="'+options.dropdownOptions[i]+'">'+options.dropdownOptions[i]+'</option>';
				}			
				
				dropdown += '</select></p>';
			}
			// Form layout
			/*	
			*	<div id="contactable_inner"></div>
			*	<form id="contactForm" method="" action="">
			*  		<div id="loading"></div>
			*		<div id="callback"></div>
			* 		<div class="holder">
			* 			<p>
			*				<label for="name">Name<span class="green"> * </span></label><br />
			*				<input id="name" class="contact validate" name="name" />
			*			</p>
			*			<p>
			*				<label for="email"> Email address <span class="green"> * </span></label><br />
			* 				<input id="email" class="contact validate" name="email" />
			*			</p>
			* 			<p>
			*				<label for="message"> Message <span class="green"> * </span></label><br />
			* 				<textarea id="message" name="message" class="message validate" rows="4" cols="30" ></textarea>
			*			</p>
			*			<p>
			*				<input class="submit" type="submit" value="Submit"/>
			*			</p>
			*			<p class="disclaimer">Disclaimer</p>
			*		</div>
			*	</form>
			*/

			jQuery(this).html('<div id="contactable_inner"></div><form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder"><p><label for="name">'+options.name+'<span class="green"> * </span></label><br /><input id="name" class="contact validate" name="name" /></p><p><label for="email">'+options.email+' <span class="green"> * </span></label><br /><input id="email" class="contact validate" name="email" /></p>'+dropdown+'<p><label for="message">'+options.message+' <span class="green"> * </span></label><br /><textarea id="message" name="message" class="message validate" rows="4" cols="30" ></textarea></p><p><input class="submit" type="submit" value="'+options.submit+'"/></p><p class="disclaimer">'+options.disclaimer+'</p></div></form>');
			
			// Toggle the form visibility
			jQuery(this_id_prefix+'div#contactable_inner').toggle(function() {
				jQuery(this_id_prefix+'#overlay').css({display: 'block'});
				jQuery(this).animate({"marginLeft": "-=5px"}, "2000"); 
				jQuery(this_id_prefix+'#contactForm').animate({"marginLeft": "-=0px"}, "2000");
				jQuery(this).animate({"marginLeft": "+=387px"}, "4000"); 
				jQuery(this_id_prefix+'#contactForm').animate({"marginLeft": "+=390px"}, "4000"); 
			}, 
			function() {
				jQuery(this_id_prefix+'#contactForm').animate({"marginLeft": "-=390px"}, "4000");
				jQuery(this).animate({"marginLeft": "-=387px"}, "4000").animate({"marginLeft": "+=5px"}, "2000"); 
				jQuery(this_id_prefix+'#overlay').css({display: 'none'});
			});
			
			// Submit the form
			jQuery(this_id_prefix+"#contactForm").submit(function() {
				
				// Validate the entries
				var valid = true
				,	params;

				//Remove any previous errors
				jQuery(this_id_prefix+"#contactForm .validate").each(function() {
					jQuery(this).removeClass('invalid');
				});

				// Loop through requigreen field
				jQuery(this_id_prefix+"#contactForm .validate").each(function() {
					
					// Check the min length
					if(jQuery(this).val().length < 2) {
						jQuery(this).addClass("invalid");
						valid = false;
					}

					//Check email is valid
					if (!filter.test(jQuery(this_id_prefix+"#contactForm #email").val())) {
						jQuery(this_id_prefix+"#contactForm #email").addClass("invalid");
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
				jQuery(this_id_prefix+'.holder').hide();
				jQuery(this_id_prefix+'#loading').show();
				
				// Trigger form submission if form is valid
				jQuery.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:jQuery(this_id_prefix+'#name').val(), 
						email:jQuery(this_id_prefix+'#email').val(), 
						issue:jQuery(this_id_prefix+'#dropdown').val(), 
						message:jQuery(this_id_prefix+'#message').val()
					},
					success: function(data) {
						// Hide loading animation
						jQuery(this_id_prefix+'#loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								jQuery(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								jQuery(this_id_prefix+'div#contactable_inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								jQuery(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							jQuery(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery(this_id_prefix+'.holder').show();
								jQuery(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
					error:function(e){
						jQuery(this_id_prefix+'#loading').css({display:'none'}); 
						jQuery(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
					}
				});		
			}
		});
	};
 
})(jQuery);