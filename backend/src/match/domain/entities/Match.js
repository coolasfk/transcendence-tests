


import Pong from '../valueObjects/Pong.js'
import { matchRepo } from '../../infrastructure/matchRepo.js';

export default class Match {
    constructor(width, height, matchId, userId, userNickname, oponnentId, oponnentNickname, isAi)
    {
        this.matchId = matchId;
        this.userId = userId;
        this.oponnentId = oponnentId;
        this.userNickname = userNickname;
        this.oponnentNickname = oponnentNickname;
        this.isAi = isAi;
        this.winner = null; //// add logic for the winner
        this.width = width;
        this.height = height;
        this.pong = this.createPong();
        this.status = 'default';
        this.STATUS = {
            DEFAULT: 'default',
            PENDING: 'pending',
            LAUNCING: 'launching',
            ONGOING: 'ongoing',
            FINISHED: 'finished',
        };

        this.date = null;
        console.log("checking width and height at MATCH", width, height);
        
    }

    ////sending invitation to the user: when clicking on the send invitation to 
    //the user in the front we take the id of the person we are inviting;
    sendGameInvitation()
    {
        this.status = this.STATUS.PENDING;
    }

    acceptGameInvitation()
    {
        this.status = this.STATUS.LAUNCING;    
    }

    declineInvitation()
    {
        this.status = this.STATUS.DEFAULT;
    }

    cancelMatch()
    {
        this.status = this.STATUS.DEFAULT;
    }
    createPong()
    {
        console.log("----- creating pong at createPong at Match")

        try {

            console.log("checking parameters at create Match: ", this.width, this.height, this.userId, this.oponnentId,  this.userNickname, this.oponnentNickname, this.isAi);
            const pong = new Pong(this.width, this.height, this.userId, this.oponnentId,  this.userNickname, this.oponnentNickname, this.isAi); 
            return pong;
        } catch(e)
        {
            console.log("xxxxxxx  errorrr creating pong::: ", e);
            return null;


        }
       
    }

    serializeForDb()
    {
        return {
            matchId: this.matchId,
            userA_id: this.userId,
            userB_id: this.oponnentId,
            scoreA: this.pong.ball.scoreA,
            scoreB: this.pong.ball.scoreB,
            winnerId: this.winner,
            date: this.date,
        }
    }

    async finishMatch(winnerId)
    {
        console.log("Finishing the match");
        console.log("is instance of Match:", this instanceof Match);
        ///save the match to the database
       
        this.winner = winnerId;
        console.log("Match: finishMatch, winner: ", this.winner);
        await matchRepo.save(this); 
        this.status = this.STATUS.FINISHED;
        this.destroy();

    }




    destroy()
        {
  
            this.pong = null;
            this.engine.stop();
            this.engine = null;

            this.status = this.STATUS.DEFAULT; ///or finished ???
        }
}