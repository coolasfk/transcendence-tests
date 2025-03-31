
import PlayerAi from "../entities/PlayerAi.js";
import PlayerHuman from "../entities/PlayerHuman.js";
import Ball from "./Ball.js";


export default class Pong 
{
    constructor(width, height, playerA_id, playerB_id, nicknameA, nicknameB, isAi)
    {
        this.width = width;
        this.height = height;

        this.playerA = new PlayerHuman(playerA_id, nicknameA);

        this.playerB = isAi ? new PlayerAi(playerB_id, null) : new PlayerHuman(playerB_id, nicknameB);


        this.ball = new Ball(width, height);


        
    }


    update()
    {
        this.playerA.paddle.update();
        this.playerB.paddle.update();

        this.ball.update();

        [this.playerA.paddle, this.playerB.paddle].forEach((paddle) => {
            if(this.ball.checkPaddleCollision(paddle))
                this.ball.vx *= -1;
        })
    }

    movePaddle(playerId, direction)
    {
        const paddle = this.getPaddle(playerId);
        if(!paddle) return;

        if(direction === 'up') paddle.moveUp();
        else if(direction === 'down') paddle.moveDown();
        else paddle.stop();
    }

    stopPaddle(playerId)
    {
        const paddle = this.getPaddle(playerId);
        if(paddle) paddle.stop();
    }

    didScoreLeft()
    {

        return this.ball.isOutRight();
    }

    didScoreRight()
    {

        return this.ball.isOutLeft();
    }

    resetBall()
    {
        return this.ball.reset();
    }


    serialize()
    {
        return {
            ball: this.ball.serialize(),
            leftPaddleY: this.playerA.paddle.y,
            rightPaddleY: this.playerB.paddle.y
        }
    }
}