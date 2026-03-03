const BASE_URL = `http://localhost:5000`;

async function sendBookingRequest() {
	const hotelID = new URLSearchParams(window.location.search).get("target");

	const authBody = {
		email: document.getElementsByName("email")[0].value,
		password: document.getElementsByName("password")[0].value,
	};

	const userResponse = await fetch(`${BASE_URL}/api/v1/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(authBody),
	});

	if (!userResponse.ok) {
		window.location = `ng.html?target=${hotelID}`;
		return;
	}

	const bookBody = {
		checkInDate: document.getElementsByName("checkInDate")[0].value,
		nights: document.getElementsByName("nights")[0].value,
		hotelId: hotelID,
	};

	const userResponseData = await userResponse.json();

	const bookResponse = await fetch(`${BASE_URL}/api/v1/bookings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${userResponseData.token}`,
		},
		body: JSON.stringify(bookBody),
	});

	if (!bookResponse.ok) {
		window.location = `ng.html?target=${hotelID}`;
		return;
	}

	window.location = `ok.html?target=${hotelID}`;
}

async function initialize() {
	const hotelID = new URLSearchParams(window.location.search).get("target");
	const hotelResponse = await fetch(`${BASE_URL}/api/v1/hotels/${hotelID}`);
	const hotel = await hotelResponse.json();
	document.getElementById("hotel-name").innerHTML = hotel.data.name;
}

initialize();
