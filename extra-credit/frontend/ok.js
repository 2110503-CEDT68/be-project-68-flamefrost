const BASE_URL = `http://localhost:5000`;

async function initialize() {
	const hotelID = new URLSearchParams(window.location.search).get("target");
	const hotelResponse = await fetch(`${BASE_URL}/api/v1/hotels/${hotelID}`);
	const hotel = await hotelResponse.json();
	document.getElementById("hotel-name").innerHTML = hotel.data.name;
}

initialize();
