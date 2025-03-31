

export default class Paddle
{
    constructor(y)
    {
        this.y = y;

        this.speed = 5;
        this.height = 100;
        this.direction = 0;
    }

    moveUp()
    {
        this.direction -= 1;
    }

    moveDown()
    {
        this.direction += 1;
    }

    stop()
    {
        this.direction = 0;
    }

    update(canvasHeight)
    {
        this.y += this.direction * this.speed;
        this.y = Math.max(0, canvasHeight - this.height)


    }
}