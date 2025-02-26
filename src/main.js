import "./style.css";
// Select canvas
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle properties
const paddleHeight = 100;
const paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 10;

// Update game objects
const update = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top/bottom
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Ball collision with paddles
  if (
    ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballX >= canvas.width - paddleWidth &&
    ballY >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Ball out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    resetBall();
  }

  // AI Paddle movement (follows ball)
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.1;
};

// Draw everything
const draw = () => {
  // Clear screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "white";
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();
};

// Reset ball after scoring
const resetBall = () => {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
};

// Game loop using `requestAnimationFrame`
const gameLoop = () => {
  update();
  draw();
  requestAnimationFrame(gameLoop);
};

// Event listener for player movement
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && playerY > 0) playerY -= paddleSpeed;
  if (e.key === "ArrowDown" && playerY < canvas.height - paddleHeight) playerY += paddleSpeed;
});

// Start game loop after page loads
window.onload = () => {
  gameLoop();
};
