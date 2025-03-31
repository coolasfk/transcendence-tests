


import Pong from '../valueObjects/Pong.js'
import EventBus from '../../infrastructure/EventBus.js';

export default class Match {
    constructor(matchId, userId, userNickname, oponnentId, oponnentNickname, isAi)
    {
        this.matchId = matchId;
        this.userId = userId;
        this.oponnentId = oponnentId;
        this.userNickname = userNickname;
        this.oponnentNickname = oponnentNickname;
        this.isAi = isAi;

        this.pong = null;
        this.status = 'default';
        this.STATUS = {
            DEAFULT: 'default',
            PENDING: 'pending',
            LAUNCING: 'launching',
            ONGOING: 'ongoing',
            FINISHED: 'finished',
        };

        this.date = null;
        this.width = 1280;
        this.height = 720;
    }

    ////sending invitation to the user: when clicking on the send invitation to 
    //the user in the front we take the id of the person we are inviting;
    sendGameInvitation()
    {
        this.status = this.STATUS.PENDING;
        EventBus.publish("game_invitation_sent", {matchId: this.id, oponnentId: this.opponentId});
    }

    acceptGameInvitation()
    {
        this.status = this.STATUS.LAUNCING;    
    }

    declineInvitation()
    {
        this.status = this.STATUS.DEAFULT;
    }

    cancelMatch()
    {
        this.status = this.STATUS.DEAFULT;
    }

    /*

    createPlayer(id, nickname, isAi)
    {

        const player = isAi ? new PlayerAi("ai-"+ Math.floor(Math.random() * 10000)) : new PlayerHuman(id, nickname);

        if(!this.playerA) this.playerA = player;
        else if(!this.playerB) this.playerB = player;
        else throw new Error("Match has already two players");


    }*/


    startMatch(io)
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

        this.createPong()
        io.to(this.userId).socketsJoin(this.userId);
        io.to(this.oponnentId).socketsJoin(this.oponnentId);
        this.date = new Date();
        this.createPong();
        this.status = this.STATUS.ONGOING;
    }

    createPong()
    {
        this.pong = new Pong(this.width, this.height, this.userId, this.oponnentId,  this.userNickname, this.oponnentNickname, this.isAi);
    }



    finishMatch(winnerId)
    {
        this.status = this.STATUS.FINISHED;
        this.winner = winnerId;
        EventBus.publish("match_finished", this.serializeForDb()); 
        this.destroy();

    }

    updateScore(playerId)
    {
        if(!this.playerA || !this.playerB) return;

        if(playerId === this.pong.playerA)
            this.finalScoreA++;
        if(playerId === this.pong.playerB)
            this.finalScoreB++;
        
        if(this.finalScoreB >= 5) 
        {
            this.finishMatch(this.pong.playerB);
        }
        else if(this.finalScoreA >= 5)
        {
            this.finishMatch(this.pong.playerA);
        } 

    }


    serializeForDb()
    {
        return {
            matchId: this.matchId,
            userA_id: this.pong.userId,
            userB_id: this.pong.oponnentId,
            scoreA: this.pong.finalScoreA,
            scoreB: this.pong.finalScoreB,
            winnerId: this.pong.finalScoreA > this.pong.finalScoreB ? this.pong.finalScoreA : this.pong.finalScoreB,
            date: this.date,
        }
    }

    destroy()
        {
  
            this.pong = null;

            this.status = this.STATUS.DEAFULT; ///or finished ???
        }
}