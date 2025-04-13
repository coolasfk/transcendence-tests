import { matchId } from "../../../../frontend_to_test_game/src/main.js";
import { getDb } from "../../../initRepo.js";




export const matchRepo = {

    async save(match) {
        console.log("🤝 saving match in the database");
        const db = getDb();
        const data = match.serializeForDb();
        console.log("trying to save the data: ", data);
        await db.run(
            `INSERT INTO matches (matchId, userA_id, userB_id, scoreA, scoreB, winnerId, date)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(matchId) DO UPDATE SET
               scoreA = excluded.scoreA,
               scoreB = excluded.scoreB,
               winnerId = excluded.winnerId,
               date = excluded.date`,
            [
              data.matchId,
              data.userA_id,
              data.userB_id,
              data.scoreA,
              data.scoreB,
              data.winnerId,
              data.date.toISOString()
            ]
          );
    },

    async findById(matchId) {
        const db = getDb();
        return await db.get(`SELECT * FROM matches WHERE matchId = ?`, matchId);
    },

    async delete(matchId)
    {
        const db = getDb();
        return await db.run(`DELETE FROM matches WHERE matchId = ?`, matchId);
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
            userId

        )
    },

}