export default class Ball {
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.radius = 10;
    this.reset(); 
  
 this.x = this.canvasWidth / 2;
  this.y = this.canvasHeight / 2;

    //console.log("checking x & y at ball", this.x, this.y);
    this.ballSpeedX = 3;
    this.ballSpeedY = 3;

  }

  reset() {
this.x = this.canvasWidth / 2;
this.y = this.canvasHeight / 2;

   // const speed = 4;
    //this.vx = Math.random() > 0.5 ? speed : -speed;
    //this.vy = Math.random() > 0.5 ? speed : -speed;
    //console.log("checking x & y at ball at reset", this.x, this.y);
  }

  update(paddleYA, paddleYB, paddleWidth, paddleHeight) {
    this.x += this.ballSpeedX;
    this.y += this.ballSpeedY;
  
    if (
      this.x  <= paddleWidth &&
      this.y > paddleYA - 50 &&
      this.y < paddleYA + paddleHeight - 50
    ) {
      this.ballSpeedX *= -1;

    } else if (
    
      this.x + this.radius >= this.canvasWidth - paddleWidth - 10 &&
      this.y > paddleYB &&
      this.y < paddleYB + paddleHeight
    ) {  
      this.ballSpeedX *= -1;
    } 
    else if (this.y <= 0) {
      this.ballSpeedY *= -1;
    } else if (this.y >= this.canvasHeight) {
      this.ballSpeedY *= -1;
    } else if (this.x < 0 || this.x >= this.canvasWidth) {
      console.log(this.x, "...", this.y);
      //console.log("POOOOOIIIIIINT!!!!!!!!! 👑👑👑👑👑👑");
      this.reset();
    }
}

   

  serialize() {
    return {
      ballX: this.x,
      ballY: this.y,
      ballSize: this.radius
    };
  }
}
