class StartScreen {

    private scene: HTMLElement;
    private menu: HTMLElement;
    private game : Game

    constructor(g:Game) {
        this.game = g

        // Scene element
        this.scene = document.createElement("startscreen");
        this.scene.className = "animated fadeIn";

        document.body.appendChild(this.scene);

        // Add islands
        let island = new Island(this.scene, '');
        island.position(300, 250).show();

        let island2 = new Island(this.scene, 'second');
        island2.delay('300ms').position(-350, 150).mirror().show();
        
        this.createMenu();

        // New cloud
        let cloud1 = new Cloud(this.scene);
        cloud1.delay('200ms').show();
        
    }
    
    createMenu()
    {
        
        // Play text
        this.menu = document.createElement("div");
        this.menu.className = "gameMenu animated fadeInDown";
        this.menu.style.animationDelay = "600ms";

        // Add start button
        this.menu.appendChild(this.startButton());
        this.menu.appendChild(this.creditsButton());

        this.scene.appendChild(this.menu);
    }

    startButton()
    {
        
        let startButton = document.createElement("a");

        startButton.innerHTML = "START GAME";

        startButton.addEventListener("click", () => this.startGame())

        return startButton;
    }

    creditsButton()
    {
        
        let creditsButton = document.createElement("a");

        creditsButton.innerHTML = "Credits";

        creditsButton.addEventListener("click", () => this.showCredits())

        return creditsButton;
    }

    public update(){

    }

    private startGame() {
        this.scene.className = "animated fadeOutUp";


        setTimeout(() => {
            this.game.start();
        }, 1000);
    }

    private showCredits()
    {

    }
}