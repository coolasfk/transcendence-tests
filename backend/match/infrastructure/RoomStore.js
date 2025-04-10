

/*
////🟢 ➜➜➜➜➜➜➜➜➜
roomstore is an object
structure for a roomstore : 
rooms: Map<matchId, Map<userId, socket>>;
every user has its own socket

*/


export const roomStore = {
    rooms: new Map(),

    addSocket(matchId, socket, userId) {

    if (!this.rooms.has(matchId))
    {
        this.rooms.set(matchId, new Map());
    }

    this.rooms.get(matchId).set(userId, socket);
    console.log(`Added user ${userId} to room ${matchId}`);
},

    broadcast(matchId, callbackPerUser) 
    {
        const room = this.rooms.get(matchId);
        if(!room) return;
        ////🟢 ➜➜➜➜➜ entries is a build in JS method, it returns iterators for array, map, set
        for (const [userId, socket] of room.entries())
        {
            const message = callbackPerUser(userId);
            socket.send(JSON.stringify(message));
        }

    },

    getUserCount(matchId)
    {
       const room = this.rooms.get(matchId);
       return room ? room.size : 0 ;
    },

    hasRoom(matchId)
    {
        return this.rooms.get(matchId);
    },
    removeSocket(matchId, userId)
    {
        const room = this.rooms.get(matchId);
        if(room)
        {
            room.delete(userId);
            if(room.size === 0)
            {
                this.rooms.delete(matchId);
                console.log(`room ${matchId} deleted`);
            }
        }
    },

    getSocket(matchId, userId)
    {
        const room = this.rooms.get(matchId);
        return room ? room.get(userId) : null;
    }
}