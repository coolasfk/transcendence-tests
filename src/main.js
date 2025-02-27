/* main.js */
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const [startBtn, resetBtn] = document.querySelectorAll("button");

canvas.width = 600;
canvas.height = 480;

/* Game Objects */
const paddleHeight = 60;
const paddleWidth = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;


const ball = {
  ballSize: 8,
  ballX: canvas.width / 2,
  ballY: canvas.height / 2,
  ballSpeedX: 3,
  ballSpeedY: 3,
}


/* Movement Keys */
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;
let gameOn = false;

/* Draw Paddles, Ball, etc. */
function drawPaddle(x, y) {
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
ctx.arc(ball.ballX, ball.ballY, ball.ballSize , 0, Math.PI * 2);
ctx.fill();
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Left paddle
  ctx.fillStyle = "white";
  drawPaddle(10, leftPaddleY);

  // Right paddle
  drawPaddle(canvas.width - paddleWidth - 10, rightPaddleY);

  // Ball
  drawBall();
}

/* Update positions */
function updatePositions() {
  // Move left paddle
  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= 4;
  } else if (sPressed && leftPaddleY < canvas.height - paddleHeight) {
    leftPaddleY += 4;
  }

  // Move right paddle
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
    console.log("lost")
    resetPositions(); 
  }
}

function gameLoop() {
  if (gameOn) {
    console.log("Game loop running");
    updatePositions();
    drawScene();
    requestAnimationFrame(gameLoop);
  }
}

function startGame() {
  if (!gameOn) {
    gameOn = true;
    gameLoop();
  }
}

function resetGame() {
  gameOn = false;
  resetPositions();
  drawScene();
}

function resetPositions() {
  leftPaddleY = (canvas.height - paddleHeight) / 2;
  rightPaddleY = (canvas.height - paddleHeight) / 2;
  ball.ballX = canvas.width / 2 - ball.ballSize / 2;
  ball.ballY = canvas.height / 2 - ball.ballSize / 2;
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
