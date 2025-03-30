export default class Ball
{
    constructor(height, width)
    {
        this.width = width;
        this.height = height;
        this.ball = {
            ballX: width/2,
            ballY: height/2,
            ballSpeedX: 4,
            ballSpeedY: 15,
            ballSize,
        };

        update(playerA, playerB)
        {
            let b = this.ball;

            b.ballX += b.ballSpeedX;
            b.ballY += b.ballSpeedY;

            if(b.ballY <= 0 || b.ballY + ballSize >= this.height)
                ballSpeedY *= -1;

            if(b.ballX <= 0 + ballSize && !playerA.paddleHit)
            {
                match.updateScore(playerB);
                console.log("Player b gets a point");

                ballX = width/2;
                ballY = height/2; 
            } else if (b.ballX + ballSize >= this.width ){
                match.updateScore(playerA);
                console.log("Player a gets a point");

                ballX = width/2;
                ballY = height/2; 
            }
        }
    }
}
