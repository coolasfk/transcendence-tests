
/*
////🟢 ➜➜➜➜➜➜➜➜➜
matchmakingstore is an object
it's a map in which we store entire match objects
it works as a wrapper around this map with matches
it contains all the states, logic, entire matches

*/





export const matchMakingStore = {
    matches: new Map(),

    save(match) {
        console.log("🎃👻🍬🦇💀🧡 saving match into the store, match ID:", match.matchId);
        this.matches.set(match.matchId, match);
    },

    findById(id)
    {
        console.log("🎃👻🍬🦇💀🧡  MatchMaking Store findById trying to return matchId ", id);
        return this.matches.get(id);
    },

    delete(id)
    {
       return this.matches.delete(id);  
    },

    findAll()
    {
        return Array.from(this.matches.values());
    }      
};