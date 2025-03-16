
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");


width = window.innerWidth * 0.9;

function resizeCanvas() {


  canvas.width = width; 
  canvas.height = width * (9 / 16); 

  resetPositions();
  drawScene();
}




//ctx.fillStyle = "#272838";
ctx.clearRect(0, 0, canvas.width, canvas.height);

//ctx.fillRect(0, 0, canvas.width, canvas.height);

const paddleHeight = width * (9/16) * 0.13;
const paddleWidth = width * (9/16) * 0.016 ;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;


const ball = {
  ballSize: 15,
  ballX: canvas.width / 2,
  ballY: canvas.height / 2,
  ballSpeedX: 3,
  ballSpeedY: 3,
}



let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;
let gameOn = false;

/*-------------------------------------------- functions -----------------------------------------------------------------*/



let drawPaddle = (x, y) =>
{
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

let drawBall = () => {
  ctx.beginPath();
ctx.arc(ball.ballX, ball.ballY, ball.ballSize , 0, Math.PI * 2);
ctx.fillStyle = "#800517";
ctx.fillStyle = "#305cde";
ctx.fill();
}

let  drawScene = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillStyle = "#272838";
  //ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  drawPaddle(10, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth - 10, rightPaddleY);
  rectangleMiddle = ctx.fillRect(width/2 - 2, 0, 4, width * (9/16));
  drawBall();
}

let updatePositions = () => {
  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= 4;
  } else if (sPressed && leftPaddleY < canvas.height - paddleHeight) {
    leftPaddleY += 4;
  }
  if (upPressed && rightPaddleY > 0) {
    rightPaddleY -= 4;
  } else if (downPressed && rightPaddleY < canvas.height - paddleHeight) {
    rightPaddleY += 4;
  }

  // Move ball
  ball.ballX += ball.ballSpeedX;
  ball.ballY += ball.ballSpeedY;

  // Bounce on top/bottom walls
  if (ball.ballY <= 0 || ball.ballY + ball.ballSize >= canvas.height) {
    ball.ballSpeedY = -ball.ballSpeedY;
  }

  // Check collision with left paddle
  if (
    ball.ballX <= 20 &&
    ball.ballY + ball.ballSize >= leftPaddleY &&
    ball.ballY <= leftPaddleY + paddleHeight
  ) {
    console.log("left paddle defended")
    ball.ballSpeedX = -ball.ballSpeedX;
  }

  if (
    ball.ballX + ball.ballSize >= canvas.width - 20 &&
    ball.ballY + ball.ballSize >= rightPaddleY &&
    ball.ballY <= rightPaddleY + paddleHeight
   
  ) { 
    console.log("right paddle defended")
    ball.ballSpeedX = -ball.ballSpeedX;
  }
  if (ball.ballX < 0 || ball.ballX > canvas.width) {
    console.log("LOST");
      resetPositions(); 
      resetGame();
      setTimeout(()=>{
        startGame();
      }, 2000);

    
  }
}


let gameLoop= () =>{
  if (gameOn) {
    updatePositions();
    drawScene();
    requestAnimationFrame(gameLoop);
  }
}

let startGame = () => {
  if (!gameOn) {
    gameOn = true;   
    gameLoop();


  }
}

let resetGame = () =>{
  gameOn = false;
  resetPositions(); 
  drawScene();


}

let resetPositions = () => {
  console.log("resetting the positions");
  leftPaddleY = (canvas.height - paddleHeight) / 2;
  rightPaddleY = (canvas.height - paddleHeight) / 2;
  ball.ballX = canvas.width / 2;
  ball.ballY = canvas.height / 2;
  ball.ballSpeedX = Math.random() > 0.5 ? 3 : -3;
  ball.ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

/*------------- Event Listeners */

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
  if (e.key === "w" || e.key === "W") wPressed = true;
  if (e.key === "s" || e.key === "S") sPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
  if (e.key === "w" || e.key === "W") wPressed = false;
  if (e.key === "s" || e.key === "S") sPressed = false;
});

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

drawScene();

window.addEventListener("resize", resizeCanvas);
resizeCanvas();