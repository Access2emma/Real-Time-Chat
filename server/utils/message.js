const moment = require('moment');

const generateMessage = ({from, text}) => {
	return {
		from,
		text,
		createdAt: moment().valueOf()
	}
}

const generateLocationMessage = ({from, longitude, latitude}) => {
	let baseURL = 'https://www.google.com/maps?q=';

	return {
		from,
		url: `${baseURL}${latitude},${longitude}`,
		createdAt: new Date().getTime()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}