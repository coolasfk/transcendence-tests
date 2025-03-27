

import {Server} from 'socket.io';
import {httpServer} from '..../server.js'



class SocketGateway {
    constructor(httpServer)
    {
        this.io = new Server(httpServer, {
            cors: {origin: "*"}
        })


        this.gameLoop = new this.gameLoop(this);
        this._setupListeners;
    }
}