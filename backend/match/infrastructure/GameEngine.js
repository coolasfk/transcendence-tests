import SocketGatway from '../infrastructure/WebSocket/SocketGateway.js';


class GameEngine 
{
    constructor(io, match)
    {
        this.io = io;
        this.match = match;
        this.loop = null;

    }

    star() 
    {
        this.loop = setInterval(() => this.update(), 1000/60); /// 60 frames 
    }

    stop(){
        clearInterval(this.loop);
    }

    update()
    {
        this.match.pong.update();

        const state = {
            ball: this.match.pong.ball,
            leftPaddleY: this.match.playerA.paddle,
            rightPaddleY: this.match.playerB.paddle,
            scoreA: this.match.finalScoreA,
            scoreB: this.match.finalScoreB           
        };
        this.io.to(this.match.id).emit("state_update", state);
    }

    handleInput(playerId )
}