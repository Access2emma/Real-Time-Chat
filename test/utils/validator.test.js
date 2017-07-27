const expect = require('expect');

const {isRealString} = require('../../server/utils/Validation');

describe('Validation Utilities', () => {
	
	it('should validate real string', ()=>{
		expect(isRealString('hello, how are u doing')).toBe(true);

		expect(isRealString('    hello, how are u doing    ')).toBe(true);

		expect(isRealString('hello,     how are      u doing')).toBe(true);

		expect(isRealString('')).toBe(false);

		expect(isRealString('          ')).toBe(false);
	});

	it('should reject non-string value', ()=>{
		expect(isRealString(5788)).toBe(false);

		expect(isRealString(true)).toBe(false);

	});

	it('should reject with only space', () => {
		expect(isRealString('          ')).toBe(false);
	});

});