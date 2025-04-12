import Fastify from "fastify";
import websocketPlugin from '@fastify/websocket';
import cors from '@fastify/cors';
import dotenv from "dotenv";
import Match from "./src/match/domain/entities/Match.js";
import {initDatabase, getDb} from "./initRepo.js";
import {matchMakingStore} from './src/match/infrastructure/matchMemoryStore.js';

import registerRoutes from './src/index/index.js';
import jwt from '@fastify/jwt';
import databasePlugin from './database/database.js';
import fastifyBcrypt from 'fastify-bcrypt';




dotenv.config();

const fastify = Fastify({logger: true});

await fastify.register(cors, {
    origin: "*",
});

await fastify.register(websocketPlugin);
await fastify.register(jwt, { secret: 'supersecret' });

await fastify.register(databasePlugin);
await fastify.register(fastifyBcrypt);


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
 * 4. Backend puts both matchId & userIds in the MatchRoomStore. 2 players with the same matchId ---> game starts
 * 
 */


// import shared utils, services, and repositories to the Fastify instance
import BcryptPasswordHasher from './src/shared/utils/hash.js';
import UserRepositorySQLite from './src/auth/infrastructure/UserRepositorySQLite.js';
import UserRegister from './src/auth/application/UserRegister.js';

// Create real instances
const passwordHasher = new BcryptPasswordHasher(fastify.bcrypt);
const userRepository = new UserRepositorySQLite(fastify.db);
const userRegister = new UserRegister(userRepository, fastify.jwt, passwordHasher);

// Decorate with actual instances
fastify.decorate('userRepository', userRepository);
fastify.decorate('userRegister', userRegister);
fastify.decorate('bcryptPasswordHasher', passwordHasher);

// Register routes
try {
  await registerRoutes(fastify);
} catch (error) {
  console.error('Error in registerRoutes:', error);
  process.exit(1);
}
try {
    await initDatabase();
} catch(error)
{
    console.log("errro initialiting database");
}


fastify.listen({ port: 3000, host: '0.0.0.0' }, function (error, address) {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})
/*
fastify.get('/ws/main-ws', { websocket: true }, (connection, req) => {
    console.log("♥️♥️♥️ client connected::: fastify get");
  
    connection.socket.on('message', (rawMessage) => {
      try {
        const {domain, type, data} = JSON.parse(rawMessage);
        if(domain === "chat")
            chatRouter.handle(type, data, connection);
        else if(domain === "game")
            gameRouter.handle(type, data, connection);
      } catch (err) {
        console.error("♥️♥️♥️Invalid message", err);
      }
    });
  });*/
  






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












