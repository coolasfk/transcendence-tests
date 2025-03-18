let nickname;

 const form = document.getElementById("registerForm");
nickname =  document.getElementById("nickname");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  console.log("RELOADING THE FORM");
    const nickname = document.getElementById("nickname").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
      }

      if(nickname.length < 2 )
      {
        alert("C'mon put more effort into your nickname");
        return;
      }
  
      if (!validatePassword(password)) {
        alert("Password must be at least 8 characters, include uppercase, lowercase, and a number!");
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
          window.location.href = "../index.html"; 
        } else {
          alert(result.message);
          
        }
      } catch (error) {
        console.error("----*---- Error:", error);
        alert("Sorry, the server experiences difficulties.");
        window.location.href = "../index.html"; 
      }
    });
  
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    const validatePassword = (password) => {
      return password.length >= 5 &&
             /[A-Z]/.test(password) && 
             /[a-z]/.test(password) && 
             /\d/.test(password);    
    }

  