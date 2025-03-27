export class Player 
{
    constructor(id)
    {
        if(new.target === "Player")
        {
            throw new TypeError("You cannot initialize the player directly, it's an abstract class!")
        }


        this.id = id;
        this.isAi = false;
        this.paddle = {y}
    }


    serialize() {
        return {
            id: this.id,
            nickname: this.nickname,
            paddle: this.paddle
        }
    }
}