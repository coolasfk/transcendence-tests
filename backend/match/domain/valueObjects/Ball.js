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
      this.y > paddleYA &&
      this.y < paddleYA + paddleHeight
    ) {
      this.ballSpeedX *= -1;

    } else if (
      // Changed from "paddleX - paddleWidth" to just "paddleX" so collision works correctly
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
      console.log("POOOOOIIIIIINT!!!!!!!!! 👑👑👑👑👑👑");
      this.reset();
    }
}

      //this.ballSpeedX *= -1;
 


    //console.log("checking x & y at update", this.x, this.y);
  //}
/*
  checkPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) { 
  console.log("++++++++++checking collisions at checking collisions at ball++++++++");
    return (

      this.x - this.radius < paddleX + paddleWidth &&
      this.x + this.radius > paddleX &&
      this.y > paddleY &&
      this.y < paddleY + paddleHeight

     
    );
  }

  isOutLeft() {
    console.log("checking x & y at is left out at balls", this.x, this.y);
    return this.x + this.radius < 0;
  }

  isOutRight() {
    console.log("checking x & y at ball at is out right at balls", this.x, this.y);
    return this.x - this.radius > this.canvasWidth;
  }*/

  serialize() {
    return {
      ballX: this.x,
      ballY: this.y,
      ballSize: this.radius
    };
  }
}
