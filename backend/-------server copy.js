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

await fastify.register(fastifyIO);
/*
await fastify.register(cors, {
    origin: "*",
});

*/

fastify.get("/api/health", async(req, reply) => {
    console.log("checking health");
    return reply.status(200).send({status: "pong"});

});

const httpServer = createServer(fastify.server);
let socketGateway = new SocketGateway(httpServer);

fastify.post("/api/match/yourInviteGotAccepted", async (req, reply) => {

    console.log("------your invite got accepted (server.js)")
    try{

        console.log("------your invite got accepted (server.js)")

        const {userId, userNickname, oponnentId, oponnentNickname} = req.body;
        console.log("logs invite accepted", userId, userNickname, oponnentId,oponnentNickname);
        const match = new Match(uuid(), userId, userNickname, oponnentId, oponnentNickname, false);
        match.startMatch(socketGateway.getIo());

        await matchRepo.save(match);

        return reply.status(200).send({message: "Match successfully created", matchId: match.id});
        

    } catch(err)
    {
        console.log("error at /api.natch/yourInviteGotAccepted", err);
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

/// basically we dont have to make a promise but i wanted ;D
/*
const startServer = async() => {
    try {
        await initDatabase();

        const address = await fastify.listen({port: 5000, host: "0.0.0.0"});
        console.log("server is listening on: ", address);

        //socketGateway = new socketGateway(httpServer); /// this is breaking the code

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);

    }
}*/


const startServer = async () => {
  try {
    await initDatabase();
    await new Promise((resolve, reject) => {
        //httpServer.listen({port: 5000, host: "0.0.0.0"});
        fastify.listen(5000);
      //httpServer.once("error", reject);
      //httpServer.listen(5000, "0.0.0.0", () => {
        //console.log("Listening on http://localhost:5000");
        //resolve();
     // });
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();





/*

const startServer = async () => {
    try {
      await initDatabase();
 
  
      await new Promise((resolve, reject) => {
        httpServer.once("error", reject);
        httpServer.listen(5000, () => {
          console.log("✅ Server listening on http://localhost:5000");
          resolve();
        });
      });
    } catch (err) {
      console.error("❌ Error starting server:", err);
      process.exit(1);
    }
  };*/










