export default class Ball {
    constructor(width, height) {
      this.canvasWidth = width;
      this.canvasHeight = height;
  
      this.radius = 10;
      this.reset();
    }
  
    reset() {
      this.x = this.canvasWidth / 2;
      this.y = this.canvasHeight / 2;
  
      const speed = 4;
      this.vx = Math.random() > 0.5 ? speed : -speed;
      this.vy = Math.random() > 0.5 ? speed : -speed;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.y - this.radius <= 0 || this.y + this.radius >= this.canvasHeight) {
        this.vy *= -1;
      }
    }
  
    checkPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) {
      return (
        this.x - this.radius < paddleX + paddleWidth &&
        this.x + this.radius > paddleX &&
        this.y > paddleY &&
        this.y < paddleY + paddleHeight
      );
    }
  
    isOutLeft() {
      return this.x + this.radius < 0;
    }
  
    isOutRight() {
      return this.x - this.radius > this.canvasWidth;
    }
  
    serialize() {
      return {
        ballX: this.x,
        ballY: this.y,
        ballSize: this.radius
      };
    }
  }
  