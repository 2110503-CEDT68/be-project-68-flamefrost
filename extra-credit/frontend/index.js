const BASE_URL = `http://localhost:5000`;

function addRowToTable(hotel) {
	const tableBody = document.getElementById("hotel-table-body");
	tableBody.appendChild(createTableRow(hotel));
}

function createTableRow(hotel) {
	const row = document.createElement("tr");
	const order = ["name", "address", "region", "tel", "bookings", "link"];
	const data = {
		name: hotel.name,
		address: hotel.address,
		region: hotel.region,
		tel: hotel.tel,
		bookings: hotel.bookings.length,
		link: `<a href=book.html?target=${hotel._id}>-></a>`,
	};
	for (let field of order) {
		const cell = document.createElement("td");

		if (field === "link") {
			cell.innerHTML = data[field];
			row.appendChild(cell);
			continue;
		}

		cell.innerText = data[field];
		row.appendChild(cell);
	}
	return row;
}

async function initialize() {
	const hotelsResponse = await fetch(`${BASE_URL}/api/v1/hotels?limit=500`);
	const hotels = await hotelsResponse.json();
	for (let hotel of hotels.data) {
		addRowToTable(hotel);
	}
}

initialize();
