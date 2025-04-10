

export default class Paddle
{
    constructor(y, id, height)
    {
        this.y = y;
        this.id = id;
        this.canvasHeight = height;

        this.speed = 2;
        this.height = 100;
        this.direction = 0;
    }

    moveUp()
    {
        console.log("🔹🔹🔹 class Paddle move up ^^^^", this.y, "id: " , this.id);
        this.direction -= 1;
        if(this.y <= 0)
        {
            this.direction = 0;
        }

    }

    moveDown()
    {
        console.log("🔹🔹🔹 class Paddle move down //////", this.y, "id: " , this.id);
        this.direction += 1;
        if(this.y <= 0)
        {
            this.direction = 1;
        }
        console.log("🔹🔹🔹 class Paddle move down //////", this.y, "canvasHeight: " , this.canvasHeight);
        ////do this math right babe
        if(this.y + this.height >= this.canvasHeight - this.height)
        {
            console.log("🔹🔹🔹 class Paddle move down this.y + this.height >= this.canvasHeight TRUE");
            this.direction = -1;
        }
    }

    stop()
    {
        console.log("🔹🔹🔹class Paddle stop ///////", this.y, "id: " , this.id);
        this.direction = 0;
        //this.update(1280);
    }

    update(canvasHeight)
    {
        //console.log("🔹🔹🔹 class Paddle - canvasHeight: ", canvasHeight);
       // console.log("🔹🔹🔹 class Paddle----------------updating the paddle, this.y: ", this.y, "id: ", this.id);
        this.y += this.direction * this.speed;
        if( this.y <= 0)
            this.y = 0;
        ////🟢 ➜➜➜➜➜➜➜➜➜ do the math ;DDD
        if(this.y >= canvasHeight - this.height -50)
            this.y = canvasHeight - this.height -50;


    }
}