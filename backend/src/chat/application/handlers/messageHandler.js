import { ChatSocketStore } from "../../../chat/infrastructure/ChatSocketStore.js";

export  function messageHandler(data, connection) {
  try {

   
    const { text, userId, recipientId } = data;
    ///// this is only now, for testing. we will be adding only useriD TO THE chatstore
    ChatSocketStore.addSocket(userId, connection.socket);
    ChatSocketStore.addSocket(recipientId, connection.socket);
    console.log("Received from client:", text);

    const messageBack = {
      type: data.type,
      echo: true,
      received: data,
      timestamp: Date.now()
    };

    ///// Send message to the recipient

    ChatSocketStore.broadcast(userId, recipientId, messageBack);

  } catch (error) {
    console.error("Failed to handle chat message:", error);
    connection.socket.send(JSON.stringify({
      type: "error",
      message: "Invalid message received"
    }));
  }
}
