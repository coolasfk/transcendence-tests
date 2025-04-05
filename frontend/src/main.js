
//import {v4 as uuidv4 } from "uuid"


const socket = new WebSocket('ws://localhost:5000/game');

socket.addEventListener("open", () => {

  console.log("socket connected", socket.id);
  socket.send(JSON.stringify("hello from the frontend"));
})



/////// listening to the events from the back

socket.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);
    console.log("📨 Message received from backend:", message);

    if (message.type === "state_update") {
      ball = message.ball;
      leftPaddleY = message.leftPaddleY;
      rightPaddleY = message.rightPaddleY;
      drawScene();
    }

    if(message.type === "input_received")
    {
      console.log("input received",message.message);
    }

    if (message.type === "match_over") {
      const { winnerId, userA_id, userB_id, scoreA, scoreB } = message;
      const youWon = winnerId === userId;
      const resultText = youWon
        ? `🎉 ${userA_id} you won! ${scoreA} : ${scoreB}`
        : `😢 ${userB_id} you lost ${scoreA} : ${scoreB}`;
      document.getElementById("gameResultText").textContent = resultText;
    }

  } catch (err) {
    console.error("⚠️ Failed to parse backend message:", err, event.data);
  }
});


/////




export const userId = Math.floor(Math.random() * 1000000);
  console.log("User ID:", userId);

  export const matchId = Math.floor(Math.random() * 1000000);
  console.log("--------->>>>Match ID:", matchId);

export const  initGame = async () => {

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


//let matchId = uuidv4();
//let matchId = Math.floor(Math.random() * 100000)


////---------------------

const movePaddleUp = () => {
  console.log("move paddle up ---sending")
  const player_input = {
    type: "movePaddleUp",
    data: {
      matchId,
      userId,
      up: true,
      down: false,
    },
  };
  socket.send(JSON.stringify(player_input));
};

  const movePaddleDown = () => {
    console.log("---front: move paddle down");
    const paddleDown = {
      type: "movePaddleDown",
      data: {
      matchId,
      userId,
      up: false,
      down: true,
      }
    };
    socket.send(JSON.stringify(paddleDown));
  };

  const stopMoving = () => {
      const stopMoving = {
        type: "stopMoving",
        data: {
          matchId,
          userId,
          up: false,
          down: false,
        }
      };
      socket.send(JSON.stringify(stopMoving));
  };



  if(startAiGameBtn)
  {
    startAiGameBtn.addEventListener("click", () => {
      socket.emit("join match with ai", {
        userId,
        nickname
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



document.getElementById("inviteAccepted").addEventListener("click", async() => {

console.log("INVITE CLICKED");

try {
  const response = await fetch ("http://localhost:5000/api/match/yourInviteGotAccepted", {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      matchId,
      userId: "666",
      nickname,
      oponnentId: "123",
      oponnentNickname: "oponnent_name",
      }),
  });
  if(response.ok)
  {
    alert("Pong is about to start... countdown... 3 .. 2")
  }
  else
  {
    alert("error fetch your invite got accepted", result.message || "Cannot start the game");
  }
} catch(error)
{
  console.error("Error: cannot start the game from the invitation: ", error);
  alert("Cannot start the game from the invite", error);
}



})















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

/*
  socket.on("state_update", (state) => {
    console.log("💅💅💅💅receving the state update from the front: BALL: ", state.ball.ballX, "LEFT PADDLE: ",  leftPaddleY)
    ball = state.ball;
    leftPaddleY = state.leftPaddleY;
    rightPaddleY = state.rightPaddleY;
    //scoreA = state.scoreA;
    //scoreB = state.scoreB
    drawScene();
  });

*/

  ///// drawing the scene: ---------


  const drawPaddle = (x, y) => {
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  };

  const drawBall = () => {
    ctx.beginPath();
    console.log("ball checks:", ball.ballX, ball.ballY, ball.ballX );
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

/*

socket.on("match_over", (matchData) => {
  const {winnerId, userA_id, userB_id, scoreA, scoreB} = matchData;

  const youWon = winnerId === userId; /// userId is in this file at the top:   const userId = Math.floor(Math.random() * 1000000); . why i cannot find it ?


  const message = youWon ? `yeah ${userA_id} you won! ${scoreA} : ${scoreB}` : `${userB_id} you lost ${scoreA} : ${scoreB}`;

  document.getElementById("gameResultText").textContent = message;

})*/
