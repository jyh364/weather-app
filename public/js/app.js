/** @format */

console.log('Client side javascript');

// js representation of an html element
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#messageOne');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	fetch(`http://localhost:3000/weather?address=${location}`).then(
		(response) => {
			response.json().then((data) => {
				console.log(data);
				p1.textContent = data.forecast.current.temperature;
			});
		}
	);
});
