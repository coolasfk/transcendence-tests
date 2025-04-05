

//import {Server} from 'socket.io';
import { matchRepo } from '../../../matchRepo.js';
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
        console.log("setting up the listeners in socketgateway");
        ///strings like connection , disconnect are given by socket.io 
        this.io.on('connection', (socket) => {
            console.log("--- Socket connected:", socket.id);
          
            socket.on("player_input", ({ userId, up, down }) => {
              console.log("player_input received from frontend!", userId, up, down);
          
              const match = matchRepo.findById(userId);
              if (!match) return;
              match.pong.movePaddle(userId, up, down);
            });
          
            socket.on('disconnect', () => {
              console.log("Socket disconnected", socket.id);
            });
          });
          
}

    _subscribeToMatchEvents() 
    {
        console.log("subscibe to match events inside the socket gatewat");
        EventBus.subscribe("match_created", (match) => {
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