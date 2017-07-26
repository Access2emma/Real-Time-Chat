let socket = io();

socket.on('connect', ()=>{
	console.log('Connected to the server!');

	// socket.emit('create-message', {
	// 	from: "Access2emma",
	// 	text: "Hello all"
	// });

	// socket.emit('send-email', {
	// 	to: 'newemail@example.com',
	// 	title: 'Topic',
	// 	body: 'Body of the message'
	// })
});

socket.on('info', function(info){
	console.log(info.msg);
})

socket.on('new-message', function(data){
	console.log('Incoming message: ', data);
});

// socket.on('new-email', function(data){
// 	console.log('Received a new email from the server: ', data);
// });

socket.on('disconnect', (data)=>{
	console.log('Disconnected from server: ', data);
});