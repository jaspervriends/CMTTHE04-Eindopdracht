class PlayScreen {

    game:Game

    private ships: Ship[] = []

    private playerHealth = 100;


    constructor(g:Game) {
        this.game = g;
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