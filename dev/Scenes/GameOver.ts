class GameOverScreen {
    private div: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "GAME OVER!<br/><br/>5";

        let timeOut = 5;

        let addPoints = setInterval(() => {
            timeOut--;

            if(timeOut === 0) {
                this.game.menu();
                clearInterval(addPoints);
            }else{
                this.div.innerHTML = "GAME OVER!<br/><br/>" + timeOut;
            }
        }, 1000);

    }

    update() {

    }
}