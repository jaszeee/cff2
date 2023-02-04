"use strict";
const panneauGeneral = document.querySelector("#board");
const villeDepart = document.querySelector("h1");

const panneauStation = (city, limit) => {
	fetch(
		`https://transport.opendata.ch/v1/stationboard?station=${city}&limit=${limit}`
	)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			data.stationboard.forEach((train) => {
				rendreStations(train);
				villeDepart.innerHTML = data.station.name;
			});
		});
};

panneauStation("Lausanne", 2);

const rendreStations = (city) => {
	const temps = new Date(city.stop.departure);
	const minutes = temps.getMinutes().toString().padStart(2, "0");
	const heure = temps.getHours();
	const html = `<article>
    <div class="time">${heure + " : " + minutes}</div>
    <div class="category" data-category="${city.category}">${
		city.category
	}</div>
    <div class="destination">${city.to}</div>
</article>
`;
	panneauGeneral.insertAdjacentHTML("beforeend", html);
};
