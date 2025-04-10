
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
        console.log("💅💅💅💅 GameEngine ********* loop going");*/

        if(!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;

        // 🟢 ➜➜➜➜➜➜➜➜➜ updating PADDLES AND PONG with every loop 1000/60

        this.match.pong.update();
        const state = this.match.pong.serialize();
        if(i % 200 === 0)
        {

     
        //console.log("💅💅💅💅 GameEngine STATE UPDATE ::: ", state, "match id: ", this.match.matchId);
       
    } 
    /// i can call broadcast with the callback function or without
    
    roomStore.broadcast(this.match.matchId, () => ({
            type: "state_update",
            ...state
        }))  
        if (!this.match || this.match.status !== this.match.STATUS.ONGOING)
            return;
    }

}