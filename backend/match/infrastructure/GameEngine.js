import SocketGatway from '../infrastructure/WebSocket/SocketGateway.js';


export default class GameEngine 
{
    constructor(io, match)
    {
        this.io = io;
        this.match = match;
        this.loop = null;
        this.timeStart = new Date();
        this.timeNow = new Date(); 

    }

    start() 
    {
        this.loop = setInterval(() => this.update(), 1000/60); /// 60 frames 
    }

    stop(){
        clearInterval(this.loop);
    }

    update()
    {
        if(!this.match || !this.match.STATUS !== ONGOING)
            return;
        this.match.update();

        const state = this.match.pong.serialize();

        this.io.to(this.match.id).emit("state_update", state);

        if(this.match.pong.isGameOver())
        {
            this.match.finishMatch();
            this.stop();
        }
    }

    handleInput({playerId, up, down})
    {
        if(!this.match || this.match.STATUS != ONGOING)
            return;
        

        this.match.handleInput(playerId, up, down);
    }
}