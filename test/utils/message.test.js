const expect = require('expect');

const {generateMessage} = require('../../server/utils/message');

describe('Messaging Utilities', () => {
	it('should return input information with current timestamp', ()=>{

		const message = {from: 'me', text: 'Okay'};

		const result = generateMessage(message);

		console.log(result);

		expect(result.createdAt).toExist();
		expect(result).toInclude(message);
		expect(result.createdAt).toBeA('number');
	})
})