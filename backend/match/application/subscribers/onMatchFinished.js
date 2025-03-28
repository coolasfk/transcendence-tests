import EventBus from "../../infrastructure/EventBus";
import db from "../../../server.js";
import {io} from "../../infrastructure/WebSocket/SocketGateway.js"

EventBus.subscribe("match_finished", (matchData) => {

console.log("adding the match to the database");

    db.save("matches", matchData);
    io.to(matchData.userA_id).emit("game_over", matchData);
    io.to(matchData.userB_id).emit("game_over", matchData);
})