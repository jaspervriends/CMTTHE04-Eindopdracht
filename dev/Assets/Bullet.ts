class Bullet
{

    game:Game;
    element:HTMLElement;

    // Bullet speed
    _speed:number = 1.2;
    _range:number = 200;
    _startPoint:number = 0;


    _up:boolean = false;
    _left:boolean = true;

    _x:number = 0;
    _y:number = 0;

    _vissible:boolean = true;

    constructor(g:Game, up:boolean, left: boolean)
    {
        this.game = g;

        this._up = up;
        this._left = left;

        this.element = document.createElement("bullet");

        if(up)
        {
            this.element.style.zIndex = "5";
        }else{
            this.element.style.zIndex = "8";
        }

        let randomPosition = Math.random();

        if(this._left) {
            this._x = this.game.screen.player._x + 40 + (randomPosition * 80);
            this._y = this.game.screen.player._y + 120 + (randomPosition * 40);
        }else{
            this._x = this.game.screen.player._x + 142 - (randomPosition * 80);
            this._y = this.game.screen.player._y + 120 + (randomPosition * 40);
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
        
        // Do we need to hide it?
        if(this._y < -10 || this._y > window.innerHeight || this._x > window.innerWidth || this._x < -10)
        {
            this.element.remove();
            this._vissible = false;
            return;
        }

        this._y += this._up ? -this._speed : this._speed;

        if(this._up) {
            this._x += this._left ? this._speed : -this._speed;
        }else{
            this._x += this._left ? -this._speed : this._speed;
        }

        if(this._left && (this._startPoint - this._x) > this._range)
        {
            this.plons();
        }else if(!this._left && (this._x - this._startPoint) > this._range)
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
        }, 1000);
    }

    checkCollision()
    {

    }
}