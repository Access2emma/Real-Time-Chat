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
		const formattedDate = moment(data.createdAt).format('h:mm A');

		data.createdAt = formattedDate;

		let chatTemplate = $('#chat_template').html();

		const html = Mustache.render(chatTemplate, data);

		messages.append(html);
	});

	socket.on('new-location-message', function(data){
		const formattedDate = moment(data.createdAt).format('h:mm A');

		data.createdAt = formattedDate;

		let template = $('#location_chat_template').html();

		const html = Mustache.render(template, data);

		messages.append(html);
		
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

		locationButton.attr('disabled', 'disabled').text('Checking Location...');

		navigator.geolocation.getCurrentPosition(function(position){
			const info = {latitude: position.coords.latitude, longitude: position.coords.longitude}
			socket.emit('create-location-message', info);
			locationButton.removeAttr('disabled').text('Send Location');

		}, function(){
			alert('Unable to fetch your location!');
			locationButton.removeAttr('disabled').text('Send Location');
		});
	});

})(jQuery);



