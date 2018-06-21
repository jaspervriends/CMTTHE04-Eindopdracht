class Bullet
{

    private game:Game;
    public element:HTMLElement;
    public ship:Ship;

    // Bullet speed
    private _speed:number = 1.2;
    private _range:number = 200;
    private _startPoint:number = 0;


    private _up:boolean = false;
    private _left:boolean = true;

    private _x:number = 0;
    private _y:number = 0;

    _vissible:boolean = true;
    isEnemyBullet:boolean = false;

    constructor(g:Game, up:boolean, left: boolean, ship:Ship)
    {
        this.game = g;
        this.ship = ship;

        this._up = up;
        this._left = left;

        // Is enemy ship?
        this.isEnemyBullet = ship._type != 'pirate';

        this.element = document.createElement("bullet");

        if(up)
        {
            this.element.style.zIndex = "5";
        }else{
            this.element.style.zIndex = "8";
        }

        let randomPosition = Math.random();

        let position = ship.getPosition();

        if(this._left) {
            this._x = position.x + 40 + (randomPosition * 80);
            this._y = position.y + 120 + (randomPosition * 40);
        }else{
            this._x = position.x + 142 - (randomPosition * 80);
            this._y = position.y + 120 + (randomPosition * 40);
        }

        this._range = 170 + (Math.random() * 40);

        this._startPoint = this._x;

        this.game.screen.scene.appendChild(this.element);

        this.game.cannonballSound.play();
    }

    update()
    {
        // Is this bulles still vissible?
        if(!this._vissible) {
            return;
        }
        
        // Is the bullet outside the screen?
        if(this._y < -10 || this._y > window.innerHeight || this._x > window.innerWidth || this._x < -10)
        {
            this.element.remove();
            this._vissible = false;
            return;
        }

        // Update Y position
        this._y += this._up ? -this._speed : this._speed;

        // Update X position (left or right)
        if(this._up) {
            this._x += this._left ? this._speed : -this._speed;
        }else{
            this._x += this._left ? -this._speed : this._speed;
        }

        // Bullets going down outside range, splash them!
        if(!this._up && ((this._left && (this._startPoint - this._x) > this._range) || (!this._left && (this._x - this._startPoint) > this._range)))
        {
            this.plons();
        }
        // Bullets going up outside range, splash them!
        else if(this._up && ((this._left && (this._x - this._startPoint) > this._range) || (!this._left && (this._startPoint - this._x) > this._range)))
        {
            this.plons();
        }

        this.element.style.top = Math.floor(this._y) + "px";
        this.element.style.left = this._x + "px";
    }

    plons()
    {
        // Stop updating position
        this._vissible = false;

        this.element.className = " splash";

        setTimeout(() => {
            this.element.remove();
            let getMe = this.game.bullets.indexOf(this);
            this.game.bullets.splice(getMe, 1);
        }, 1000);
    }

    boom()
    {
        this._vissible = false;
        this.element.style.background = "#FF0000";
        this.game.boomSound.play();

        setTimeout(() => {
            this.element.remove();
        }, 1000);

    }

    checkCollision()
    {

    }
}