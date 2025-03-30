import Fastify from "fastify";
import cors from '@fastify/cors';
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import {open} from 'sqlite';
import {matchRepo} from 'matchRepo'
import bcrypt from "bcryptjs";
import { createServer } from 'http';
import SocketGateway from './match/infrastructure/WebSocket/SocketGateway.js'
import Match from "./match/domain/entities/Match.js";
import {v4 as uuid} from 'uuid';
import matchRepo from 'matchRepo'
import http from 'http';
import {io} from "./match/infrastructure/WebSocket/SocketGateway.js"
import { initDbMatches } from "./initRepo.js";


dotenv.config();

const fastify = Fastify();
fastify.register(cors);
const httpServer = createServer(fastify.server);
const socketGateway = new SocketGateway(httpServer);

await initDbMatches();

const db = new sqlite3.Database("./trans_backend.db", (err) => {
    if (err) console.log("Error in the back: ", err);
    else console.log("Connected to the database!");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL)`);



fastify.post("/api/match/yourInviteGotAccepted", async (req, reply) => {

    try{

        const {yourId, yourNickname, oponnentId, oponnentNickname} = req.body;

        const match = new Match(uuid());

        match.createPlayer(yourId, yourNickname, false);
        match.createPlayer(oponnentId, oponnentNickname, false);
        match.startMatch(io);

        await matchRepo.save(match);

        return reply.status(200).send({message: "Match successfully created", matchId: match.id});
        

    } catch(err)
    {
        console.log("error at /api.natch/yourInviteGotAccepted", err);
        return reply.status(400).send({message: err});
    }
   

})

fastify.post("/api/register", async (request, reply) => {
    console.log("check 27");
    console.log(request.body);
    console.log("check 29");
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

const startServer = async () => {

    try {
        await new Promise((resolve, reject) => {
            httpServer.once("error", reject);

            httpServer.listen(5000, () => {
                console.log("server is listening on http://localhost:5000");
                resolve();
            });
        })

    } catch (err) {
        console.error("errror caught", err);
        fastify.log.error(err)
        process.exit(1);
    }
};



startServer();
export {io};

