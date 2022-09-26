/** @format */

const request = require('postman-request');

const forecast = (location, cb) => {
	const url = `http://api.weatherstack.com/current?access_key=2898496b5cbd783befd18f5b685fdf54&query=${location}&units=f`;

	request({ url, json: true }, (err, res) => {
		if (err) {
			cb(err, undefined);
		} else {
			cb(undefined, res.body);
		}
	});
};

module.exports = forecast;
