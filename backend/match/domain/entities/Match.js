


import Pong from '../valueObjects/Pong.js'
import EventBus from '../../infrastructure/EventBus.js';
import GameEngine from '../../infrastructure/GameEngine.js';
import SocketGateway from '../../infrastructure/WebSocket/SocketGateway.js'


export default class Match {
    constructor(matchId, userId, userNickname, oponnentId, oponnentNickname)
    {
        this.matchId = matchId;
        this.userId = userId;
        this.oponnentId = oponnentId;
        this.userNickname = userNickname;
        this.oponnentNickname = oponnentNickname;

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
        io.to(this.playerA.id).socketsJoin(this.playerA.id);
        io.to(this.playerB.id).socketsJoin(this.playerB.id);
        this.date = new Date();
        this.createPong();
        this.status = this.STATUS.ONGOING;
    }

    createPong()
    {
        this.pong = new Pong(this.width, this.height);
    }


    getPlayerById(id)
    {
        if(this.playerA?.id === id)
            return this.playerA;
        else if(this.playerB?.id === id)
            return this.playerB;
        return null;
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


    serializeForDb()
    {
        return {
            userA_id: this.pong.playerA.id,
            userB_id: this.pong.playerB.id,
            scoreA: this.pong.finalScoreA,
            scoreB: this.pong.finalScoreB,
            winnerId: this.pong.getWinnerId(),
            date: this.date,
        }
    }

    destroy()
        {
            this.engine?.stop();
            this.engine = null;
            this.pong = null;
            this.playerA = null;
            this.playerB = null;
            this.status = this.STATUS.DEAFULT; ///or finished ???
        }
}