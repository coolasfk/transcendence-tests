import frontend from "../shared/dom.js";
import { ChatMessage } from "../websocket/WsMessage.js";
import websocketManager from "../websocket/WebsocketManager.js";
function chatComponent() {
    const container = frontend.create(`
    <section data-component="chat" class="space-y-4 text-white">
    <h2 class="text-xl font-bold">Chat</h2>
    <input id="chat-input" placeholder="Type a message here" class="w-full p-2 rounded bg-gray-800 border border-gray-600" />
      <button id="chat-send" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">Send</button>
      <div id="chat-log" class="mt-4 space-y-1"></div>
      </section>
  `);
    const input = container.querySelector("#chat-input");
    const sendButton = container.querySelector("#chat-send");
    const log = container.querySelector("#chat-log");
    // print out the message that comes back from the server 
    function logMessage(message) {
        const entry = document.createElement("div");
        entry.textContent = message;
        log.appendChild(entry);
    }
    // Handle the click event on the send button 
    sendButton.addEventListener("click", () => {
        const text = input.value.trim();
        if (text) {
            const message = new ChatMessage(text);
            websocketManager.send(message);
        }
    });
    // listen for incoming messages and call logMessage when they arrive
    window.addEventListener("chat", (event) => {
        const data = event.detail;
        logMessage(`Received from server: ${JSON.stringify(data)}`);
    });
    window.addEventListener("ws:open", () => logMessage("Websocket connected"));
    window.addEventListener("ws:close", () => logMessage("Websocket disconnected"));
    window.addEventListener("ws:error", () => logMessage("Websocket error"));
    return container;
}
export default chatComponent;
