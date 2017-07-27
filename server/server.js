const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

	socket.broadcast.emit('new-message', generateMessage({from: 'Admin', text: 'A new user joined'}));

	socket.emit('new-message', generateMessage({from: 'Admin', text: 'You are welcome'}));

	socket.on('create-message', (message) => {
		console.log('Data received from client: ', message);
		io.emit('new-message', generateMessage(message));
	});

	socket.on('create-location-message', (position) =>{
		io.emit('new-location-message', generateLocationMessage(position));
	})

	socket.on('disconnect', () => {
		console.log('User disconnected');
		io.emit('new-message', generateMessage({from: 'Admin', text: 'A user left'}))
	});
});

server.listen(PORT, ()=>{
	console.log(`Server Started on port: ${PORT}`);
})