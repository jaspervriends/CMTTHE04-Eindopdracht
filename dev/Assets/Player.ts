class Player
{
    health = 100;
    ship:Ship;

    _x:number = 100;
    _y:number = 100;
    _speed:number = 1;

    game:Game;

    constructor(g:Game)
    {
        this.ship = new Ship(true, g);

        // Set z-index
        this.ship.element.style.zIndex = "4";

        this.game = g;
    }

    speed(speed:number)
    {
        this._speed = speed;
    }

    getShip()
    {
        return this.ship.element;
    }

    moveLeft()
    {
        this._x = this._x - this._speed;
        this.ship.moveLeft();
    }

    moveRight()
    {
        this._x = this._x + this._speed;
        this.ship.moveRight();
    }

    moveUp()
    {
        if(this._y < 100) {
            return;
        }

        this.ship.movingUp = true;
        this._y = this._y - this._speed;
    }

    moveDown()
    {
        if(this._y > (window.innerHeight / 2)) {
            return;
        }

        this.ship.movingUp = false;
        this._y = this._y + this._speed;
    }

    shoot()
    {
        this.ship.shoot(false);
    }
    update()
    {
        this.ship.update(this._x, this._y);
    }

    gotShot()
    {
        this.health -= 3.5;
    }

}