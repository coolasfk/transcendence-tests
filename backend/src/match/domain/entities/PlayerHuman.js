import Paddle from "../valueObjects/Paddle.js";
import Player from "./Player.js";

export default class PlayerHuman extends Player
{
    constructor(id, nickname, height)
    {
        super(id, nickname, height);
        this.paddle = new Paddle(0.5, id, height);
    }
}