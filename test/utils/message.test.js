const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('../../server/utils/message');

describe('Messaging Utilities', () => {
	it('should return input information with current timestamp', ()=>{

		const message = {from: 'me', text: 'Okay'};

		const result = generateMessage(message);

		expect(result.createdAt).toExist();
		expect(result).toInclude(message);
		expect(result.createdAt).toBeA('number');
	});

	it('should return location link and timestamp', ()=>{

		const finalURL = 'https://www.google.com/maps?q=342,403';
		const location = {
			latitude: 342,
			longitude: 403,
		};

		const result = generateLocationMessage(location);

		expect(result.createdAt).toExist();
		expect(result.url).toBeA('string');
		expect(result.createdAt).toBeA('number');
		expect(result.url).toBe(finalURL);
	});

});