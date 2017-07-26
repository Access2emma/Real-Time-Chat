const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('create-message', ({from, text}) => {
		console.log('Data received from client: ', {from, text});
		io.emit('new-message', {
			from,
			text,
			createdAt: new Date().getTime()
		});
	});

	// socket.emit('new-email', {
	// 	to: 'example@gmail.com',
	// 	msg: 'Just checking on you',
	// 	date: 'Today'
	// });

	// socket.on('send-email', (data) => {
	// 	console.log('Sending new email: ', data);
	// });

	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
});


server.listen(PORT, ()=>{
	console.log(`Server Started on port: ${PORT}`);
})