

import {Server} from 'socket.io';
import {httpServer} from '..../server.js'
import EventBus from '../EventBus';
import Match from '../../domain/entities/Match';
import PlayerAi from '../../domain/entities/PlayerAi'
import PlayerHuman from '../../domain/entities/PlayerHuman'



class SocketGateway {
    constructor(httpServer)
    {
        this.io = new Server(httpServer, {
            cors: {origin: "*"}
        })


        this.gameEngine = new this.gameEngine(this.io);
        this._setupListeners();
        this._subscribeToMatchEvent();
    }

/// socket.io/docs

    _setupListeners()
    {
        ///strings like connection , disconnect are given by socket.io 
        this.io.on('connection', (socket) => {
            console.log("Socket connected:", socket.id);
        });

        socket.on('disconnect', () => {
            console.log("Socket disconnected", socket.id)
        })

        socket.on("join human match", ({userId, nickname}) => {
            const player = new PlayerHuman(userId, nickname);
            Match.setPlayer(player);
        })

        socket.on("join match with ai", ({userId}) => {
            const player = new PlayerAi(userId);
            Match.setPlayer(player);
        })

    }
}