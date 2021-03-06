const path = require('path');
const express = require('express');
const config = require(path.resolve('server/config'));

const app = express();
const PORT = process.env.PORT || config.port;

if (process.env.NODE_ENV === 'dev') {
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
		next();
	});
}

app.use(express.static('server/static'));
app.use(require('./routes'));

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({ message: err.message });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});