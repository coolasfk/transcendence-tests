import Fastify from "fastify";
import fastifyIO from 'fastify-socket.io';
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


dotenv.config();

const fastify = Fastify();

await fastify.register(cors, {
    origin: "*",
});


await fastify.register(fastifyIO, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let io;


fastify.ready().then(() => {
    initDatabase();
    io = fastify.io.on("connection", (socket) => {
        console.log("socket ready at server.js", socket.id); 
        
        socket.on("user_input", ({ userId, up, down }) => {
        console.log("user_input received from frontend!", userId, up, down);
    
        const match = matchRepo.findById(userId);
        if (!match) return;
        match.pong.movePaddle(userId, up, down);
      });
    
      socket.on('disconnect', () => {
        console.log("Socket disconnected", socket.id);
      });
    });
   
    fastify.listen({port: 5000});
    console.log("server listening on port 5000");
})



fastify.post("/api/match/yourInviteGotAccepted", async (req, reply) => {

    console.log("------your invite got accepted (server.js)")
    try{

        console.log("------your invite got accepted (server.js)")

        const {userId, nickname, oponnentId, oponnentNickname} = req.body;
        console.log("logs invite accepted", userId, nickname, oponnentId,oponnentNickname);
        const match = new Match(uuid(), userId, nickname, oponnentId, oponnentNickname, false);
        match.startMatch(io);

        await matchRepo.save(match);

        return reply.status(200).send({message: "Match successfully created", matchId: match.id});
        

    } catch(err)
    {
        console.log("error at /api.match/yourInviteGotAccepted", err);
        return reply.status(400).send({message: err});
    }  

})













