class Ship
{
    _type:string;

    game:Game;

    element:HTMLElement;

    movingUp:boolean = false;
    movingRight:boolean = true;

    canonsAvailable:number = 10;
    canons:number = 10;
    refillSpeed:number = 0.05;

    public x = 0;
    public y = 0;

    constructor(isPirate:boolean, g:Game)
    {
        // Pass game object
        this.game = g;

        // Set boat type
        this._type = (isPirate ? 'pirate' : 'default');

        // Create element
        this.element = document.createElement("ship");

        this.element.className = this._type;
    }

    update(x:number, y:number)
    {
        this.x = x;
        this.y = y;

        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
    }

    moveLeft()
    {
        this.movingRight = false;
        this.element.className = this._type;
    }

    moveRight()
    {
        this.movingRight = true;
        this.element.className = this._type + " turned";
    }

    // Refill canons
    refill()
    {
        if(this.canonsAvailable >= this.canons)
        {
            // Enough!
            return;
        }

        this.canonsAvailable += this.refillSpeed;
    }

    // Shoot some canons
    shoot(shootUp:boolean)
    {
        if(this.canonsAvailable <= 1.5)
        {
            return;
        }

        this.canonsAvailable--;
        
        this.game.bullets.push(new Bullet(this.game, shootUp, this.movingRight, this));
    }

    // Shoot directly cannons
    shootAmount(shootUp:boolean, amount:number)
    {
        for(let i = 0; i < amount; i++)
        {
            this.shoot(shootUp);
        }
    }
}