///<reference path="Ship.ts" />

class Player extends Ship
{
    health = 100;

    _x:number = 100;
    _y:number = 100;
    _speed:number = 1;

    protected game:Game;

    constructor(g:Game)
    {
        super(true);

        // Set z-index
        this._shipElement.style.zIndex = "4";

        this.game = g;
    }

    speed(speed:number)
    {
        this._speed = speed;
    }

    getShip()
    {
        return this._shipElement;
    }

    moveLeft()
    {
        this._x = this._x - this._speed;
        this._moveLeft();
    }

    moveRight()
    {
        this._x = this._x + this._speed;
        this._moveRight();
    }

    moveUp()
    {
        if(this._y < 100) {
            return;
        }

        this._movingUp = true;
        this._y = this._y - this._speed;
    }

    moveDown()
    {
        if(this._y > (window.innerHeight / 2)) {
            return;
        }

        this._movingUp = false;
        this._y = this._y + this._speed;
    }

    shoot()
    {
        if(this._canonsAvailable >= 5)
        {
            this.game.shoutFire();
        }

        this._shoot(false);
    }
    update()
    {
        this._update(this._x, this._y);
    }

    gotShot()
    {
        this.health -= 3.5;
    }

}