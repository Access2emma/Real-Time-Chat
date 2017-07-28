class Users{
	constructor(){
		this.userList = [];
	}

	addUser(id, name, room){
		const user = {id, name, room};

		this.userList.push(user);

		return user;
	}

	removeUser(id){
		this.userList = this.userList.filter(user => user.id !== id);
	}

	getUser(id){
		return this.userList.find(user => user.id === id);
	}

	getUserByName(name){
		return this.userList.find(user => user.name === name);
	}

	getUserList(room){
		return this.userList.filter(user => user.room === room)
			.map(user => user.name);
	}

	getAvailableRooms(){
		// return _.uniq(this.userList.map(user => user.room));
		return this.userList.map(user => user.room).filter((x, i, a) => a.indexOf(x) == i);
	}
}


module.exports = {Users}