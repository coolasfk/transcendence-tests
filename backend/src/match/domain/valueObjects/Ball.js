export default class Ball {
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.radius = width/110;
    this.reset(); 


    //console.log("checking x & y at ball", this.x, this.y);
    //// very small speed now for debugging. then lets change this to ~width/300
    this.ballSpeedX = width/900;
    this.ballSpeedY = width/900;
    this.scoreA = 0;
    this.scoreB = 0;

  }

  reset() {
  this.x = this.canvasWidth / 2;
  this.y = this.canvasHeight / 2;
  }

  update(paddleYA, paddleYB, paddleWidth, paddleHeight) {
    this.x += this.ballSpeedX;
    this.y += this.ballSpeedY;
  
    if (
      this.x  <= paddleWidth + this.canvasWidth/100 &&
      this.y - this.radius/2 > paddleYA &&
      this.y - this.radius/2 < paddleYA + paddleHeight
    ) {
      this.ballSpeedX *= -1;
    } else if (
    
      this.x + this.radius >= this.canvasWidth - paddleWidth - this.canvasWidth/100 &&
      this.y  > paddleYB &&
      this.y < paddleYB + paddleHeight + this.canvasWidth/300
    ) {  
      this.ballSpeedX *= -1;
    } 
    else if (this.y <= 0) {
      this.ballSpeedY *= -1;
    } else if (this.y >= this.canvasHeight) {
      this.ballSpeedY *= -1;
    } else if (this.x < 0) {
      this.scoreB += 1;
      this.reset();
    } else if (this.x >= this.canvasWidth)
    {
      this.scoreA += 1;
      this.reset();

    }

    //console.log("🎾🎾🎾 Ball class: update, logging the score", this.scoreA, "  ", this.scoreB);
}


  serialize() {
    return {
      ballX: this.x,
      ballY: this.y,
      ballSize: this.radius
    };
  }
}
