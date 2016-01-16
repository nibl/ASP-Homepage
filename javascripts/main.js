$(function() {

	var $mcForm = $('.mc-form');
	if ($mcForm.length) $mcForm.ajaxChimp({
		url: '//movitos.us4.list-manage.com/subscribe/post-json?u=3bc400c69874a5f5dce5bfbe2&amp;id=61abe68bdf',
		callback: function(resp) {
			if (resp.result === 'success') {
				window.location = '/thank-you.html';
			}
		}
	});

});

// If there is a twitter button on page
if ($('.twitter-event').length) {

	// then load twitter library
	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
		t = window.twttr || {};
		if (d.getElementById(id)) return t;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		t._e = [];
		t.ready = function(f) {
			t._e.push(f);
		};

		return t;
	}(document, "script", "twitter-wjs"));

	// and bind twitter events when loaded
	// twttr.ready(function() {
	// 	twttr.events.bind(
	// 		'tweet',
	// 		function (event) { 
	// 			console.log(event);
	// 			var redirect = $(event.target).data('redirect');
	// 			if (redirect) {
	// 				window.location = redirect;
	// 			}
	// 		}
	// 	);
	// });

}

if ($('#contactForm').length) {
	var $form = $('#contactForm');	

	$form.validatr();

	// Mailchimp contac form
	$form.submit(function(e) {
		e.preventDefault();

		if (!$.validatr.validateForm($form)) return;

		var $that = $(this);

		var $name = $that.find('[name=name]'),
			$email = $that.find('[name=email]'),
			$subject = $that.find('[name=subject]'),
			$message = $that.find('[name=message]');

		var $button = $that.find('#msg button');

		$button.addClass('loading').prop('disabled', true);

		$.ajax({
			type: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
				'key': 'o1ycFk7uJPaLiXGX65hN0Q',
				'message': {
					'from_email': $email.val(),
					'from_name': $name.val(),
					'headers': {
						'Reply-To': $email.val()
					},
					'subject': $subject.val(),
					'text': $message.val(),
					'to': [
						{
							'email': 'hellothere@wordit.com',
							'name': 'Wordit',
							'type': 'to'
						}
					]
				}
			}
		})
		.done(function(response) {
			$button.removeClass('loading').prop('disabled', false);
			$name.val('');
			$email.val('');
			$subject.val('');
			$message.val('');

			$('.status-message').addClass('hidden');
			$('.status-message.text-success').removeClass('hidden');
		})
		.fail(function(response) {
			$('.status-message').addClass('hidden');
			$('.status-message.text-danger').removeClass('hidden');
		});
	});
}
