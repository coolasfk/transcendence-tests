import SocketGatway from '../infrastructure/WebSocket/SocketGateway.js';
import { roomStore } from './RoomStore.js';


export default class GameEngine 
{
    constructor(match)
    {

        this.match = match;
        this.loop = null;
        this.timeStart = new Date();
        this.timeNow = new Date(); 
        this.i = 0;

    }
    

    start() 
    {
        this.loop = setInterval(() => this.update(this.i++), 1000/60); /// 60 frames 
    }

    stop(){
        clearInterval(this.loop);
    }

    update(i)
    {
        /*if(i % 200 === 0)
        console.log("********* loop going");*/

        if(!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;

        //this.match.pong.ball.update();
        this.match.pong.update();

        /*if(this.match.pong.didScoreLeft()) {
            console.log("🧞‍♀️🧞‍♀️ scored LEFT 🧞‍♀️🧞‍♀️")
            this.match.updateScore(this.match.playerA_id);
            this.match.pong.resetBall();
        } else if (this.match.pong.didScoreRight())
        { console.log("🧞‍♀️🧞‍♀️ scored RIGHT 🧞‍♀️🧞‍♀️")
            this.match.updateScore(this.match.playerB_id);
            this.match.pong.resetBall();
        }
*/

        const state = this.match.pong.serialize();
        if(i % 200 === 0)
        {

     
        //console.log("STATE UPDATE 💅💅💅💅::: ", state, "match id: ", this.match.matchId);
       
    } 
    roomStore.broadcast(this.match.matchId, () => ({
            type: "state_update",
            ...state
        }))  
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