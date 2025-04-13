
import { MatchRoomStore } from './MatchRoomStore.js';


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
        console.log("💅💅💅💅 GameEngine ********* loop going");*/

        if(!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;

        // 🟢 ➜➜➜➜➜➜➜➜➜ updating PADDLES AND PONG with every loop 1000/60
        ///---change to some valid score---for testing purposes

        if(this.match.pong.ball.scoreA >= 1 || this.match.pong.ball.scoreB >= 1 )
        {
            console.log(`Player ${this.match.pong.ball.scoreA >= 5 ? "A" : "B"} won`);

        
            
            MatchRoomStore.broadcast(this.match.matchId, () => ({
                type: "match_finished",
                winner: `Player ${this.match.pong.ball.scoreA >= 5 ? "A" : "B"}`
            }))  
            this.match.finishMatch(this.match.pong.ball.scoreA >= 5 ? this.match.userId : this.match.oponnentId);
            this.stop();
            return;
        } 

        this.match.pong.update();
        const state = this.match.pong.serialize();
        if(i % 200 === 0)
        {

     
        //console.log("💅💅💅💅 GameEngine STATE UPDATE ::: ", state, "match id: ", this.match.matchId);
       
    } 
    /// i can call broadcast with the callback function or without
    
    MatchRoomStore.broadcast(this.match.matchId, () => ({
            type: "state_update",
            ...state
        }))  
        if (!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;
    }

}