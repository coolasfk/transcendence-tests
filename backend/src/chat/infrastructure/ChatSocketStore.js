


///// this is just a basic structure for the ChatSocketStore; its missing the logic for the rooms 

export const ChatSocketStore = {
    sockets: new Map(),

    addSocket(userId, socket) {
////sneaky way to check if the user exists ;D
    try {
      this.socket.get(userId);
      console.log("user exists we are returning");
      return;
    } catch (err)
    {
      console.log("we are adding the user to the store");
    }
    this.sockets.set(userId, socket);
},

    

///// this is just a basic structure for the ChatSocketStore; its missing the logic for the rooms 

    broadcast(senderId, recipientId, message) {
    const senderSocket = this.sockets.get(senderId);
    const recipientSocket = this.sockets.get(recipientId);
      console.log("broadcasting message to the front: ", message);
    if (senderSocket) {
      senderSocket.send(JSON.stringify({
        ...message,
        to: recipientId
      }));
    }

    if (recipientSocket) {
      recipientSocket.send(JSON.stringify({
        ...message,
        to: recipientId
      }));
    }

    if (!senderSocket && !recipientSocket) {
      console.warn("ChatSocketStore: No sockets found for either user", senderId, recipientId);
    }
  },

    removeSocket(userId)
    {
       this.sockets.delete(userId);
    },

    getSocket(userId)
    {
        return this.sockets.get(userId) || null;
    }
}
