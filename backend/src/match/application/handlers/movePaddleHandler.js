
import { matchMakingStore } from '../../infrastructure/matchMemoryStore.js';


export const movePaddleUp = ({matchId, who, up, down}, connection) => {

    //const {matchId, who, up, down} = msg.data;
          console.log("♥️♥️♥️ Input received: matchid, userid",  matchId, who, up, down);

            console.log(`♥️♥️♥️ User ${who} joined room ${matchId}`) 
            const match = matchMakingStore.findById(matchId);

            console.log("♥️♥️♥️ two paddles in this match id belong to: ", match.userId, "...",  match.oponnentId);
            match.pong.movePaddle(who, up, down);
            console.log("♥️♥️♥️ WILL BE TRYING TO MOVE THE PADDLE OF THE ID: ", who);
          connection.socket.send(JSON.stringify({
           
            type: "input_received",
            message: "Player input received"}))
           

};


export const movePaddleDown = ({matchId, who, up, down}, connection) => {

    //const {matchId, who, up, down} = msg.data;
          console.log("♥️♥️♥️ Input received: matchid, userid",  matchId, who, up, down);

          console.log("♥️♥️♥️ Input received: matchid, userid",  matchId, who, up, down);
    
          console.log(`♥️♥️♥️User ${who} joined room ${matchId}`) 
          const match = matchMakingStore.findById(matchId);

          console.log("♥️♥️♥️two paddles in this match id belong to: ", match.userId, "...",  match.oponnentId);
          match.pong.movePaddle(who, up, down);
          console.log("♥️♥️♥️WILL BE TRYING TO MOVE THE PADDLE OF THE ID: ", who);
         // const data = get
        connection.socket.send(JSON.stringify({
         
          type: "input_received",
          message: "Player input received"}))
         
      }
           