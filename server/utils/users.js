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

	getUserList(room){
		return this.userList.filter(user => user.room === room)
			.map(user => user.name);
	}
}


module.exports = {Users}