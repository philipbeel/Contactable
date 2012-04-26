/*
 * contactable 1.4 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.js 2012-04-11 $
 *
 */
 
(function($){

	// Define the new for the plugin ans how to call it	
	$.fn.contactable = function(options) {
		// Set default options  
		var defaults = {
			url: 'http://yourWebsiteRootDirectory.com/mail.php',
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
			hideOnSubmit: false
		};

		var options = $.extend(defaults, options);
		  
		return this.each(function() {
			
			// Create the form and inject it into the DOM
			var this_id_prefix = '#'+this.id+' '
			,	dropdown = ''
			,	dropdownLen = options.dropdownOptions.length
			,	i;

			// Add select option if applicable
			if(options.dropdownTitle) {
				dropdown += '<p><label for="issue">'+options.dropdownTitle+' </label><br /><select name="dropdown" id="dropdown" class="dropdown">';

				for(i=0; i < dropdownLen; i++) {
					dropdown += '<option value="'+options.dropdownOptions[i]+'">'+options.dropdownOptions[i]+'</option>';
				}			
				
				dropdown += '</select></p>';
			}

			$(this).html('<div id="contactable_inner"></div><form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder"><p><label for="name">'+options.name+'<span class="red"> * </span></label><br /><input id="name" class="contact validate" name="name"/></p><p><label for="email">'+options.email+' <span class="red"> * </span></label><br /><input id="email" class="contact validate" name="email" /></p>'+dropdown+'<p><label for="message">'+options.message+' <span class="red"> * </span></label><br /><textarea id="message" name="message" class="message validate" rows="4" cols="30" ></textarea></p><p><input class="submit" type="submit" value="'+options.submit+'"/></p><p class="disclaimer">'+options.disclaimer+'</p></div></form>');
			
			// Toggle the form
			$(this_id_prefix+'div#contactable_inner').toggle(function() {
				$(this_id_prefix+'#overlay').css({display: 'block'});
				$(this).animate({"marginLeft": "-=5px"}, "2000"); 
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "-=0px"}, "2000");
				$(this).animate({"marginLeft": "+=387px"}, "4000"); 
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "+=390px"}, "4000"); 
			}, 
			function() {
				$(this_id_prefix+'#contactForm').animate({"marginLeft": "-=390px"}, "4000");
				$(this).animate({"marginLeft": "-=387px"}, "4000").animate({"marginLeft": "+=5px"}, "2000"); 
				$(this_id_prefix+'#overlay').css({display: 'none'});
			});
			
			// Submit the form
			$(this_id_prefix+"#contactForm").submit(function() {
				// Validate the entries
				var valid = false
				,	params;

				// Loop through required field
				$(this_id_prefix+"#contactForm .validate").each(function() {
					
					if($(this).val() === '') {
						console.warn("field:::::::", $(this).val() );
					}

				});


				// Check if a value was entered

				// Check if correct email was entered

				// Set the valid result

				// if(valid === true) {
				// 	submitForm();
				// } else {
				// 	showErrors(params)
				// }
				return false;
			});

			function showErrors(params) {
				return false;
			}
				

			function submitForm() {
				$(this_id_prefix+'.holder').hide();
				$(this_id_prefix+'#loading').show();
				
				//Trigger form submission if form is valid
				$.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:$(this_id_prefix+'#name').val(), 
						email:$(this_id_prefix+'#email').val(), 
						issue:$(this_id_prefix+'#dropdown').val(), 
						message:$(this_id_prefix+'#message').val()
					},
					success: function(data) {
						
						// Hide the loading animation
						$(this_id_prefix+'#loading').css({display:'none'}); 
						
						if( data === 'success') {
							$(this_id_prefix+'#callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								$(this_id_prefix+'#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								$(this_id_prefix+'div#contactable_inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								$(this_id_prefix+'#overlay').css({display: 'none'});	
							}
						} else {
							$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								$(this_id_prefix+'.holder').show();
								$(this_id_prefix+'#callback').hide().html('');
							},2000);
						}
					},
					error:function(){
						$(this_id_prefix+'#loading').css({display:'none'}); 
						$(this_id_prefix+'#callback').show().append(options.notRecievedMsg);
					}
				});		
			}
		});
	};
 
})(jQuery);