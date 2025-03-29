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

    handleInput({playerId, up, down})
    {
        const player = this.match.getPlayerById(playerId);
        if(!player)
            return;
        if(up) player.paddle.moveUp();
        else if (down) player.paddle.moveDown();
        else player.paddle.stop();
    }
}