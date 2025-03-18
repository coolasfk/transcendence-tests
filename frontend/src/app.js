
const pages = {
    home: `
      <!-- HOME PAGE -->
      <header class="w-[80vw] h-[20vh] flex flex-col items-center justify-center mt-2 relative">
        <div class="flex flex-col items-center">
          <img src="./assets/PONG_LOGO.png" alt="Pong_logo" class="w-20 min-w-20 mt-0 mx-auto" />
          <p class="font-[teko] text-3xl text-white mt-4 mx-auto">[ Snooze you Loose ]</p>
        </div>
        <div class="absolute top-1 right-0 flex gap-6">
          <button id="registerBtn"
            class="font-[teko] font-light text-sm text-white underline hover:line-through 
                   transition transform hover:scale-105 cursor-pointer"
          >
            Register
          </button>
          <button id="loginBtn"
            class="font-[teko] font-light text-sm text-white underline hover:line-through 
                   transition transform hover:scale-105 cursor-pointer"
          >
            Log in
          </button>
         
        </div> 
        <h2 id="player2" class="cursor-pointer top-[5vw] right-[15vw] font-[teko] text-3xl text-[#305cde] absolute " >player2</h2>
      </header>
  
      <main class="relative flex flex-col bg-transparent items-center w-[50vw] h-[70vh]">
        <canvas id="pongCanvas" class="border-4 bg-transparent border-white"></canvas>
        <!-- Controls -->
        <div class="font-[teko] mt-6 flex gap-6">
          <button 
            id="startBtn"
            class="cursor-pointer font-[teko] font-light text-2xl px-10 line-through py-3 
                   text-white hover:bg-purple-300 transform hover:scale-105"
          >
            Start Game
          </button>
          <button 
            id="resetBtn"
            class="cursor-pointer font-[teko] font-light text-2xl px-10 py-3 line-through 
                   text-white hover:bg-red-900 transform hover:scale-105"
          >
            Reset
          </button>
         
        </div>
      </main>
  
      <footer class="font-[teko] h-[10vh] text-center mt-20 text-2xl text-white opacity-20">
        - Transcendence -
      </footer>
    `,
  
    register: `
      <!-- REGISTER PAGE -->
      <header class="w-[80vw] h-[20vh] flex flex-col items-center justify-center mt-2">
        <div class="flex flex-col items-center">
          <img id="homeBtn" src="./assets/PONG_LOGO.png" alt="Pong_logo" class="w-20 min-w-20 mt-0 mx-auto" />
          <p class="font-[teko] text-3xl text-white mt-4 mx-auto">[ Snooze you Loose ]</p>
        </div>
      </header>
  
      <main class="relative flex flex-col items-center w-[50vw] h-[70vh]">
        <p class="font-[teko] text-5xl text-[#305cde] mt-3 mb-5 mx-auto">
          Ready to play? Create your account
        </p>
        <form id="registerForm" class=" w-[30vw] space-y-4">
          <input 
            id="nickname" 
            required 
            placeholder="I am..."
            class="cursor-text w-full p-4 mt-1 placeholder-gray-500 bg-transparent
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          <input 
            type="email" 
            id="email"
            required 
            placeholder="Type your email here..."
            class="cursor-text w-full p-4 mt-1 placeholder-gray-500 bg-transparent 
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          <input 
            type="password"
            id="password" 
            required
            placeholder="Password: > 5, 1 capital, 1 number good luck ;)"
            class="cursor-text w-full p-4 mt-1 placeholder-gray-500 bg-transparent 
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          <input 
            type="password"
            id="confirm-password"
            required
            placeholder="Still remember your password? :)"
            class="cursor-text w-full p-4 mt-1  placeholder-gray-500 bg-transparent 
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          <div class="font-[teko] flex justify-center mt-6">
            <button 
              id="submitRegisterBtn"
              type="submit"
              class="cursor-pointer px-10 py-3 text-white hover:bg-purple-300 transition 
                     transform hover:scale-105"
            >
              SUBMIT
            </button>
          </div>
        </form>
  
        <p class="text-center text-sm mt-20 mb-5">
          Already have an account? <a href="login.html" class="white underline">Login here</a>.
        </p>
      </main>
  
      <footer class="h-[10vh] text-center mt-20 text-sm text-white opacity-20">
        Transcendence
      </footer>
    `,
    login: `
      <header class="w-[80vw] h-[20vh] flex flex-col items-center justify-center mt-2">
        <div class="flex flex-col items-center">
          <img id="getBackBtn" src="./assets/PONG_LOGO.png" alt="Pong_logo" class="w-20 min-w-20 mt-0 mx-auto" />
          <p class="font-[teko] text-3xl text-white mt-4 mx-auto">[ Snooze you Loose ]</p>
        </div>
      </header>
  
      <main class="relative flex flex-col items-center w-[50vw] h-[70vh]">
        <p class="font-[teko] text-5xl text-[#305cde] mt-3 mb-5 mx-auto">
          Log in to play!
        </p>
        <form id="loginForm" class=" w-[30vw] space-y-4">
          <input 
            id="email-login" 
            required 
            placeholder="Type your email"
            class="cursor-text w-full p-4 mt-1 placeholder-gray-500 bg-transparent
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          <input 
            type="password" 
            id="pass-login"
            required 
            placeholder="Type your email here..."
            class="cursor-text w-full p-4 mt-1 placeholder-gray-500 bg-transparent 
                   border-4 border-white focus:ring-5 focus:ring-[#305cde]"
          />
          
          <div class="font-[teko] text-2xl flex justify-center mt-6">
            <button 
              id="loginBtn"
              type="submit"
              class="cursor-pointer px-10 py-3 text-white hover:bg-purple-300 transition 
                     transform hover:scale-105"
            >
              LOG IN
            </button>
          </div>
        </form>
  
        <p class="text-center text-sm mt-20 mb-5">
          Already have an account? <a href="login.html" class="white underline">Login here</a>.
        </p>
      </main>
  
      <footer class="h-[10vh] text-center mt-20 text-sm text-white opacity-20">
        Transcendence
      </footer>
    `,
  };
  
  export const loadPage = async (page) => {
    const app = document.getElementById("app");
    ////------!!!!!! add sanitizer here
    app.innerHTML = pages[page] || "<h1>Page not found.</h1>";
  
    if (page === "home") {
      const mainModule = await import("./main.js");
      mainModule.initGame();
    } else if (page === "register") {
      const registerModule = await import("./register.js");
      registerModule.setUpRegister();
    } else if(page === "login")
    {
        const loginModule = await import("./login.js");
        loginModule.setUpLogin();

    }
    attachEventListeners(page);
  } 


//// you need to sanitize this html its a danger!
  /*
  const sanitizeHTML = (html) =>
  {
    if(!html)
    return "<h1>html is missing</h1>";
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.textContent  || "hello something is wrong";
  }
  */
  

const attachEventListeners = (page) => {
    if (page === "home")
    {
        const registerBtn = document.getElementById("registerBtn");
        if(registerBtn) {
            registerBtn.addEventListener("click", () => loadPage("register"));
        };
        const loginBtn = document.getElementById("loginBtn");
        if( loginBtn) {
            loginBtn.addEventListener("click", () => loadPage("login"));
        }
    } else if( page === "register")
    {
        const homeBtn = document.getElementById("homeBtn");
        homeBtn.addEventListener("click", () => loadPage("home"));
    }
    else if( page === "login")
    {
        const getBackBtn = document.getElementById("getBackBtn");
        getBackBtn.addEventListener("click", () => loadPage("home"));
    }
}








  window.onload = () => loadPage("home");
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registerBtn").addEventListener("click", () => loadPage("register"));
  })

  window.loadPage = loadPage;
  