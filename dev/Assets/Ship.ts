class Ship
{
    public _type:string;

    protected game:Game;

    public _shipElement:HTMLElement;

    public _movingUp:boolean = false;
    public _movingRight:boolean = true;

    public _canonsAvailable:number = 10;
    public _canons:number = 10;
    public _refillSpeed:number = 0.05;

    public _x = 0;
    public _y = 0;

    public _hitbox1:HTMLElement;
    public _hitbox2:HTMLElement;
    public _hitbox3:HTMLElement;

    constructor(isPirate:boolean)
    {
        // Set boat type
        this._type = (isPirate ? 'pirate' : 'default');

        // Create element
        this._shipElement = document.createElement("ship");

        this._shipElement.className = this._type;

        this._hitbox1 = this.createHitboxElements(1);
        this._hitbox2 = this.createHitboxElements(2);
        this._hitbox3 = this.createHitboxElements(3);
    }

    _update(x:number, y:number)
    {
        this._x = x;
        this._y = y;

        this._shipElement.style.left = x + "px";
        this._shipElement.style.top = y + "px";
    }

    _moveLeft()
    {
        this._movingRight = false;
        this._shipElement.className = this._type;
    }

    _moveRight()
    {
        this._movingRight = true;
        this._shipElement.className = this._type + " turned";
    }

    // Refill canons
    refill()
    {
        if(this._canonsAvailable >= this._canons)
        {
            // Enough!
            return;
        }

        this._canonsAvailable += this._refillSpeed;
    }

    // Shoot some canons
    _shoot(shootUp:boolean)
    {
        if(this._canonsAvailable <= 1.5)
        {
            return;
        }

        if(this._type === "pirate") 
        {
            this.game.score.cannonsShoot++;
        }

        this._canonsAvailable--;
        
        this.game.bullets.push(new Bullet(this.game, shootUp, this._movingRight, this));
    }

    // Shoot directly cannons
    shootAmount(shootUp:boolean, amount:number)
    {
        for(let i = 0; i < amount; i++)
        {
            this._shoot(shootUp);
        }
    }

    // Create ship hitbox
    createHitboxElements(nr:number)
    {
        let hitbox = document.createElement("div");
        hitbox.className = "hitbox_" + nr;

        this._shipElement.appendChild(hitbox);

        return hitbox;
    }

    checkHitboxes()
    {
        
    }
}