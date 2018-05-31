"use strict";
var Game = (function () {
    function Game() {
        this.menu();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.clear = function () {
        document.body.innerHTML = "";
    };
    Game.prototype.start = function () {
        this.clear();
        this.screen = new PlayScreen(this);
    };
    Game.prototype.menu = function () {
        this.clear();
        this.screen = new StartScreen(this);
    };
    Game.prototype.gameOver = function () {
        this.clear();
        this.screen = new GameOverScreen(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Cloud = (function () {
    function Cloud(scene) {
        this.x = 0;
        this.scene = scene;
        this.object = document.createElement("cloud");
        this.object.className = "animated fadeInUp ";
        this.object.style.display = "none";
        this.x = Math.random() * (window.innerWidth - 250);
        this.object.style.left = this.x + "px";
        this.object.style.top = (Math.random() * 50) + 20 + "px";
        this.scene.appendChild(this.object);
        this.update();
    }
    Cloud.prototype.delay = function (seconds) {
        this.object.style.animationDelay = seconds;
        return this;
    };
    Cloud.prototype.show = function () {
        this.object.style.display = "block";
    };
    Cloud.prototype.update = function () {
        var _this = this;
        this.x--;
        this.object.style.left = this.x + "px";
        requestAnimationFrame(function () {
            _this.update();
        });
    };
    return Cloud;
}());
var Island = (function () {
    function Island(scene, className) {
        this.scene = scene;
        if (!className) {
            className = "";
        }
        this.object = document.createElement("island");
        this.object.className = "animated bounceInUp " + className;
        this.object.style.display = "none";
        this.scene.appendChild(this.object);
    }
    Island.prototype.position = function (x, y) {
        this.object.style.left = ((window.innerWidth / 2) + x) - (this.object.offsetWidth / 2) + "px";
        this.object.style.top = y + "px";
        return this;
    };
    Island.prototype.delay = function (seconds) {
        this.object.style.animationDelay = seconds;
        return this;
    };
    Island.prototype.mirror = function () {
        this.object.className += " mirrored";
        return this;
    };
    Island.prototype.show = function () {
        this.object.style.display = "block";
    };
    Island.prototype.update = function () {
    };
    return Island;
}());
var Ship = (function () {
    function Ship() {
    }
    return Ship;
}());
var GameOverScreen = (function () {
    function GameOverScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.innerHTML = "GAME OVER!<br/><br/>5";
        var timeOut = 5;
        var addPoints = setInterval(function () {
            timeOut--;
            if (timeOut === 0) {
                _this.game.menu();
                clearInterval(addPoints);
            }
            else {
                _this.div.innerHTML = "GAME OVER!<br/><br/>" + timeOut;
            }
        }, 1000);
    }
    GameOverScreen.prototype.update = function () {
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.ships = [];
        this.playerHealth = 100;
        this.game = g;
    }
    PlayScreen.prototype.update = function () {
    };
    return PlayScreen;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        this.game = g;
        this.scene = document.createElement("startscreen");
        this.scene.className = "animated fadeIn";
        document.body.appendChild(this.scene);
        var island = new Island(this.scene, '');
        island.position(300, 250).show();
        var island2 = new Island(this.scene, 'second');
        island2.delay('300ms').position(-350, 150).mirror().show();
        this.createMenu();
        var cloud1 = new Cloud(this.scene);
        cloud1.delay('200ms').show();
    }
    StartScreen.prototype.createMenu = function () {
        this.menu = document.createElement("div");
        this.menu.className = "gameMenu animated fadeInDown";
        this.menu.style.animationDelay = "600ms";
        this.menu.appendChild(this.startButton());
        this.menu.appendChild(this.creditsButton());
        this.scene.appendChild(this.menu);
    };
    StartScreen.prototype.startButton = function () {
        var _this = this;
        var startButton = document.createElement("a");
        startButton.innerHTML = "START GAME";
        startButton.addEventListener("click", function () { return _this.startGame(); });
        return startButton;
    };
    StartScreen.prototype.creditsButton = function () {
        var _this = this;
        var creditsButton = document.createElement("a");
        creditsButton.innerHTML = "Credits";
        creditsButton.addEventListener("click", function () { return _this.showCredits(); });
        return creditsButton;
    };
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.startGame = function () {
        var _this = this;
        this.scene.className = "animated fadeOutUp";
        setTimeout(function () {
            _this.game.start();
        }, 1000);
    };
    StartScreen.prototype.showCredits = function () {
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map