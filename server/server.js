const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

	socket.on('join', ({name, room}, callback) => {
		if(!isRealString(name) || !isRealString(room)){
			return callback('Name and Room are required');
		}

		// join a private room
		socket.join(room);

		// add the current joined user to users list
		users.addUser(socket.id, name, room);

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

		// update the users list on the clients inside this private room
		io.to(room).emit('update-user-list', users.getUserList(room));

		callback();
	});

	socket.on('create-message', (message) => {
		io.emit('new-message', generateMessage(message));
	});

	socket.on('create-location-message', (position) =>{
		io.emit('new-location-message', generateLocationMessage(position));
	});

	socket.on('disconnect', () => {
		const user = users.getUser(socket.id);

		if(user){
			// remove the user
			users.removeUser(user.id);

			// update the users list on the clients inside this private room
			io.to(user.room).emit('update-user-list', users.getUserList(user.room));

			io.emit('new-message', generateMessage({from: 'Admin', text: `${user.name} has left`}))
		}
	});
});

server.listen(PORT, ()=>{
	console.log(`Server Started on port: ${PORT}`);
})