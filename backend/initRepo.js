import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;


export const initDatabase = async () => {
  db = await open({
    filename: './src/shared/data/trans_backend.db',
    driver: sqlite3.Database,
  });



  await db.exec(`
    CREATE TABLE IF NOT EXISTS matches (
      matchId TEXT PRIMARY KEY,
      userA_id TEXT,
      userB_id TEXT,
      scoreA INTEGER,
      scoreB INTEGER,
      winnerId TEXT,
      date TEXT
    );
  `);

  console.log("✔✔✔ Database initialized with users & matches tables");
  return db;
};

export const getDb = () => {
  if (!db) throw new Error("DB not initialized");
  return db;
};
