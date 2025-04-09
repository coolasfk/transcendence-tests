export const matchMakingStore = {
    matches: new Map(),

    save(match) {
        console.log("🎃👻🍬🦇💀🧡 saving match into the store");
        console.log("📦 Saving match ID:", match.matchId);
        this.matches.set(match.matchId, match);
    },

    findById(id)
    {
        console.log("-----🧪 Checking store for match ID:", id);
        console.log("----🗃️ All stored IDs:", Array.from(this.matches.keys()));
        console.log("returning match 🔥🔥🔥 yes ", id);
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