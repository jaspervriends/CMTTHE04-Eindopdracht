class PlayScreen {

    private isRunning:Boolean = true;
    private game:Game;
    private scene: HTMLElement;

    public player:Player;

    public enemy:Enemy[] = [];

    // Stats
    private canonsLeft:HTMLElement;
    private healthBar:HTMLElement;
    private healthBarIndicator:HTMLElement;

    private wave:number = 0;
    private creatingNewWave:boolean = false;

    constructor(g:Game) {
        this.game = g;

        // Reset game score
        this.game.score = {
            waves: 0,
            survived: 0,
            cannonsShoot: 0
        };

        // Scene element
        this.scene = document.createElement("playscreen");
        this.scene.className = "animated fadeInUp";

        // Append child to the body
        g.game.appendChild(this.scene);

        this.player = new Player(g);

        this.scene.appendChild(this.player.getShip());

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
        
        // Healthbar
        this.healthBar = document.createElement("div");
        this.healthBar.className = "health-bar";

        this.healthBarIndicator = document.createElement("div");
        this.healthBarIndicator.className = "health-bar-indicator";
        
        this.healthBar.appendChild(this.healthBarIndicator);
        this.scene.appendChild(this.healthBar);
    }

    // Check keys and update bullets
    public update(): void {
        if(!this.isRunning || this.creatingNewWave) { return; }

        // Player update
        this.player.update();

        if(this.enemy.length === 0)
        {
            this.creatingNewWave = true;
            this.newWave();
            return;
        }

        for(let enemy = 0; enemy < this.enemy.length; enemy++) {
            this.enemy[enemy].update();
        }

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

        
        this.healthBarIndicator.style.width = this.player.health + "%";

        if(this.player.health < 0)
        {
            this.closeScene();
            return;
        }

        // Refill the ship
        this.player.ship.refill();

        let available = Math.floor(this.player.ship.canonsAvailable);
        this.canonsLeft.innerHTML = (available < 10 ? "0" + String(available) : available) +  " kanonnen over";

        for(let bullets = 0; bullets < this.game.bullets.length; bullets++)
        {
            this.game.bullets[bullets].update();

            if(this.game.bullets[bullets]._vissible) {
                if(this.game.bullets[bullets].isEnemyBullet) 
                {
                    if(
                        this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox1.getBoundingClientRect()) ||
                        this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox2.getBoundingClientRect()) ||
                        this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox3.getBoundingClientRect())
                    )
                    {
                        this.player.gotShot();
                        this.game.bullets[bullets].boom();
                    }
                }else{
                    for(let enemy = 0; enemy < this.enemy.length; enemy++) {
                        if(
                            this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox1.getBoundingClientRect()) ||
                            this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox2.getBoundingClientRect()) ||
                            this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox3.getBoundingClientRect())
                        )
                        {
                            this.enemy[enemy].gotShot();
                            this.game.bullets[bullets].boom();
                        }
                    }
                }
            }
        }
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    
    public closeScene()
    {
        this.isRunning = false;
        new Woosh('scene');
        this.scene.className = "animated fadeOutUp";

        this.game.gameOver();

        setTimeout(() => {
            this.scene.remove();
        }, 750);
    }

    public newWave()
    {
        this.wave++;
        this.game.score.waves++;
        this.game.bellSound.play();

        // Show new wave
        let waveText = document.createElement("div");
        waveText.className = "wave-number animated fadeInDown";
        waveText.innerHTML = "WAVE <b>" + this.wave + "</b>";
        document.body.appendChild(waveText);

        setTimeout(() => {
            waveText.className = "wave-number animated fadeOutDown";
            
            
            setTimeout(() => {
                waveText.remove();
            }, 2500);
        }, 2500);

        let amountOfShips = Math.floor(this.wave / 1.3)

        for(let i = 0; i < (amountOfShips == 0 ? 1 : amountOfShips); i++) {
            let enemyShip = new Enemy(this.game);

            this.scene.appendChild(enemyShip.getShip());

            this.enemy.push(enemyShip);
        }

        setTimeout(() => {
            this.creatingNewWave = false;
        }, 100);
        
    }
}