class GameOverScreen {
    private scene: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g;

        // Game over scene
        this.scene = document.createElement("endscreen");
        this.scene.className = "animated bounceInUp";
        g.game.appendChild(this.scene);

        // Endscreen centered text
        let middle = document.createElement("div");
        middle.className = "centered";
        middle.innerHTML = "<b>GAME OVER!</b><small>Waves survived:</small>" + (this.game.score.waves - 1) + "<br /><small>Ships destroyed:</small>" + this.game.score.survived + "<br /><small>Fired cannons:</small>" + this.game.score.cannonsShoot + "<br />";

        let timeOut = 60;

        // Countdown
        let addPoints = setInterval(() => {
            timeOut--;

            if(timeOut === 0) {
                this.game.menu();
                clearInterval(addPoints);

                // Removing all scene elements
                setTimeout(() => {
                    this.scene.remove();
                }, 1000);
            }else{
                // middle.innerHTML = "GAME OVER!<br/>" + timeOut;
            }
        }, 1000);

        // Back to menu
        let menuButton = document.createElement("a");
        menuButton.className = "back-to-menu";
        menuButton.innerHTML = "Back to menu";
        menuButton.href = "javascript:void(0)";

        menuButton.addEventListener("click", () => {
            clearInterval(addPoints);
            this.game.menu();
        });

        middle.appendChild(menuButton);

        // Add to scene
        this.scene.appendChild(middle);


        // Sound
        this.game.themeMusic.fade(1, 0, 500);
        this.game.endsceneSound.play();

        setTimeout(() => {
            this.game.themeMusic.fade(0, 1, 500);
        }, 4000);
    }

    update() {

    }
}