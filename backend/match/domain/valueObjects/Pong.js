
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
        console.log("player a paddle: ", this.playerA.paddle);


        this.playerB = isAi ? new PlayerAi(playerB_id, null) : new PlayerHuman(playerB_id, nicknameB);



        console.log("checking width and height at PONG", this.width, this.height);

        this.ball = new Ball(this.width, this.height);


        
    }


    update()
    {
        this.playerA.paddle.update();
        this.playerB.paddle.update();
        //console.log(this.playerA.id);
        //console.log(this.playerB,id);

        this.ball.update();

        [this.playerA.paddle, this.playerB.paddle].forEach((paddle) => {
            if(this.ball.checkPaddleCollision(paddle))
                this.ball.ballSpeedX *= -1;
        })
    }

    movePaddle(playerId, up, down)
    {
        console.log("MOve paddle at pong::: 🙆🙆trying to update the Paddle");
        let paddle;
        if(playerId === this.playerA_id)
            paddle = this.playerA.paddle;
        else if(playerId === this.playerB_id)
            paddle = this.playerB.paddle;
        else console.log("we have a problem with player undefined at move paddle PONG ")


        if(!paddle) 
        {
            console.log("🚒🚒🚒 paddle does not exists");
            return;
        }
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
            ballX: this.ball.x,
            ballY: this.ball.y,
            ballSize: this.ball.radius,
            leftPaddleY: this.playerA.paddle.y,
            rightPaddleY: this.playerB.paddle.y
        }
    }
}