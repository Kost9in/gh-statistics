module.exports = err => {
	let message = '';
	let status = 500;

	const messageMatches = err.message.match(/({.*})/i);
	if (messageMatches) {
		try {
			message = JSON.parse(messageMatches[1]).message;
		} catch (e) {}
	}

	const statusMatches = err.message.match(/status: (\d*)/i);
	if (statusMatches) {
		status = statusMatches[1];
	}

	return { message, status };
};