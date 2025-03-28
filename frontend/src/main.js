import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
  const userId = Math.floor(Math.random() * 1000000);
  console.log("User ID:", userId);
export const initGame = () => {
  console.log("Initializing the game...");

  const nickname = prompt("Type your nickname:");
  if (!nickname || nickname.length < 2) {
    alert("Nickname too short!");
    return;
  }



  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const startAiGameBtn = document.getElementById("startAiGameBtn");

//-------------------------------------

  let width = window.innerWidth * 0.9;
  canvas.width = width;
  canvas.height = width * (9 / 16);

  const paddleHeight = canvas.height * 0.13;
  const paddleWidth = canvas.height * 0.016;

  let leftPaddleY = 0;
  let rightPaddleY = 0;
  let ball = { ballX: 0, ballY: 0, ballSize: 15 };

//---------------------------------------------


 /// emitting events to the back
  const movePaddleUp = () => {
    socket.emit("player_input", {
      userId,
      up: true,
      down: false,
    });
  };

  const movePaddleDown = () => {
    socket.emit("player_input", {
      userId,
      up: false,
      down: true,
    });
  };

  const stopMoving = () => {
    socket.emit("player_input", {
      userId,
      up: false,
      down: false,
    });
  };


  if(startAiGameBtn)
  {
    startAiGameBtn.addEventListener("click", () => {
      socket.emit("join match with ai", {
        userId,

      })
    })
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => {

      socket.emit("join human match", {
        userId,
        nickname
      });
    });
  }


  //// ------------- event listenners =================

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") movePaddleUp();
    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") movePaddleDown();
  });

  document.addEventListener("keyup", (e) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key.toLowerCase() === "w" ||
      e.key.toLowerCase() === "s"
    ) {
      stopMoving();
    }
  });

/// lkistening for the events from the back   <<<<--------------
//it's a full game state sent fron the back: where the ball is, where the paddles are, 
// what the score is, if the game ended 


  socket.on("state_update", (state) => {
    ball = state.ball;
    leftPaddleY = state.leftPaddleY;
    rightPaddleY = state.rightPaddleY;
    scoreA = state.scoreA;
    scoreB = state.scoreB
    drawScene();
  });




  ///// drawing the scene: ---------


  const drawPaddle = (x, y) => {
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  };

  const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.ballX, ball.ballY, ball.ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#305cde";
    ctx.fill();
  };

  const drawScene = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    drawPaddle(10, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth - 10, rightPaddleY);
    ctx.fillRect(width / 2 - 2, 0, 4, canvas.height);
    drawBall();
  };


  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      socket.emit("reset_game", { userId });
    });
  }


  window.addEventListener("resize", () => {
    width = window.innerWidth * 0.9;
    canvas.width = width;
    canvas.height = width * (9 / 16);
    drawScene();
  });

  drawScene(); 
};

socket.on("match_over", (matchData) => {
  const {winnerId, userA_id, userB_id, scoreA, scoreB} = matchData;

  const youWon = winnerId === userId; /// userId is in this file at the top:   const userId = Math.floor(Math.random() * 1000000); . why i cannot find it ?


  const message = youWon ? `yeah ${userA_id} you won! ${scoreA} : ${scoreB}` : `${userB_id} you lost ${scoreA} : ${scoreB}`;

  document.getElementById("gameResultText").textContent = message;

})
