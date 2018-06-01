class Bullet
{

    game:Game;
    element:HTMLElement;

    // Bullet speed
    _speed:number = 1.2;


    _up:boolean = false;
    _right:boolean = true;

    _x:number = 0;
    _y:number = 0;

    constructor(g:Game, up:boolean, right: boolean)
    {
        this.game = g;

        this._up = up;
        this._right = right;

        this.element = document.createElement("bullet");

        if(up)
        {
            this.element.style.zIndex = "5";
        }else{
            this.element.style.zIndex = "8";
        }

        let randomPosition = Math.random();

        this._x = this.game.screen.player._x + 40 + (randomPosition * 80);
        this._y = this.game.screen.player._y + 120 + (randomPosition * 40);

        this.game.screen.scene.appendChild(this.element);

        this.game.cannonballSound.play();
    }

    update()
    {
        this._y += this._up ? -this._speed : this._speed;

        if(this._up) {
            this._x += this._right ? this._speed : -this._speed;
        }else{
            this._x += this._right ? -this._speed : this._speed;
        }

        this.element.style.top = this._y + "px";
        this.element.style.left = this._x + "px";
    }

    checkCollision()
    {

    }
}