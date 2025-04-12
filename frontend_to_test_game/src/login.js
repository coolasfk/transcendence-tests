import { loadPage } from "./app.js";

console.log("calling login");
export const setUpLogin = () => {
  console.log("Login page loaded!");

  const form = document.getElementById("loginForm");
  if (!form) {
    console.error("No login form found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Submitting logging form...");

    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("pass-login").value.trim();

    if(!email || !password)
    {
      alert("Nice try... Fill in your details");
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
    

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password }),
      });

      const result = await response.json();
      console.log("result: ", result);
      if (response.ok) {
        alert(result.message, result.nickname);

      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("-----Error from database:", error);
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
