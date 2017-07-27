const generateMessage = ({from, text}) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	}
}

const generateLocationMessage = ({longitude, latitude}) => {
	let baseURL = 'https://www.google.com/maps?q=';

	return {
		from: 'Admin',
		text: `${baseURL}${latitude},${longitude}`,
		createdAt: new Date().getTime()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}