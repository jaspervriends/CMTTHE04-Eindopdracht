class PlayScreen {

    game:Game;
    private scene: HTMLElement;

    constructor(g:Game) {
        this.game = g;

        // Scene element
        this.scene = document.createElement("playscreen");
        this.scene.className = "animated fadeInUp";

        // Append child to the body
        g.game.appendChild(this.scene);

        this.scene.innerHTML = "DIT KOMT LATER!";
    }

    public update(): void {

        
    }

    // private checkCollision(a: ClientRect, b: ClientRect) {
    //     return (a.left <= b.right &&
    //         b.left <= a.right &&
    //         a.top <= b.bottom &&
    //         b.top <= a.bottom)
    // }

    // public removeHealth()
    // {
    //     this.health--;

    //     if(this.health === 0)
    //     {
    //         this.game.gameOver();
    //     }
    // }
}