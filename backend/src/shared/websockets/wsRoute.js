import { gameRouter } from '../../match/application/gameRouter.js';
import { chatRouter } from '../../chat/application/chatRouter.js';

export default async function wsRoute(fastify) {
    fastify.get('/ws/main-ws', { websocket: true }, (connection, req) => {
      console.log("♥️♥️♥️ client connected::: /ws/main-ws");
  
      connection.socket.on('message', (rawMessage) => {
        try {
          const { domain, type, data } = JSON.parse(rawMessage);
  
          if (domain === "chat") {
            chatRouter.handle(type, data, connection);
          } else if (domain === "game") {
            gameRouter.handle(type, data, connection);
          } else {
            console.warn("Unknown domain:", domain);
          }
  
        } catch (err) {
          console.error("♥️♥️♥️ Invalid message", err);
          connection.socket.send(JSON.stringify({
            type: "error",
            message: "Invalid JSON or missing domain/type"
          }));
        }
      });
    });
  
    console.log("WebSocket route mounted at /ws/main-ws");
  }