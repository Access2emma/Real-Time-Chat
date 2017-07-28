const expect = require('expect');

const {Users} = require('../../server/utils/users');

let users;

beforeEach(()=>{
	users = new Users();

	users.userList = [{
		id: 123,
		name: 'Emmanuel',
		room: 'A'
	},
	{
		id: 1234,
		name: 'Adeniyi',
		room: 'B'
	},
	{
		id: 12345,
		name: 'Samson',
		room: 'A'
	}]
})


describe('Users Utility', () => {
	it('should add user to the user list', () => {
		const user = {id: '12345', name: 'Emmanuel', room: 'Room2'};

		userObject = new Users();

		const result = userObject.addUser(user.id, user.name, user.room);

		expect(result).toEqual(user);
		expect(userObject.userList).toEqual([user]);
	});

	it('should return names of user in a specified room', ()=>{
		const room = 'A';

		const userList = users.getUserList(room);

		expect(userList.length).toBe(2);
		expect(userList).toInclude('Emmanuel');
		expect(userList).toInclude('Samson')

		const room2 = 'B';

		const userList2 = users.getUserList(room2);

		expect(userList2.length).toBe(1);
		expect(userList2).toInclude('Adeniyi');
	});

	it('should remove a user', () => {
		const id = 1234;

		expect(users.userList.length).toBe(3);

		users.removeUser(id);

		expect(users.userList.length).toBe(2);
	});

	it('should not remove user', () => {
		const id = 123456;

		expect(users.userList.length).toBe(3);

		users.removeUser(id);

		expect(users.userList.length).toBe(3);

	});

	it('should find the specified user', () => {
		const id = 1234;

		user = users.getUser(id);

		expect(user).toExist();
		expect(user.name).toEqual('Adeniyi');
		expect(user.room).toBe('B');
	});

	it('should not find invalid user', () => {
		const id = 123456788;

		user = users.getUser(id);

		expect(user).toNotExist();
	});
});