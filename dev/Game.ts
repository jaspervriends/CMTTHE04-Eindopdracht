

class Game {
    
    private screen:any;
    themeMusic:HTMLAudioElement;
    game:HTMLElement;

    constructor() {
        this.game = document.createElement("game");

        this.menu();

        this.gameLoop()


        this.themeMusic = this.playThemeMusic();
        
        document.body.appendChild(this.themeMusic);
        document.body.appendChild(this.game);
        
        setTimeout(() => {
            this.themeMusic.play();
        }, 500);
    }
    
    private gameLoop():void{
        this.screen.update();

        requestAnimationFrame(() => this.gameLoop())

    }

    // Theme music
    private playThemeMusic()
    {
        let music = document.createElement("audio");
        music.src = "./sounds/theme.mp3";
        music.loop = true;
        music.autoplay = true;
        
        return music;
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


window.addEventListener("load", () => new Game())