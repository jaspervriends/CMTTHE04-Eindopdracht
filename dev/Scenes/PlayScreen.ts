class PlayScreen {

    game:Game;
    private scene: HTMLElement;

    player:Player;

    enemy:Enemy;

    // Stats
    canonsLeft:HTMLElement;

    constructor(g:Game) {
        this.game = g;

        // Scene element
        this.scene = document.createElement("playscreen");
        this.scene.className = "animated fadeInUp";

        // Append child to the body
        g.game.appendChild(this.scene);

        this.player = new Player(g);

        this.scene.appendChild(this.player.getShip());

        this.enemy = new Enemy(g);

        this.scene.appendChild(this.enemy.getShip());

        // New cloud
        new Clouds(this.scene);

        let island1 = new Island(this.scene, 'first');
        island1.position((window.innerWidth / 2 - 220), -50).big().show();

        let island2 = new Island(this.scene, 'second');
        island2.position(-(window.innerWidth / 2 + 140), 670).big().show();


        this.canonsLeft = document.createElement("div");
        this.canonsLeft.className = "canons-left";
        this.canonsLeft.innerHTML = "10";

        this.scene.appendChild(this.canonsLeft);
    }

    // Check keys and update bullets
    public update(): void {

        // Player update
        this.player.update();

        this.enemy.update();

        // Key actions
        if(this.game.key.left)
        {
            this.player.moveLeft();
        }else if(this.game.key.right)
        {
            this.player.moveRight();
        }
        
        
        if(this.game.key.up)
        {
            this.player.moveUp();
        }
        else if(this.game.key.down)
        {
            this.player.moveDown();
        }
        
        if(this.game.key.spacebar)
        {
            this.player.shoot();
        }

        // Refill the ship
        this.player.ship.refill();

        let available = Math.floor(this.player.ship.canonsAvailable);
        this.canonsLeft.innerHTML = (available < 10 ? "0" + String(available) : available) +  " kanonnen over";

        for(let bullets = 0; bullets < this.game.bullets.length; bullets++)
        {
            this.game.bullets[bullets].update();
            
            if(this.game.bullets[bullets].isEnemyBullet) 
            {
                if(
                    this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox1.getBoundingClientRect()) ||
                    this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox2.getBoundingClientRect()) ||
                    this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox3.getBoundingClientRect())
                )
                {
                    this.game.bullets[bullets].boom();
                }
            }
        }

        // console.log("Avaiable canons: " + this.player.ship.canonsAvailable);
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    // public removeHealth()
    // {
    //     this.health--;

    //     if(this.health === 0)
    //     {
    //         this.game.gameOver();
    //     }
    // }
}