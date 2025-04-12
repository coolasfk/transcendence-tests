import dom from "../shared/dom.js";

function HomeView(): HTMLElement {
  const homeView = dom.create(`
    <div class="p-8 space-y-4 text-black">
      <h2 class="text-2xl font-bold">Welcome</h2>
        <p class="text-black">
          Please <a href="/register" class="text-blue-400 underline">Register</a>.
        </p>
      <div>
        <a href="/chat" class="text-blue-400 underline">Go to chat</a>
      </div>
    </div>
  `)

  return homeView;
}

export default HomeView;