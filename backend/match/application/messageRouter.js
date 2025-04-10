import { joinMatchHandler } from './handlers/joinMatchHandler.js';
import { movePaddleUp, movePaddleDown } from './handlers/movePaddleHandler.js';

export const messageRouter = {
    handle(msg, connection) {
      switch (msg.type) {
        case "join_match":
        console.log("♥️♥️♥️ input join match received");
          joinMatchHandler(msg.data, connection);
          break;
        case "movePaddleUp":
            movePaddleUp(msg.data, connection);
        case "movePaddleDown":
          movePaddleDown(msg.data, connection);
          break;
        default:
          console.warn("Unknown message type:", msg.type);
      }
    }
  };
  