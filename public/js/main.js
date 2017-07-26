(function($){

	let socket = io();

	let form = $('#message_form'),
		messageInput = $('#message'),
		messages = $('#messages');


	socket.on('connect', function(){
		console.log('Connected to the server!');
	});

	socket.on('new-message', function(data){
		$('<li></li>', {text: `${data.from}: ${data.text}`})
			.appendTo(messages);
	});

	socket.on('disconnect', function(data){
		console.log('Disconnected from server: ', data);
	});

	form.on('submit', function(e){
		e.preventDefault();

		socket.emit('create-message', {from: 'User', text: messageInput.val()});

		// reset input
		messageInput.val('');

	});

})(jQuery);



