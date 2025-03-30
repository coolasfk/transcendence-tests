import { getDb } from "./initRepo";
import match from "./match/domain/entities/Match.js"




export const matchRepo = {

    async save(match) {
        const db = getDb();
        const data = match.serializeForDb();
        await db.run(
            `INSERT INTO matches (id, userA_id, userB_id, scoreA, scoreB, winnerId, date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
            scoreA = excluded.scoreA,
            scoreB = excluded.scoreB,
            winnerId = excluded.winnerId,
            date = excluded.date`,   
            
            data.id,
            data.userA_id,
            data.userB_id,
            data.scoreA,
            data.scoreB,
            data.winnerId,
            data.date.toISOString()
        );
    },

    async findById(id) {
        const db = getDb();
        return await db.get(`SELECT * FROM matches WHERE id = ?`, id);
    },

    async delete(id)
    {
        const db = getDb();
        return await db.run(`DELETE FROM matches WHERE id = ?`, id);
    },
    async findAll()
    {
        const db = getDb();
        return await db.get(`SELECT * FROM matches ORDER BY date DESC`)
    },

    async findUserId(userId) {
        const db = getDb();
        return await db.all(
            `SELECT * FROM matches WHERE userA_id = ? OR userB_id = ?`,
            userId,
            userId

        )
    }

}