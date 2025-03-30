export default class Player 
{
    constructor(id, isPlayerA)
    {
        if(new.target === Player)
        {
            throw new TypeError("You cannot initialize the player directly, it's an abstract class!")
        }

        this.isPlayerA = isPlayerA;
        this.id = id;
        this.isAi = false;
        this.paddle = {y: 0.5};
    }


    serialize() {
        return {
            id: this.id,
        }
    }
}