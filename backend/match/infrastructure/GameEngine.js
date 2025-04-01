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

        console.log("********* loop going");
        if(!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;

        this.match.pong.ball.update();
        if(this.match.pong.didScoreLeft()) {
            this.match.updateScore(this.match.playerA_id);
            this.match.pong.resetBall();
        } else if (this.match.pong.didScoreRight())
        {
            this.match.updateScore(this.match.playerB_id);
            this.match.pong.resetBall();
        }


        const state = this.match.pong.serialize();

        this.io.to(this.match.id).emit("state_update", state);

        if (!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;
    }

    /*handleInput({playerId, up, down})
    {
        if(!this.match || this.match.STATUS != ONGOING)
            return;
        

        this.match.handleInput(playerId, up, down);
    }*/


}