import Fastify from "fastify";
import websocketPlugin from '@fastify/websocket';
import cors from '@fastify/cors';
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import {open} from 'sqlite';
import {matchRepo} from './matchRepo.js'
import bcrypt from "bcryptjs";
import { createServer } from 'http';
import SocketGateway from './match/infrastructure/WebSocket/SocketGateway.js'
import Match from "./match/domain/entities/Match.js";
import {v4 as uuid} from 'uuid';
import http from 'http';
import {initDatabase, getDb} from "./initRepo.js";
import {matchMakingStore} from './match/infrastructure/matchMemoryStore.js';
import { userId } from "../frontend/src/main.js";
import { connect } from "http2";
import { mkdirSync } from "fs";


dotenv.config();

const fastify = Fastify();

await fastify.register(cors, {
    origin: "*",
});

await fastify.register(websocketPlugin);




fastify.get('/game', { websocket: true }, (connection, req) => {
    console.log("client connected");
  
    connection.socket.on('message', (rawMessage) => {
      try {
        const msg = JSON.parse(rawMessage);
  
        if (msg.data && msg.type === "movePaddleUp") {
        const {matchId, userId, up, down} = msg.data;
          console.log("Input received:",  matchId, userId, up, down);
  
          connection.socket.send(JSON.stringify({

            type: "input_received",
            message: "Player input received"}))
           
        }
      } catch (err) {
        console.error("Invalid message", err);
      }
    });
  });
  



fastify.ready().then(() => {
    initDatabase();
    /*fastify.io.on("connection", (socket) => {
        console.log("socket ready at server.js", socket.id); 
        
        socket.on("player_input", ({ matchId, userId, up, down }) => {
        console.log("player_input received from frontend!", matchId, userId, up, down);
    

        fastify.io.on("connection", socket => {
            socket.join("userRoom");
          });




        const match = matchMakingStore.findById(matchId);
        if (!match || !match.pong)
        {
            console.log("match does not exists 👻")
            return;
        } else
        {
            console.log("🚨🚨 TRYING TO MOVE THAT PADDLE 🚨🚨 ");
            match.pong.movePaddle(userId, up, down);
        }
        
      });
    
      socket.on('disconnect', () => {
        console.log("Socket disconnected 👻", socket.id);
      });
    });*/
   
    fastify.listen({port: 5000});
    console.log("server listening on port 5000");
})

/////move this to application layer ::: starting the match

fastify.post("/api/match/yourInviteGotAccepted", async (req, reply) => {

    console.log("------your invite got accepted (server.js)")
    try{

        console.log("------your invite got accepted (server.js)")

        const {matchId, userId, nickname, oponnentId, oponnentNickname} = req.body;
        console.log("logs invite accepted", userId, nickname, oponnentId,oponnentNickname);
        const match = new Match(matchId, userId, nickname, oponnentId, oponnentNickname, false);
        //match.startMatch(fastify.io);

        matchMakingStore.save(match);
        if(match.pong)
        {
            console.log("checking if match is OK", match.pong.ball.radius)
        } else
        {
            "something is off with saving to the database 👻";
        }

        return reply.status(200).send({message: "Match successfully created", matchId: match.id});
        

    } catch(err)
    {
        console.log("error at /api.match/yourInviteGotAccepted", err);
        return reply.status(400).send({message: err});
    }  

})


/////// -------- test

fastify.get("/api/health", async(req, reply) => {
    console.log("checking health");
    return reply.status(200).send({status: "pong"});

});

///// ------- test end

















































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










