# Pirates & Boats - CMTTHE04-Eindopdracht

Link to play:
https://jaspervriends.github.io/CMTTHE04-Eindopdracht/

## Extra uitdagingen:
- [x] (veel) Muziek en sound effects (Howler library) gebruikt
- [x] Graphics gebruikt

## Copyrights
Polygon images from https://www.behance.net/gallery/16462531/Low-poly-pirates

# Toelichting criteria

## Classes
Het spel bevat TypeScript classes zoals we deze gewend zijn. Mijn gehele spel maakt en alle assets en elementen maken er gebruik van. Hieronde de asset Island.ts

```typescript
class Island
{
    public object:HTMLElement;
    private scene:any;

    constructor(scene:any, className:String)
    {
        this.scene = scene;

        if(!className)
        {
            className = "";
        }

        // Create island object
        this.object = document.createElement("island");

        // Create classes
        this.object.className = "animated bounceInUp " + className;

        this.object.style.display = "none";

        this.scene.appendChild(this.object);
    }

    position(x:number, y:number)
    {
        
        this.object.style.left = ((window.innerWidth / 2) + x) - (this.object.offsetWidth / 2) + "px";
        this.object.style.top = y + "px";

        return this;
    }

    big()
    {
        this.object.className += " big";

        return this;
    }

    delay(seconds:string)
    {
        this.object.style.animationDelay = seconds;

        return this;
    }

    mirror()
    {
        this.object.className += " mirrored";
        
        return this;
    }

    show()
    {
        this.object.style.display = "block";
    }

    update()
    {

    }
}
```

## Encapsulation
Bij encapsulation maak ik gebruik van private, protected en public variabelen.

**Deel van Bullet.ts**
```typescript
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

```

## Composition
In het gehele spel heb ik een connectie met de Game.ts class. Aangezien dit de class is dat aanstuurt en een hoop informatie bewaart. Hieronder enkele voorbeelden:

```typescript
///<reference path="Ship.ts" />
class Enemy extends Ship
{
    health = 100;
    killed:boolean = false;

    _x:number = 100;
    _y:number = 100;
    _speed:number = 0.8;

    protected game:Game;

    goingUp:boolean = false;
    goingDown:boolean = false;
    goingRight:boolean = false;
    goingLeft:boolean = false;
    shoot:boolean = false;

    constructor(g:Game)
    {
        super(false);

        this.game = g;

```

```typescript
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
```

```typescript
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
```

## Inheritance
In dit gedeelte herbruik ik code. Zowel de player als de tegenstander zijn schepen. Het enige verschil is dat de player de piraat is en dat de tegenstander de normale schepen zijn en zichzelf kan voortbewegen.

Omdat beiden objecten hetzelfde moeten kunnen wordt de class Ship ge-extend:

**Deel van Ship.ts**
```typescript
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

    protected _x = 0;
    protected _y = 0;

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

    getPosition() : any
    {
        return {
            x: this._x,
            y: this._y
        };
    }

    _update(x:number, y:number)
    {
        this._x = x;
```

**Deel van Player.ts**
```typescript
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
```

**Deel van Enemy.ts**
```typescript
///<reference path="Ship.ts" />

class Enemy extends Ship
{
    health = 100;
    killed:boolean = false;

    _x:number = 100;
    _y:number = 100;
    _speed:number = 0.8;

    protected game:Game;

    goingUp:boolean = false;
    goingDown:boolean = false;
    goingRight:boolean = false;
    goingLeft:boolean = false;
    shoot:boolean = false;

    constructor(g:Game)
    {
        super(false);

        this.game = g;
        
        // Set refill speed
        this._refillSpeed = 0.03;

        // Set start position
        this._x = (window.innerWidth - Math.floor(Math.random() * 300));
        this._y = (window.innerHeight - Math.floor(Math.random() * 250));

        // Set animation dilay
        this._shipElement.style.animationDelay = Math.random() + "s";

        // Set z-index
        this._shipElement.style.zIndex = "70";

        // Start selfthiking
        this.selfThinking();
    }

    // Set boat speed
    speed(speed:number)
    {
        this._speed = speed;
    }
```

# Peer reviews
### PeerReview van Brank https://github.com/branksz/game

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [ ] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [ ] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [ ] Een klassendiagram van de game.
    - [ ] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [ ] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

## Feedback
Het spel van Branko is leuk, moeilijk en verslavend, hij laat aan het einde van het spel de je score zien en het spel ziet er simpel maar verzorgd uit. Voor zover ik het heb gemerkt heb ik geen bugs gevonden. Als ik in de code kijk zie ik dat alles er helder uit ziet. Misschien is het nog leuk om een highscorelijst toe te voegen.

Hij mist als enige zijn README, voor de rest top!

Mij is het trouwens gelukt om de 9.734 punten te scoren in zijn spel (na een aantal pogingen).
