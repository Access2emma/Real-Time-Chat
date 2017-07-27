(function($){

	let socket = io();

	let form = $('#message_form'),
		messageInput = $('#message'),
		messages = $('#messages'),
		locationButton = $('#locationButton');


	socket.on('connect', function(){
		console.log('Connected to the server!');
	});


	// Server event handles

	socket.on('new-message', function(data){
		$('<li></li>', {text: `${data.from}: ${data.text}`})
			.appendTo(messages);
	});

	socket.on('new-location-message', function(data){
		let li = $('<li></li>');
		li.text(data.from + ': ');
		let a = $('<a target="_blank">My Current Location</a>');
		a.attr('href', data.text);
		li.append(a);
		messages.append(li);
	});

	socket.on('disconnect', function(data){
		console.log('Disconnected from server: ', data);
	});


	// Client notification to server

	form.on('submit', function(e){
		e.preventDefault();

		socket.emit('create-message', {from: 'User', text: messageInput.val()});

		// reset input
		messageInput.val('');
	});

	locationButton.on('click', function(){
		if(!navigator.geolocation){
			return alert('Your device does not support this feature!');
		}

		navigator.geolocation.getCurrentPosition(function(position){
			const info = {latitude: position.coords.latitude, longitude: position.coords.longitude}
			socket.emit('create-location-message', info);

		}, function(){
			alert('Unable to fetch your location!');
		});
	});

})(jQuery);



