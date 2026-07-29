const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

// If already logged in, skip the login page
const token = localStorage.getItem("token");

if (token) {
  window.location.href = "dashboard.html";
}

loginForm.addEventListener("submit", loginUser);

async function loginUser(event) {
  event.preventDefault();

  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("Please fill in all fields.");

    return;
  }

  const user = {
    email: email.value,

    password: password.value,
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    localStorage.setItem("token", data.token);

    alert("Login Successful!");

    loginForm.reset();

    window.location.href = "dashboard.html";
  } catch (error) {
    console.log(error);

    alert("Unable to connect to the server.");
  }
}
