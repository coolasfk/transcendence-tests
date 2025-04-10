import Fastify from "fastify";
import websocketPlugin from '@fastify/websocket';
import cors from '@fastify/cors';
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Match from "./match/domain/entities/Match.js";
import {initDatabase, getDb} from "./initRepo.js";
import {matchMakingStore} from './match/infrastructure/matchMemoryStore.js';
import { messageRouter } from './match/application/messageRouter.js';


dotenv.config();

const fastify = Fastify();

await fastify.register(cors, {
    origin: "*",
});

await fastify.register(websocketPlugin);


////🟢 ➜➜➜➜➜➜➜➜➜ when the client opens the connection, it sends data to the /game endpoint

/**Flow::
 * 
 * 1. user sends invite  - generate matchId 
 *        - store matchId together with the userId in the temp pendingMatch map in the back
 *         - the invitation is being sent together with the matchId
 * 2. OPONNENT accepts the invite ---->> call the endpoint yourInviteGotAccepted
 *        -  in yourInviteGotAccepted we search the pendingMatch for the correct matchId;
 *        - if the correct matchId is found, we can create the match;
 * 3. Frontend opens sockets for both users, they both need to send event "join_match" 
 *        - via sockets with matchId & their ids
 * 4. Backend puts both matchId & userIds in the roomStore. 2 players with the same matchId ---> game starts
 * 
 */



fastify.get('/game', { websocket: true }, (connection, req) => {
    console.log("♥️♥️♥️ client connected::: fastify get");
  
    connection.socket.on('message', (rawMessage) => {
      try {
        const msg = JSON.parse(rawMessage);
        messageRouter.handle(msg, connection);
      } catch (err) {
        console.error("♥️♥️♥️Invalid message", err);
      }
    });
  });
  



fastify.ready().then(() => {
    initDatabase();
   
    fastify.listen({port: 5000});
    console.log("server listening on port 5000");
})



/////move this to application layer ::: starting the match

fastify.post("/api/match/yourInviteGotAccepted", async (req, reply) => {

    console.log("🔆🔆🔆------your invite got accepted (server.js)")
    try{

        console.log("🔆🔆🔆🔆------your invite got accepted (server.js)")

        const {width, height, matchId, userId, nickname, oponnentId, oponnentNickname} = req.body;
        console.log("🔆🔆🔆logs invite accepted", width, height, userId, nickname, oponnentId,oponnentNickname);
        const match = new Match(width, height, matchId, userId, nickname, oponnentId, oponnentNickname, false);

        matchMakingStore.save(match);
        if(match.pong)
        {
            console.log("🔆🔆🔆checking if match is OK", match.pong.ball.radius);
            ///// creating rooms here ??///

        } else
        {
            console.log("🔆🔆🔆something is off with saving to the database 👻");
        }

        return reply.status(200).send({message: "Match successfully created", matchId: match.id});
        

    } catch(err)
    {
        console.log("🔆🔆🔆error at /api.match/yourInviteGotAccepted", err);
        return reply.status(400).send({message: err});
    }  

})


fastify.post("/api/register", async (request, reply) => {
    console.log(request.body);
    const db = getDb();

    const { nickname, email, password } = request.body;

    if (!nickname || !email || !password) {

        return reply.status(400).send({ message: "Missing important information!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (nickname, email, password) VALUES (?,?,?)", [nickname, email, hashedPassword], (err) => {
        if (err) {
            console.log("err: ", err);
            if (err.code == 'SQLITE_CONSTRAINT') {
                return reply.status(400).send({ message: "Email already in the database!" });
            }

            return reply.status(500).send({ message: err });
        }
        return reply.status(200).send({ message: "User successfully added to database!" });
    });
});


fastify.post("/api/login", async (req, reply) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return reply.status(400).send({ message: "Missing credentials!" });
    }
    const db = getDb();
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) {
            console.log("DB error:", err);
            return reply.status(500).send({ message: "Server error." });
        }
        if (!user) {
            console.log("USER NOT FOUND");
            return reply.status(400).send({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("PASS DO NOT MATCH");
            return reply.status(401).send({ message: "Invalid password." });
        }

        console.log("USER NICKNAME: ", user.nickname);
        reply.status(200).send({
            message: "Login successful!",
            nickname: user.nickname,
        });
    });
});










