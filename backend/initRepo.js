import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

let db = null;

export const initDbMatches = async () => {
    db = await open({
        filename: './data/matches.db',
        driver: sqlite3.Database,

    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        userA_id TEXT,
        userB_id TEXT,
        scoreA INTEGER,
        scoreB INTEGER,
        winnerId TEXT,
        date TEXT
        );
    `);
    return db;
}

export const getDb = () => {
    if(!db) throw new Error ('DB not initialized');
    return db;
}
