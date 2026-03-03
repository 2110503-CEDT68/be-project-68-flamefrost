const BASE_URL = `http://localhost:5000`;

async function lookup() {
  const authBody = {
    email: document.getElementsByName("email")[0].value,
    password: document.getElementsByName("password")[0].value
  };

  const userResponse = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authBody)
  });

  const tableBody = document.getElementById("my-bookings-body");
  tableBody.innerHTML = "";

  if (!userResponse.ok) {
    tableBody.innerHTML = "Failed to get user bookings.";
    return;
  }

  const userResponseData = await userResponse.json();

  const bookingResponse = await fetch(`${BASE_URL}/api/v1/bookings`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${userResponseData.token}`
    }
  });

  const bookingResponseData = await bookingResponse.json();

  for (const booking of bookingResponseData.data) {
    tableBody.appendChild(createTableRow(booking));
  }
}

function createTableRow(booking) {
  const row = document.createElement("tr");
  const order = ["checkInDate", "nights", "hotelName"];
  const data = {
    checkInDate: formatDate(booking.checkInDate),
    nights: booking.nights,
    hotelName: booking.hotel.name
  };
  for (let field of order) {
    const cell = document.createElement("td");

    if (field === "checkInDate") {
      cell.innerText = data[field];
      row.appendChild(cell);
      continue;
    }

    cell.innerText = data[field];
    row.appendChild(cell);
  }
  return row;
}

function formatDate(data) {
  const date = new Date(data);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
}
