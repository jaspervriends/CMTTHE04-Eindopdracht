/// <reference path="ball.ts"/>

class Game {
    
    private screen:any;

    constructor() {
        this.menu();

        this.gameLoop()        
    }
    
    private gameLoop():void{
        this.screen.update();

        requestAnimationFrame(() => this.gameLoop())

    }

    private clear()
    {
        document.body.innerHTML = "";
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