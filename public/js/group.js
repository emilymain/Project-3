$(function() {
	console.log('Page loaded!');
	var socket = io();
	// $('form').submit(function() {
	// 	socket.emit('chat message', $('#name').val() + ': ' + $('#m').val());
	// 	$('#m').val('');
	// 	return false;
	// });
	// socket.on('chat message', function(msg) {
	// 	$('#messages').append($('<li>').text(msg));
	// });

	// Grab all the needed DOM elements using jQuery
	$name = $('#name');
	$m = $('#m');
	$form = $('#form');
	$messages = $('#messages')

	// Grab all todos from our db
  $.ajax({
    type: "GET",
    url: "/api/group"
  }).then(
    function(jsonMessages) {
      // Iterate through our array of json messages
			// if(!jsonMessages == {) {
				jsonMessages.forEach(function(jsonMessage) {
					// Create an html element for the single message
					$messages.append($('<li>').text(`${jsonMessage.username}: ${jsonMessage.message}`));
				});
			// }
    }
  );

		// Attach listener on form button to perform AJAX post of new message.
	$form.on('submit', function(evt) {
		// Stop the default behavior from clicking on the submit button.
		evt.preventDefault();
		var Message = {
			username: $name.val(),
			message: $m.val()
		}

		// Use AJAX to add the new todo to our db
		$.ajax({
			method: "POST",
			url: "/api/group",
			data: Message
		}).then(
			function(jsonMessage) {
				console.log("Success: ", jsonMessage);

				// Clear the form
				$m.val("");

				return jsonMessage;
			},
			function(err) {
				console.log("Failed: ", err);
			}
		)
		.then(
			function(jsonMessage) {
				$('#messages').append($('<li>').text(`${jsonMessage.username}: ${jsonMessage.message}`));
			}
		);
	});

// end of document.ready function
});
