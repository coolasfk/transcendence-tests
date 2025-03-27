


import Pong from '../valueObjects/Pong.js'
import PlayerAi from './PlayerAi'
import PlayerHuman from './PlayerHuman'


export default class Match {
    constructor(idA)
    {
        this.idA = idA;
        this.idB = null;  /// we have to invite the user, or click on start ai

        this.playerA = null;
        this.playerB = null;
        this.pong = null;
        this.isAi = false;
        
        this.finalScoreA = 0;
        this.finalScoreB = 0;
        this.status = 'default';
        this.statusArray = ['default',  'pending', 'launching', 'ongoing', 'finished'];
        this.winner = null;
        this.date = null;
    }

    ////sending invitation to the user: when clicking on the send invitation to 
    //the user in the front we take the id of the person we are inviting;
    sendGameInvitation()
    {
        this.status = this.statusArray[1]; //pending

    }

    acceptGameInvitation()
    {
        this.status = this.statusArray[3]; //launching

        
    }

    declineInvitation()
    {
        this.status = this.statusArray[0]; //default
    }

    cancelMatch()
    {
        this.status = this.statusArray[0]; // default
        /// should i reset all the scores here ?
    }

    createPlayer(id, isAi)
    {

        /// nickname should be taken from the front
        const player = isAi ? new PlayerAi : new PlayerHuman(id, nickname);

        if(!this.playerA) this.playerA = player;
        else if(!this.playerB) this.playerB = player;
        else throw new Error("Match has already two players");


    }

    startMatch()
    {

        /*
        - open the socket
        - launch prompts to get the nicknames for the players
        - create players
        - create pong 

        - if this is a match with ai, launch this ai thing ( i will add code later)

        - launch game loop and pass variables from the pong (use?)
        - keep updating the scores throughhout the game
        - save final data to the data base
        - destroy pong and the socket and reset the variables
    

        
        
        
        */
        this.date = new Date();
        this.createPlayer(id, false); 
        this.createPong(this.playerA, this.playerB, this.isAi);
        this.status = 'active';
    }

    createPong()
    {
        this.pong = new Pong();
    }

    finishMatch(winnerId)
    {
        this.status = this.statusArray[5];
        this.winner = winnerId;
        eventBus.publish("match.finished", this.serialize()); 
    }

    updateScore(playerId)
    {
        if(!this.playerA || !this.playerB) return;

        if(playerId === this.playerA.id)
            this.finalScoreA++;
        if(playerId === this.playerB.id)
            this.finalScoreB++;
        
        if(this.finalScoreB >= 5) 
        {
            this.finishMatch(this.playerB.id);
        }
        else if(this.finalScoreA >= 5)
        {
            this.finishMatch(this.playerA.id);
        } 

    }

    updateDatabase()
    {
        //send the info about the game to the database: date, winner, scoreA, scoreB
    }

    serialize()
    {
        return {
            id: this.id,
            date: this.date,
            status: this.status,
            playerA: this.playerA ? this.playerA.serialize() :null,
            playerB: this.playerB ? this.playerB.serialize() : null,
            scores: {
                A: this.finalScoreA,
                B: this.finalScoreB,
            },
            winner: this.winner,
            pong: this.pong ? this.pong.serialize() : null,
        }
    }
}