

import {Server} from 'socket.io';
import EventBus from '../EventBus.js';
import GameEngine from '../GameEngine.js';



export default class SocketGateway {
    constructor(httpServer)
    {
        this.io = new Server(httpServer, {
            cors: {origin: "*"}
        })
        this._setupListeners();
        this._subscribeToMatchEvents();
    }

    _setupListeners()
    {
        ///strings like connection , disconnect are given by socket.io 
        this.io.on('connection', (socket) => {
            console.log("Socket connected:", socket.id);

        socket.on('disconnect', () => {
            console.log("Socket disconnected", socket.id);
        });

    });
}

    _subscribeToMatchEvents() 
    {
        const eventBus = new EventBus();
        eventBus.subscribe("match_created", (match) => {
            console.log("Match created -> Starting game engine", match.id);
            const engine = new GameEngine(this.io, match);
            engine.start();
        })
    }

    getIo()
    {
        return this.io;
    }
}