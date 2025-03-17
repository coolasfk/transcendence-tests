import Fastify from "fastify";
import cors from '@fastify/cors';
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const fastify = Fastify();
fastify.register(cors);



const db = new sqlite3.Database("./trans_backend.db", (err) => {
    if(err) console.log("Error in the back: ", err );
    else console.log ("Connected to the database!");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL)`);

console.log("check 24");
fastify.post("/api/register", async (request, reply) => {
    console.log("check 27");
    console.log(request.body);
    console.log("check 29");
    const {nickname, email, password} = request.body;

    if(!nickname || !email || !password)
    {

        return reply.status(400).send({message: "Missing important information!"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    /// ?? prevents database from hack attacks! otherwise hacker could just inject some code into sql query and by adding
    /// --- make the rest of the code not valid, bypassing security, and making a password an sql command. internally, 
    /// sqlite converts it in the background  to password and email
    db.run("INSERT INTO users (nickname, email, password) VALUES (?,?,?)", [nickname, email, hashedPassword], (err) => {
        if(err)
        {
            console.log("err: ", err);
            if(err.code == 'SQLITE_CONSTRAINT')
            {
                return reply.status(400).send({message: "Email already in the database!"});
            }

            return reply.status(500).send({message: err});
        }
        return reply.status(200).send({message: "User successfully added to database!"});
    });
});


fastify.get('/', async (req, reply) => {
    console.log("req.body: ", req.body);
    reply.status(200).send({message: 'placeholder'});
})


const startServer = async () => {

 
try{
    await fastify.listen({ port: 5000 });
    console.log("Hurray server listening port 5000!");


} catch (err)
{
    console.log("errror caught", err);
    fastify.log.error(err)
    process.exit(1);
}
};

startServer();

