(function($){

	let socket = io();

	let form = $('#message_form'),
		messageInput = $('#message'),
		messages = $('#messages'),
		usersBox = $('#users')
		locationButton = $('#locationButton');

	


	function scrollToBottom(){
	let scrollHeight = messages.prop('scrollHeight'),
		scrollTop = messages.prop('scrollTop'),
		clientHeight = messages.prop('clientHeight'),
		newMessage = messages.find('li:last-child'),
		newMessageHeight = messages.find('li:last-child').innerHeight(),
		lastMessageHeight = newMessage.prev().innerHeight();

		if(scrollHeight === clientHeight)
			return;

		if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
			messages.scrollTop(scrollHeight);
		}
	}


	socket.on('connect', function(){
		const deparam = $.deparam(window.location.search);

		socket.emit('join', deparam, function(error){
			if(error){
				alert(error);
				window.location.href = '/';
			}else{
				console.log('No Error!');
			}	
		});
	});


	// Server event handles

	socket.on('new-message', function(data){
		const formattedDate = moment(data.createdAt).format('h:mm A');

		data.createdAt = formattedDate;

		let chatTemplate = $('#chat_template').html();

		const html = Mustache.render(chatTemplate, data);

		messages.append(html);

		scrollToBottom();
	});

	socket.on('new-location-message', function(data){
		const formattedDate = moment(data.createdAt).format('h:mm A');

		data.createdAt = formattedDate;

		let template = $('#location_chat_template').html();

		const html = Mustache.render(template, data);

		messages.append(html);

		scrollToBottom();
		
	});

	socket.on('update-user-list', function(usersList){
		let ol = $('<ol></ol>');

		usersList.forEach(user => {
			$('<li></li>', {text: user}).appendTo(ol)
		});
		
		usersBox.html(ol);
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



