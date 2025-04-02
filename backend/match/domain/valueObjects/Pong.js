
import PlayerAi from "../entities/PlayerAi.js";
import PlayerHuman from "../entities/PlayerHuman.js";
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";


export default class Pong 
{
    constructor(width, height, playerA_id, playerB_id, nicknameA, nicknameB, isAi)
    {
        this.width = width;
        this.height = height;

        this.playerA_id = playerA_id;
        this.playerB_id = playerB_id;

        this.playerA = new PlayerHuman(playerA_id, nicknameA);


        this.playerB = isAi ? new PlayerAi(playerB_id, null) : new PlayerHuman(playerB_id, nicknameB);


        this.ball = new Ball(width/2, height/2);


        
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

    movePaddle(playerId, up, down)
    {
        console.log("MOve paddle at pong::: 🙆🙆trying to update the Paddle");
        let paddle;
        if(playerId === this.playerA_id)
            paddle = this.playerA.paddle;
        if(playerId === this.playerB_id)
            paddle = this.playerB.paddle;


        if(!paddle) return;

        if(up) paddle.moveUp();
        else if(down) paddle.moveDown();
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