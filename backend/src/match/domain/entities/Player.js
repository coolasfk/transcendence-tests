import Paddle from '../valueObjects/Paddle.js'



export default class Player 
{
    constructor(id, nickname, height)
    {
        if(new.target === Player)
        {
            throw new TypeError("You cannot initialize the player directly, it's an abstract class!")
        }

        this.id = id;
        this.height = height;
        this.isAi = false;
        this.paddle = new Paddle(0,5, height);
    }


    updateAi(gameState) {
        console.log("the logic for the game with ai: ", gameState);
    }


    serialize() {
        return {
            id: this.id,
        }
    }
}