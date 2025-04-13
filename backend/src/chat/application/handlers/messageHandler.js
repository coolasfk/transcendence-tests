import { SocketStore } from "../../../shared/websockets/SocketStore.js";

export  function messageHandler(data, connection) {
  try {

   
    const { text, userId, recipientId } = data;
    ///// this is only now, for testing. we will be adding only useriD TO THE chatstore
    SocketStore.addSocket(userId, connection.socket);
    SocketStore.addSocket(recipientId, connection.socket);
    console.log("Received from client:", text);

    const messageBack = {
      type: "sendMessage",
      echo: true,
      received: data,
      timestamp: Date.now()
    };

    ///// Send message to the recipient

    SocketStore.broadcast(userId, recipientId, messageBack);

  } catch (error) {
    console.error("Failed to handle chat message:", error);
    connection.socket.send(JSON.stringify({
      type: "error",
      message: "Invalid message received"
    }));
  }
}
