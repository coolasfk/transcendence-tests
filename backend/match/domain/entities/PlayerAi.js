import Paddle from "../valueObjects/Paddle";
import Player from "./Player";


export default class PlayerAi extends Player
{
    constructor(id, nickname = "Ai")
    {
        super(id, nickname);
        this.paddle = new Paddle(0.5);
    }

    updateAi(gameState)
    {
        console.log(gameState.ballX, "create entire ai logic here babe");
    }

}