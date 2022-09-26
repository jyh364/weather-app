/** @format */

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/getWeather');

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirPath = path.join(__dirname, '../public');

// Start web server
const app = express();

// Setup handlebars engine and views location. Set allows you to set a value for a given setting
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', { title: 'WEATHER APP', name: 'Jerry' });
});
app.get('/about', (req, res) => {
	res.render('about', { title: 'ABOUT PAGE', name: 'Jerry' });
});
app.get('/help', (req, res) => {
	res.render('help', { title: 'HELP PAGE', name: 'Jerry' });
});
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please search an addy',
		});
	}
	forecast(req.query.address, (err, resp) => {
		if (err) {
			return res.send('Invalid Address');
		}
		res.send({ forecast: resp });
	});
});
app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Please send search term',
		});
	}
	res.send({
		products: [],
	});
});
app.get('/help/*', (req, res) => {
	res.render('404');
});
app.get('*', (req, res) => {
	res.render('404');
});

// Starts up server and listen to the designated port
app.listen(3000, () => {
	console.log('Server is Up on port 3000.');
});
