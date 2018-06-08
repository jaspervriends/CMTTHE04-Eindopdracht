

class Game {
    
    screen:any;
    themeMusic:HTMLAudioElement;
    game:HTMLElement;

    key:any;

    // Game bullets
    bullets:Bullet[] = [];

    cannonballSound:any;

    constructor() {
        this.game = document.createElement("game");

        this.menu();

        this.gameLoop()

        this.key = {
            up: false,
            down: false,
            right: false,
            left: false,
            spacebar: false
        };

        this.initializeKeybinding();


        this.themeMusic = this.playThemeMusic();
        this.cannonballSound = this.cannonInitializer();
        
        // document.body.appendChild(this.themeMusic);
        document.body.appendChild(this.game);
    }
    
    private gameLoop():void{
        this.screen.update();

        requestAnimationFrame(() => this.gameLoop())
    }

    initializeKeybinding()
    {
        document.onkeydown = (evt) => {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            
            if(charCode === 65 || charCode === 37)
            {
                this.key.left = true;
            }
            
            if(charCode === 87 || charCode === 38)
            {
                this.key.up = true;
            }

            if(charCode === 68 || charCode === 39)
            {
                this.key.right = true;
            }

            if(charCode === 83 || charCode === 40)
            {
                this.key.down = true;
            }

            if(charCode === 32)
            {
                this.key.spacebar = true;
            }
        };

        document.onkeyup = (evt) => {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;

            console.log(charCode);
            
            if(charCode === 65 || charCode === 37)
            {
                this.key.left = false;
            }

            if(charCode === 87 || charCode === 38)
            {
                this.key.up = false;
            }

            if(charCode === 68 || charCode === 39)
            {
                this.key.right = false;
            }

            if(charCode === 83 || charCode === 40)
            {
                this.key.down = false;
            }

            if(charCode === 32)
            {
                this.key.spacebar = false;
            }
        };
    }

    // Theme music
    private playThemeMusic()
    {
        return new Howl({
            src: ['./sounds/theme.mp3'],
            autoplay: true,
            loop: true,
            volume: 1
        });
    }

    private cannonInitializer()
    {
        return new Howl({
            src: ['./sounds/cannonball.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
            pool: 5
        });
    }

    private clear()
    {
        // this.game.innerHTML = "";
    }

    public start()
    {
        this.clear();
        this.screen = new PlayScreen(this);
    }

    public menu()
    {
        this.clear();

        this.screen = new StartScreen(this);
    }

    public gameOver()
    {
        this.clear();

        this.screen = new GameOverScreen(this);
    }
    
} 


window.addEventListener("load", () => {
    document.querySelector("welcome").addEventListener("click", () => {
        new Game();

        document.querySelector("welcome").className = "animated fadeOutUp";
    });
})