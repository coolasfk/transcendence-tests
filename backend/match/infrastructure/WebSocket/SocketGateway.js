

import {Server} from 'socket.io';
import {httpServer} from '..../server.js'
import EventBus from '../EventBus';
import Match from '../../domain/entities/Match';
import PlayerAi from '../../domain/entities/PlayerAi'
import PlayerHuman from '../../domain/entities/PlayerHuman'



export default class SocketGateway {
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


   
    /*
        socket.on("join human match", ({userId, nickname}) => {

            const match = new Match(uuid());
            match.createPlayer(userId, nickname, false);

        })

        socket.on("join match with ai", ({userId, nickname}) => {
            const match = new Match(uuid());
            match.createPlayer(null, null, true);
            match.createPlayer(userId, nickname, false);
        })*/

    }
}