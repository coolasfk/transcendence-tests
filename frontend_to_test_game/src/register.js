import { loadPage } from "./app.js";

export function setUpRegister() {
  console.log("Register page loaded!");

  const form = document.getElementById("registerForm");
  if (!form) {
    console.error("No register form found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submitted...");

    const nickname = document.getElementById("nickname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (nickname.length < 2) {
      alert("C'mon, put more effort into your nickname!");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format!");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 5 characters, include uppercase, lowercase, and a number!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        //window.location.reload(); 
        loadPage("login");
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }
  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validatePassword(password) {
  return (
    password.length >= 5 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}
