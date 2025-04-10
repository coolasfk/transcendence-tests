import { roomStore } from '../../infrastructure/RoomStore.js';
import { matchMakingStore } from '../../infrastructure/matchMemoryStore.js';
import { startMatch } from '../services/matchService.js';

export function joinMatchHandler({ matchId, userId, oponnentId }, connection) {
  roomStore.addSocket(matchId, connection.socket, userId);
  roomStore.addSocket(matchId, connection.socket, oponnentId);
    ///🟢 ➜➜➜➜➜➜➜➜➜ THIS IS A GOOD CODE, I CHANGED THIS PART FOR TESTING----///
            /*const {matchId, userId} = msg.data;
            roomStore.addSocket(matchId, connection.socket, userId);
            const playerCount = roomStore.getUserCount(matchId);*/

  const playerCount = roomStore.getUserCount(matchId);
  console.log("♥️♥️♥️ player count: ", playerCount);
  if (playerCount === 2) {
    console.log("♥️♥️♥️ we have two players");
    const match = matchMakingStore.findById(matchId);
    if (match) {
      startMatch(match.matchId);
      roomStore.broadcast(matchId, (uid) => ({
        type: "start game",
        message: uid === userId ? "you are player b" : "you are player a"
      }));
    }   else
    {
        console.warn("♥️♥️♥️ MATCH NOT FOUND at fastify.get join match");
    }
  }
}