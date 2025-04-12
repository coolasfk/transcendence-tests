import frontend from "../shared/dom.js";

function registerComponent(): HTMLFormElement {
  const container = frontend.create(`
    <form class="flex flex-col space-y-4" data-component="register">
      <h2 class="text-xl font-bold mb-2 text-white">Register</h2>
      <input 
        name="username"
        type="text" 
        placeholder="name"
        class="px-4 py-2 bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        name="password"
        type="password" 
        placeholder="Password"
        class="px-4 py-2 rounded bg-gray-800 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Register
      </button>
    </form>
  `) as HTMLFormElement;

  container.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(container);
    const username = (formData.get("username") as string).trim();
    const password = formData.get("password") as string;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful! You can now login.");
      window.location.hash = "#/auth/login";
    } catch (error) {
      alert((error as Error).message);
    }
  });

  return container;
}

export default registerComponent;

