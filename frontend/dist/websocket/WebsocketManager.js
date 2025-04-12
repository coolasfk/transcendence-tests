class WebsocketManager {
    // will probably be "ws/main" but is still reusable and modular
    constructor(url) {
        this.connected = false;
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        this.socket = new WebSocket(`${protocol}://${window.location.host}${url}`);
        // Event Listener for opening the websocket
        this.socket.addEventListener("open", () => {
            this.connected = true;
            console.log("Websocket connected");
            window.dispatchEvent(new Event("ws:open"));
        });
        // Event Listener for incoming messages
        // Parses incoming msg and dispatches them based on data type
        this.socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data === null || data === void 0 ? void 0 : data.type) {
                    window.dispatchEvent(new CustomEvent(data.type, { detail: data }));
                }
                else {
                    console.warn("Websocket received message without type: ", data);
                }
            }
            catch (error) {
                console.error("Websocket received invalid JSON: ", event.data);
            }
        });
        // Event Listener for close event 
        this.socket.addEventListener("close", (event) => {
            this.connected = false;
            console.log(`Websocket disconnected: ${event.reason || "no clear reason"}`);
            console.log("Socket closed:", event.code, event.reason);
            window.dispatchEvent(new Event("ws:close"));
        });
        // Event Listener for errors
        this.socket.addEventListener("error", (event) => {
            console.error("Websocket Error: ", event);
            window.dispatchEvent(new Event("ws:error"));
        });
    }
    // SEnd method in order to send JSON data over the socket when connected:
    send(message) {
        if (this.connected) {
            this.socket.send(JSON.stringify(message));
        }
        else {
            console.warn("Websocket not connected, can't send.");
        }
    }
}
const websocketManager = new WebsocketManager("/ws/main-ws");
export default websocketManager;
