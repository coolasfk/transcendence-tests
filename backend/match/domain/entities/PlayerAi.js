import Paddle from "../valueObjects/Paddle.js";
import Player from "./Player.js";


export default class PlayerAi extends Player
{
    constructor(id, nickname = "Ai", height)
    {
        super(id, nickname, height);
        this.paddle = new Paddle(0.5, height);
    }

    updateAi(gameState)
    {
        console.log(gameState.ballX, "create entire ai logic here babe");
    }

}