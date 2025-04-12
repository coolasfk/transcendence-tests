import { joinMatchHandler } from './handlers/joinMatchHandler.js';
import { movePaddleUp, movePaddleDown } from './handlers/movePaddleHandler.js';

export const gameRouter = {
    handle(type, data, connection) {
      switch (type) {
        case "join_match":
        console.log("♥️♥️♥️ input join match received");
          joinMatchHandler(data, connection);
          break;
        case "movePaddleUp":
            movePaddleUp(data, connection);
        case "movePaddleDown":
          movePaddleDown(data, connection);
          break;
        default:
          console.warn("Unknown message type:", type);
      }
    }
  };
  