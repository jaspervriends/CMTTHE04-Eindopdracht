

class Game {
    
    private screen:any;
    themeMusic:HTMLAudioElement;
    game:HTMLElement;

    constructor() {
        this.game = document.createElement("game");

        this.menu();

        this.gameLoop()


        this.themeMusic = this.playThemeMusic();
        
        // document.body.appendChild(this.themeMusic);
        document.body.appendChild(this.game);
    }
    
    private gameLoop():void{
        this.screen.update();

        requestAnimationFrame(() => this.gameLoop())

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