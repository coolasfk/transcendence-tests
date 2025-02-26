/* main.js */
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

/* Game Objects */
const paddleHeight = 60;
const paddleWidth = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

/* Movement Keys */
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;
let gameRunning = false;

/* Draw Paddles, Ball, etc. */
function drawPaddle(x, y) {
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
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
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce on top/bottom walls
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check collision with left paddle
  if (
    ballX <= 20 &&
    ballY + ballSize >= leftPaddleY &&
    ballY <= leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check collision with right paddle
  if (
    ballX + ballSize >= canvas.width - 20 &&
    ballY + ballSize >= rightPaddleY &&
    ballY <= rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check left/right walls (reset ball or do scoring)
  if (ballX < 0 || ballX > canvas.width) {
    resetPositions(); 
  }
}

function gameLoop() {
  if (gameRunning) {
    updatePositions();
    drawScene();
    requestAnimationFrame(gameLoop);
  }
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gameLoop();
  }
}

function resetGame() {
  gameRunning = false;
  resetPositions();
  drawScene();
}

function resetPositions() {
  leftPaddleY = (canvas.height - paddleHeight) / 2;
  rightPaddleY = (canvas.height - paddleHeight) / 2;
  ballX = canvas.width / 2 - ballSize / 2;
  ballY = canvas.height / 2 - ballSize / 2;
  ballSpeedX = Math.random() > 0.5 ? 3 : -3;
  ballSpeedY = Math.random() > 0.5 ? 3 : -3;
}

/* Event Listeners */
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

/* Hook buttons (assuming same order as in HTML) */
const [startBtn, resetBtn] = document.querySelectorAll("button");
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

/* Initial draw */
drawScene();
