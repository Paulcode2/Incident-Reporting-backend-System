// ===========================
// SELECT DOM ELEMENTS
// ===========================

const logoutBtn = document.getElementById("logoutBtn");
const incidentForm = document.getElementById("incidentForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const image = document.getElementById("image");
const incidentContainer = document.getElementById("incidentContainer");

// ===========================
// CHECK AUTHENTICATION
// ===========================

const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first.");
  window.location.href = "index.html";
}

// ===========================
// LOGOUT
// ===========================

logoutBtn.addEventListener("click", logoutUser);

function logoutUser() {
  localStorage.removeItem("token");

  alert("Logged out successfully.");

  window.location.href = "index.html";
}

// ===========================
// SUBMIT INCIDENT
// (We'll build this in Section 3)
// ===========================
incidentForm.addEventListener("submit", submitIncident);
// Create Incidents
async function submitIncident(e) {
  e.preventDefault();

  if (title.value.trim() === "" || description.value.trim() === "") {
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();

  formData.append("title", title.value);
  formData.append("description", description.value);

  if (image.files.length > 0) {
    formData.append("image", image.files[0]);
  }

  try {
    const response = await fetch(`${BASE_URL}/incidents`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    alert("Incident reported successfully.");

    incidentForm.reset();

    getIncidents();
  } catch (error) {
    console.log(error);

    alert("Something went wrong.");
  }
}
// Get Incidents
async function getIncidents() {
  try {
    const response = await fetch(`${BASE_URL}/incidents`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    displayIncidents(data);
  } catch (error) {
    console.log(error);

    alert("Unable to fetch incidents.");
  }
}

// Display
function displayIncidents(incidents) {
  incidentContainer.innerHTML = "";

  if (incidents.length === 0) {
    incidentContainer.innerHTML = "<h3>No incidents found.</h3>";

    return;
  }

  incidents.forEach((incident) => {
    const card = document.createElement("div");

    card.innerHTML = `
        
            <hr>

            <h2>${incident.title}</h2>

            <p>${incident.description}</p>

            ${
              incident.image
                ? `<img src="${incident.image}" width="250" alt="Incident Image">`
                : ""
            }

            <br><br>

            <button onclick="deleteIncident('${incident._id}')">
                Delete
            </button>

            <button onclick="showEditForm('${incident._id}')">
                Edit
            </button>

            <div id="edit-${incident._id}"></div>

        `;

    incidentContainer.appendChild(card);
  });
}

// Delete
async function deleteIncident(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this incident?",
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/incidents/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    alert(data.message);

    getIncidents();
  } catch (error) {
    console.log(error);

    alert("Unable to delete incident.");
  }
}

// Update Incidents
async function updateIncident(id) {
  const titleInput = document.getElementById(`title-${id}`);

  const descriptionInput = document.getElementById(`description-${id}`);

  const imageInput = document.getElementById(`image-${id}`);

  const formData = new FormData();

  if (titleInput.value.trim() !== "") {
    formData.append("title", titleInput.value);
  }

  if (descriptionInput.value.trim() !== "") {
    formData.append("description", descriptionInput.value);
  }

  if (imageInput.files.length > 0) {
    formData.append("image", imageInput.files[0]);
  }

  try {
    const response = await fetch(`${BASE_URL}/incidents/${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    const data = await response.json();

    alert(data.message);

    getIncidents();
  } catch (error) {
    console.log(error);

    alert("Unable to update incident.");
  }
}

// Show edits

function showEditForm(id) {
  const container = document.getElementById(`edit-${id}`);

  container.innerHTML = `

        <hr>

        <input
            type="text"
            id="title-${id}"
            placeholder="New Title">

        <br><br>

        <textarea
            id="description-${id}"
            placeholder="New Description"></textarea>

        <br><br>

        <input
            type="file"
            id="image-${id}"
            accept="image/*">

        <br><br>

        <button onclick="updateIncident('${id}')">

            Save Changes

        </button>

    `;
}
// Called Functions
getIncidents();
