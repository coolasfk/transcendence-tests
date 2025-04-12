

import { messageHandler } from "./handlers/messageHandler.js";


export const chatRouter = {
    handle(type, data, connection) {
      switch (type) {
        case "messageSend":
        console.log("♥️♥️♥️ case messageSend inside chat Router");
          messageHandler(data, connection);
          break;
          ////add notifications, etc
        default:
          console.warn("Unknown message type:", type);
      }
    }
  };
  