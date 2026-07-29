const registerForm = document.getElementById("registerForm");

const username = document.getElementById("username");

const email = document.getElementById("email");

const password = document.getElementById("password");

registerForm.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();

  if (
    username.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    alert("Please fill in all fields.");

    return;
  }

  const user = {
    username: username.value,

    email: email.value,

    password: password.value,
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
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

    alert("Registration Successful!");

    registerForm.reset();

    window.location.href = "index.html";
  } catch (error) {
    console.log(error);

    alert("Unable to connect to the server.");
  }
}
