import chatComponent from "../components/chatComponent.js";
import dom from "../shared/dom.js"

function chatView(): HTMLElement {
    const chatView = dom.create(`
        <main data-page="chat" class="p-8 max-w-xl mx-auto text-white space-y-6">
            <h1 class="text-3xl font-bold">Chat Page</h1>
            <section data-id="chat" class="bg-gray-800 p-6 rounded-lg shadow"></section>
        </main>
    `);

    // --- Selectors ---
    const chatSelector : HTMLElement | null = chatView.querySelector('[data-id="chat"]');

    // --- Loading and mounting nested components ---
    const chatForm = chatComponent();

    if (chatSelector)
        dom.mount(chatSelector, chatForm);

    return chatView;
}

export default chatView;