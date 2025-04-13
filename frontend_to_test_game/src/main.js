
const socket = new WebSocket('ws://localhost:3000/ws/main-ws');

socket.addEventListener("open", () => {

  console.log("socket connected");
})

////------------>><<------- hard-coded data from the user -------------////
//
export const userId = 111;
export const oponnentId = 222; 
  console.log("User ID:", userId);

//export const matchId = Math.floor(Math.random() * 1000000);

////// 🟢 ➜➜➜➜➜➜➜➜➜!!!!!!!!! hardcoded match for now
export const matchId = 666;
  console.log("--------->>>>Match ID:", matchId);


export const  initGame = async () => {

  console.log("Initializing the game...");

  const nickname = prompt("Type your nickname:");
  if (!nickname || nickname.length < 2) {
    alert("Nickname too short!");
    return;


  }
  const oponnentNickname = "oponnent_nickname";


  ////------------>><<--------------------////



///////// 🟢 ➜➜➜➜➜➜➜➜➜ listening to the events from the back /////

socket.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);
    console.log("📨 Message received from backend:", message);

    if (message.type === "state_update") {
      ballX = message.ballX;
      ballY = message.ballY;
      ballSize = message.ballSize;
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
    console.error("Failed to parse backend message:", err, event.data);
  }
});


/////---------///








  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");
  const resetBtn = document.getElementById("resetBtn");

//-------------------------------------

  let width = window.innerWidth * 0.9;
  canvas.width = width;
  canvas.height = width * (9 / 16);

  let height = canvas.height;

  const paddleHeight = canvas.height * 0.13;
  const paddleWidth = canvas.height * 0.016;

  let leftPaddleY = 0;
  let rightPaddleY = 0;
  let ballX =  0;
  let ballY  = 0;
  let ballSize = 15 ;

//---------------------------------------------


//let matchId = uuidv4();
//let matchId = Math.floor(Math.random() * 100000)


////---------------------

const movePaddleUp = (who) => {
  console.log("move paddle up ---sending")
  const player_input = {
    domain: "game",
    type: "movePaddleUp",
    data: {
      matchId,
      who,
      up: true,
      down: false,
    },
  };
  socket.send(JSON.stringify(player_input));
};

  const movePaddleDown = (who) => {
    console.log("---front: move paddle down");

    const paddleDown = {
      domain: "game",
      type: "movePaddleDown",
      data: {
      matchId,
      who,
      up: false,
      down: true,
      }
    };
    socket.send(JSON.stringify(paddleDown));
  };

  const stopMoving = (who) => {
      const stopMoving = {
        domain: "game",
        type: "stopMoving",
        data: {
          matchId,
          who,
          up: false,
          down: false,
        }
      };
      socket.send(JSON.stringify(stopMoving));
  };


document.getElementById("inviteAccepted").addEventListener("click", async() => {

console.log("INVITE CLICKED");

try {
  const response = await fetch ("http://localhost:3000/api/match/yourInviteGotAccepted", {
    method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      width,
      height,
      matchId,
      userId,
      nickname,
      oponnentId,
      oponnentNickname,
      }),
  });
  if(response.ok)
  {

    console.log("🥖🥖🥖🥖🥖🥖🥖 joining the match");

    const joinMatch = {
      domain: "game",
      type: "join_match",
      data: {
        matchId,
        userId,
        oponnentId
      } 
    };
    socket.send(JSON.stringify(joinMatch))

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
    if (e.key === "ArrowUp")
        movePaddleUp(userId);
    if(e.key.toLowerCase() === "w")
        movePaddleUp(oponnentId);
    if (e.key === "ArrowDown")
        movePaddleDown(userId);
    if(e.key.toLowerCase() === "s") movePaddleDown(oponnentId);
  });

  document.addEventListener("keyup", (e) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown")
          stopMoving(oponnentId);
    if(e.key.toLowerCase() === "w" || e.key.toLowerCase() === "s")
      stopMoving(userId);
  });


  ///// drawing the scene: ---------


  const drawPaddle = (x, y) => {
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  };

  const drawBall = () => {
    ctx.beginPath();
    console.log("ball checks:", ballX, ballY, ballSize );
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
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

