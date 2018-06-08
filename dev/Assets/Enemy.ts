class Enemy
{
    health = 100;
    ship:Ship;

    _x:number = 100;
    _y:number = 100;
    _speed:number = 0.8;

    game:Game;

    goingUp:boolean = false;
    goingDown:boolean = false;
    goingRight:boolean = false;
    goingLeft:boolean = false;
    shoot:boolean = false;

    constructor(g:Game)
    {
        this.game = g;
        
        this.ship = new Ship(false, g);

        this.ship.refillSpeed = 0.03;

        this._x = (window.innerWidth - 300);
        this._y = (window.innerHeight - 300);

        this.ship.element.style.animationDelay = Math.random() + "s";

        // Set z-index
        this.ship.element.style.zIndex = "8";

        this.selfThinking();
    }

    speed(speed:number)
    {
        this._speed = speed;
    }

    getShip()
    {
        return this.ship.element;
    }

    selfThinking()
    {
        if(typeof this.game.screen.player === "undefined")
        {
            setTimeout(() => this.selfThinking(), 500);
            return;
        }

        let playerPositionX = this.game.screen.player._x - this._x;
        let playerPositionY = this.game.screen.player._y - this._y;

        if(playerPositionX < -100)
        {
            this.goingLeft = true;
            this.goingRight = false;
        }else if(playerPositionX > 100 || (playerPositionY > -100 && playerPositionX > -100 && playerPositionX < 0 && this.game.key.right))
        {
            this.goingLeft = false;
            this.goingRight = true;
        }else{
            this.goingLeft = false;
            this.goingRight = false;
        }

        if(playerPositionY < -200)
        {
            this.goingUp = true;
            this.goingDown = false;
        }else if(playerPositionY > 100 || (playerPositionY > -100 && playerPositionY < 0 && this.game.key.down))
        {
            this.goingUp = false;
            this.goingDown = true;
        }else{
            this.goingUp = false;
            this.goingDown = false;
        }

        console.log(playerPositionY);

        // Is player in range?
        if((playerPositionX > -150 && playerPositionX < -50) || (playerPositionY > -150 && playerPositionY < -50)) 
        {
            this.shoot = true;
        }else{
            this.shoot = false;
        }

        setTimeout(() => this.selfThinking(), 500);
    }

    update()
    {
        if(this.goingLeft)
        {
            this._x = this._x - this._speed;
            this.ship.moveLeft();
        }

        if(this.goingRight)
        {
            this._x = this._x + this._speed;
            this.ship.moveRight();
        }

        if(this.goingUp)
        {
            this.ship.movingUp = true;
            this._y = this._y - this._speed;
        }

        if(this.goingDown)
        {
            this.ship.movingUp = false;
            this._y = this._y + this._speed;
        }

        // Shoot
        if(this.shoot && this.ship.canonsAvailable > 7)
        {
            this.ship.shootAmount(true, 7);
        }

        this.ship.refill();

        this.ship.update(this._x, this._y);
    }
}