class Enemy
{
    health = 100;
    killed:boolean = false;
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
        
        // Create ship
        this.ship = new Ship(false, g);

        // Set refill speed
        this.ship.refillSpeed = 0.03;

        // Set start position
        this._x = (window.innerWidth - Math.floor(Math.random() * 300));
        this._y = (window.innerHeight - Math.floor(Math.random() * 250));

        // Set animation dilay
        this.ship.element.style.animationDelay = Math.random() + "s";

        // Set z-index
        this.ship.element.style.zIndex = "70";

        // Start selfthiking
        this.selfThinking();
    }

    // Set boat speed
    speed(speed:number)
    {
        this._speed = speed;
    }

    // Get ship
    getShip()
    {
        return this.ship.element;
    }

    // Selfthinking
    selfThinking()
    {
        // Player not ready? Let's wait!
        if(typeof this.game.screen.player === "undefined")
        {
            setTimeout(() => this.selfThinking(), 500);
            return;
        }
        
        // Player position
        let playerPositionX = this.game.screen.player._x - this._x;
        let playerPositionY = this.game.screen.player._y - this._y;

        // Player at the left (and too far away from me!)
        if(playerPositionX < -100)
        {
            this.goingLeft = true;
            this.goingRight = false;
        }

        // Player at the right (or the player is too close)
        else if(playerPositionX > 100 || (playerPositionY > -100 && playerPositionX > -100 && playerPositionX < 0 && this.game.key.right))
        {
            this.goingLeft = false;
            this.goingRight = true;
        }else{
            // Nothing
            this.goingLeft = false;
            this.goingRight = false;
        }

        // Player is higher then me and too far from me.
        if(playerPositionY < -200)
        {
            // Let's go up
            this.goingUp = true;
            this.goingDown = false;
        }
        // Player is lower then me (or the player is too close)
        else if(playerPositionY > 100 || (playerPositionY > -100 && playerPositionY < 0 && this.game.key.down))
        {
            this.goingUp = false;
            this.goingDown = true;
        }else{
            this.goingUp = false;
            this.goingDown = false;
        }

        // Is player in range? FIRE!!!
        if((playerPositionX > -150 && playerPositionX < -50) || (playerPositionY > -150 && playerPositionY < -50)) 
        {
            this.shoot = true;
        }else{
            this.shoot = false;
        }

        setTimeout(() => this.selfThinking(), 500);
    }

    // Update
    update()
    {
        // Enemy goes left
        if(this.goingLeft)
        {
            this._x = this._x - this._speed;
            this.ship.moveLeft();
        }

        // Enemy goes right
        if(this.goingRight)
        {
            this._x = this._x + this._speed;
            this.ship.moveRight();
        }

        // Enemy goes up
        if(this.goingUp)
        {
            this.ship.movingUp = true;
            this._y = this._y - this._speed;
        }

        // Enemy goes down
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

        // Refill
        this.ship.refill();

        // Update position
        this.ship.update(this._x, this._y);
    }

    sink()
    {
        this.ship.element.remove();

        let getMe = this.game.screen.enemy.indexOf(this);
        this.game.screen.enemy.splice(getMe, 1);

        if(!this.killed) {
            this.killed = true;
            
            // Survived
            this.game.score.survived++;
        }
    }

    gotShot()
    {
        this.health -= 3.5;

        if(this.health < 0)
        {
            this.sink();
        }
    }
}