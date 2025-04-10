import GameEngine from '../../infrastructure/GameEngine.js';
import { matchMakingStore } from '../../infrastructure/matchMemoryStore.js';

export const startMatch = (matchId) => {

     /*
        - open the socket
        - launch prompts to get the nicknames for the players
        - create players
        - create pong 

        - if this is a match with ai, launch this ai thing ( i will add code later)

        - launch game loop and pass variables from the pong (use?)
        - keep updating the scores throughhout the game
        - save final data to the data base
        - destroy pong and the socket and reset the variables 
        
        */

  const match = matchMakingStore.findById(matchId);

  if (!match) {
    console.warn("⚠️ Match not found: ", matchId);
    return;
  }

  match.date = new Date();
  match.status = match.STATUS.ONGOING;

  const engine = new GameEngine(match);
  match.engine = engine;
  engine.start();

  console.log("🥖🥖🥖🥖🥖match: startMatch starting the game")
};