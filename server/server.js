const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

	socket.on('join', ({name, room}, callback) => {
		if(!isRealString(name) || !isRealString(room)){
			return callback('Name and Room are required');
		}

		// join a private room
		socket.join(room);

		/**
		*	Some function available on socket
		*
		socket.leave(room) // leave the room and stop getting message from the private group
		io.to(room).emit() // emit message only every user on the private room
		socket.broadcast.to(room).emit() // send message to all user in the room except the current user

		Other remain the same
		socket.emit() // send message to the current user
		io.emit() // send message to every user using the socket
		socket.broadcast.emit() // send message to everyone except this current socket user

		*/

		// Welcome only the new user
		socket.emit('new-message', generateMessage({from: 'Admin', text: 'You are welcome'}));

		// broadcast message to every user in the private group except the new user
		socket.broadcast.to(room).emit('new-message', generateMessage({from: 'Admin', text: `${name} has joined`}));

		callback();
	});

	socket.on('create-message', (message) => {
		io.emit('new-message', generateMessage(message));
	});

	socket.on('create-location-message', (position) =>{
		io.emit('new-location-message', generateLocationMessage(position));
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
		io.emit('new-message', generateMessage({from: 'Admin', text: 'A user left'}))
	});
});

server.listen(PORT, ()=>{
	console.log(`Server Started on port: ${PORT}`);
})