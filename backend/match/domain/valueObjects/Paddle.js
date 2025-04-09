

export default class Paddle
{
    constructor(y, id)
    {
        this.y = y;
        this.id = id;

        this.speed = 2;
        this.height = 100;
        this.direction = 0;
    }

    moveUp()
    {
        console.log("move up ^^^^", this.y, "id: " , this.id);
        this.direction -= 1;
        //this.update(1280);
    }

    moveDown()
    {
        console.log("-----move down //////", this.y, "id: " , this.id);
        this.direction += 1;
        //this.update(1280);
    }

    stop()
    {
        console.log("-------- stop ///////", this.y, "id: " , this.id);
        this.direction = 0;
        //this.update(1280);
    }

    update(canvasHeight)
    {
       // console.log("-------------------------------------------updating the paddle, this.y: ", this.y, "id: ", this.id);
        this.y += this.direction * this.speed;
        if( this.y < 0)
            this.y = 0;
        if(this.y > canvasHeight)
            this.y = canvasHeight;


    }
}