"use strict";
var Game = (function () {
    function Game() {
        this.game = document.createElement("game");
        this.menu();
        this.gameLoop();
        this.themeMusic = this.playThemeMusic();
        document.body.appendChild(this.game);
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.playThemeMusic = function () {
        return new Howl({
            src: ['./sounds/theme.mp3'],
            autoplay: true,
            loop: true,
            volume: 1
        });
    };
    Game.prototype.clear = function () {
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
window.addEventListener("load", function () {
    document.querySelector("welcome").addEventListener("click", function () {
        new Game();
        document.querySelector("welcome").className = "animated fadeOutUp";
    });
});
var Cloud = (function () {
    function Cloud(scene) {
        this.x = 0;
        this.speed = 1;
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
    Cloud.prototype.randomize = function () {
        this.speed = Math.random();
        this.object.style.top = (Math.random() * 100) + "px";
        this.object.style.width = Math.random() * 150 + 100 + "px";
        this.show();
    };
    Cloud.prototype.show = function () {
        this.object.style.display = "block";
    };
    Cloud.prototype.update = function () {
        var _this = this;
        this.x -= this.speed;
        if (this.x < -300) {
            this.x = window.innerWidth + 300;
        }
        this.object.style.left = this.x + "px";
        requestAnimationFrame(function () {
            _this.update();
        });
    };
    return Cloud;
}());
var Clouds = (function () {
    function Clouds(scene) {
        var _loop_1 = function (i) {
            setTimeout(function () {
                var cloud1 = new Cloud(scene);
                cloud1.delay((i * 150) + 'ms').randomize();
            }, i * 20);
        };
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    }
    return Clouds;
}());
var Healthbar = (function () {
    function Healthbar() {
    }
    return Healthbar;
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
var Player = (function () {
    function Player() {
        this.health = 100;
        this.ship = new Ship('pirate');
    }
    return Player;
}());
var Ship = (function () {
    function Ship(type) {
        this._type = type;
        this.element = this.create();
    }
    Ship.prototype.create = function () {
        var boat = document.createElement("");
    };
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
        this.game = g;
        this.scene = document.createElement("playscreen");
        this.scene.className = "animated fadeInUp";
        g.game.appendChild(this.scene);
        this.scene.innerHTML = "DIT KOMT LATER!";
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
        g.game.appendChild(this.scene);
        var island = new Island(this.scene, '');
        island.position(300, 250).show();
        var island2 = new Island(this.scene, 'second');
        island2.delay('300ms').position(-350, 150).mirror().show();
        this.createMenu();
        new Clouds(this.scene);
    }
    StartScreen.prototype.createMenu = function () {
        this.menu = document.createElement("div");
        this.menu.className = "gameMenu animated fadeInDown";
        this.menu.style.animationDelay = "600ms";
        var logo = document.createElement("img");
        logo.src = "./images/logo.png";
        logo.className = "logo animated fadeIn";
        this.menu.appendChild(logo);
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
        new Woosh('scene');
        this.scene.className = "animated fadeOutUp";
        this.game.start();
        setTimeout(function () {
            _this.scene.remove();
        }, 750);
    };
    StartScreen.prototype.showCredits = function () {
    };
    return StartScreen;
}());
var Woosh = (function () {
    function Woosh(type) {
        this.object = document.createElement("audio");
        if (type === "scene") {
            this.object.src = "./sounds/woosh/woosh_scenechange.mp3";
        }
        else if (type === "start") {
            this.object.src = "./sounds/woosh/woosh_start.mp3";
        }
        else {
            this.object.src = "./sounds/woosh/woosh_backup.mp3";
        }
        this.object.loop = false;
        this.object.autoplay = false;
        this.object.play();
        document.body.appendChild(this.object);
    }
    return Woosh;
}());
//# sourceMappingURL=main.js.map