"use strict";
var Game = (function () {
    function Game() {
        this.bullets = [];
        this.game = document.createElement("game");
        this.menu();
        this.gameLoop();
        this.key = {
            up: false,
            down: false,
            right: false,
            left: false,
            spacebar: false
        };
        this.initializeKeybinding();
        this.themeMusic = this.playThemeMusic();
        this.cannonballSound = this.cannonInitializer();
        document.body.appendChild(this.game);
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.initializeKeybinding = function () {
        var _this = this;
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            if (charCode === 65 || charCode === 37) {
                _this.key.left = true;
            }
            if (charCode === 87 || charCode === 38) {
                _this.key.up = true;
            }
            if (charCode === 68 || charCode === 39) {
                _this.key.right = true;
            }
            if (charCode === 83 || charCode === 40) {
                _this.key.down = true;
            }
            if (charCode === 32) {
                _this.key.spacebar = true;
            }
        };
        document.onkeyup = function (evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            console.log(charCode);
            if (charCode === 65 || charCode === 37) {
                _this.key.left = false;
            }
            if (charCode === 87 || charCode === 38) {
                _this.key.up = false;
            }
            if (charCode === 68 || charCode === 39) {
                _this.key.right = false;
            }
            if (charCode === 83 || charCode === 40) {
                _this.key.down = false;
            }
            if (charCode === 32) {
                _this.key.spacebar = false;
            }
        };
    };
    Game.prototype.playThemeMusic = function () {
        return new Howl({
            src: ['./sounds/theme.mp3'],
            autoplay: true,
            loop: true,
            volume: 1
        });
    };
    Game.prototype.cannonInitializer = function () {
        return new Howl({
            src: ['./sounds/cannonball.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.2,
            pool: 5
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
var Bullet = (function () {
    function Bullet(g, up, left) {
        this._speed = 1.2;
        this._range = 200;
        this._startPoint = 0;
        this._up = false;
        this._left = true;
        this._x = 0;
        this._y = 0;
        this._vissible = true;
        this.game = g;
        this._up = up;
        this._left = left;
        this.element = document.createElement("bullet");
        if (up) {
            this.element.style.zIndex = "5";
        }
        else {
            this.element.style.zIndex = "8";
        }
        var randomPosition = Math.random();
        if (this._left) {
            this._x = this.game.screen.player._x + 40 + (randomPosition * 80);
            this._y = this.game.screen.player._y + 120 + (randomPosition * 40);
        }
        else {
            this._x = this.game.screen.player._x + 142 - (randomPosition * 80);
            this._y = this.game.screen.player._y + 120 + (randomPosition * 40);
        }
        this._range = 170 + (Math.random() * 40);
        this._startPoint = this._x;
        this.game.screen.scene.appendChild(this.element);
        this.game.cannonballSound.play();
    }
    Bullet.prototype.update = function () {
        if (!this._vissible) {
            return;
        }
        if (this._y < -10 || this._y > window.innerHeight || this._x > window.innerWidth || this._x < -10) {
            this.element.remove();
            this._vissible = false;
            return;
        }
        this._y += this._up ? -this._speed : this._speed;
        if (this._up) {
            this._x += this._left ? this._speed : -this._speed;
        }
        else {
            this._x += this._left ? -this._speed : this._speed;
        }
        if (this._left && (this._startPoint - this._x) > this._range) {
            this.plons();
        }
        else if (!this._left && (this._x - this._startPoint) > this._range) {
            this.plons();
        }
        this.element.style.top = Math.floor(this._y) + "px";
        this.element.style.left = this._x + "px";
    };
    Bullet.prototype.plons = function () {
        var _this = this;
        this._vissible = false;
        this.element.className = " splash";
        setTimeout(function () {
            _this.element.remove();
        }, 1000);
    };
    Bullet.prototype.checkCollision = function () {
    };
    return Bullet;
}());
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
var Enemy = (function () {
    function Enemy(g) {
        this.health = 100;
        this._x = 100;
        this._y = 100;
        this._speed = 0.4;
        this.goingUp = false;
        this.goingDown = false;
        this.goingRight = false;
        this.goingLeft = false;
        this.game = g;
        this.ship = new Ship(false, g);
        this._x = (window.innerWidth - 300);
        this._y = (window.innerHeight - 300);
        this.ship.element.style.animationDelay = Math.random() + "s";
        this.ship.element.style.zIndex = "8";
        this.selfThinking();
    }
    Enemy.prototype.speed = function (speed) {
        this._speed = speed;
    };
    Enemy.prototype.getShip = function () {
        return this.ship.element;
    };
    Enemy.prototype.selfThinking = function () {
        var _this = this;
        if (typeof this.game.screen.player === "undefined") {
            setTimeout(function () { return _this.selfThinking(); }, 500);
            return;
        }
        var playerPositionX = this.game.screen.player._x - this._x;
        var playerPositionY = this.game.screen.player._y - this._y;
        if (playerPositionX < -100) {
            this.goingLeft = true;
            this.goingRight = false;
        }
        else if (playerPositionX > 100) {
            this.goingLeft = false;
            this.goingRight = true;
        }
        else {
            this.goingLeft = false;
            this.goingRight = false;
        }
        if (playerPositionY < -100) {
            this.goingUp = true;
            this.goingDown = false;
        }
        else if (playerPositionY > 100) {
            this.goingUp = false;
            this.goingDown = true;
        }
        else {
            this.goingUp = false;
            this.goingDown = false;
        }
        setTimeout(function () { return _this.selfThinking(); }, 500);
    };
    Enemy.prototype.update = function () {
        if (this.goingLeft) {
            this._x = this._x - this._speed;
            this.ship.moveLeft();
        }
        if (this.goingRight) {
            this._x = this._x + this._speed;
            this.ship.moveRight();
        }
        if (this.goingUp) {
            this.ship.movingUp = true;
            this._y = this._y - this._speed;
        }
        if (this.goingDown) {
            this.ship.movingUp = false;
            this._y = this._y + this._speed;
        }
        this.ship.update(this._x, this._y);
    };
    return Enemy;
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
    Island.prototype.big = function () {
        this.object.className += " big";
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
    function Player(g) {
        this.health = 100;
        this._x = 100;
        this._y = 100;
        this._speed = 1;
        this.ship = new Ship(true, g);
        this.ship.element.style.zIndex = "7";
        this.game = g;
    }
    Player.prototype.speed = function (speed) {
        this._speed = speed;
    };
    Player.prototype.getShip = function () {
        return this.ship.element;
    };
    Player.prototype.moveLeft = function () {
        this._x = this._x - this._speed;
        this.ship.moveLeft();
    };
    Player.prototype.moveRight = function () {
        this._x = this._x + this._speed;
        this.ship.moveRight();
    };
    Player.prototype.moveUp = function () {
        if (this._y < 100) {
            return;
        }
        this.ship.movingUp = true;
        this._y = this._y - this._speed;
    };
    Player.prototype.moveDown = function () {
        if (this._y > (window.innerHeight / 2)) {
            return;
        }
        this.ship.movingUp = false;
        this._y = this._y + this._speed;
    };
    Player.prototype.shoot = function () {
        this.ship.shoot(false);
    };
    Player.prototype.update = function () {
        this.ship.update(this._x, this._y);
    };
    return Player;
}());
var Ship = (function () {
    function Ship(isPirate, g) {
        this.movingUp = false;
        this.movingRight = true;
        this.canonsAvailable = 10;
        this.canons = 10;
        this.refillSpeed = 0.05;
        this.game = g;
        this._type = (isPirate ? 'pirate' : 'default');
        this.element = document.createElement("ship");
        this.element.className = this._type;
    }
    Ship.prototype.update = function (x, y) {
        this.element.style.left = x + "px";
        this.element.style.top = y + "px";
    };
    Ship.prototype.moveLeft = function () {
        this.movingRight = false;
        this.element.className = this._type;
    };
    Ship.prototype.moveRight = function () {
        this.movingRight = true;
        this.element.className = this._type + " turned";
    };
    Ship.prototype.refill = function () {
        if (this.canonsAvailable >= this.canons) {
            return;
        }
        this.canonsAvailable += this.refillSpeed;
    };
    Ship.prototype.shoot = function (shootUp) {
        if (this.canonsAvailable <= 1.5) {
            return;
        }
        this.canonsAvailable--;
        this.game.bullets.push(new Bullet(this.game, shootUp, this.movingRight));
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
        this.player = new Player(g);
        this.scene.appendChild(this.player.getShip());
        this.enemy = new Enemy(g);
        this.scene.appendChild(this.enemy.getShip());
        new Clouds(this.scene);
        var island1 = new Island(this.scene, 'first');
        island1.position((window.innerWidth / 2 - 220), -50).big().show();
        var island2 = new Island(this.scene, 'second');
        island2.position(-(window.innerWidth / 2 + 140), 670).big().show();
        this.canonsLeft = document.createElement("div");
        this.canonsLeft.className = "canons-left";
        this.canonsLeft.innerHTML = "10";
        this.scene.appendChild(this.canonsLeft);
    }
    PlayScreen.prototype.update = function () {
        this.player.update();
        this.enemy.update();
        if (this.game.key.left) {
            this.player.moveLeft();
        }
        else if (this.game.key.right) {
            this.player.moveRight();
        }
        if (this.game.key.up) {
            this.player.moveUp();
        }
        else if (this.game.key.down) {
            this.player.moveDown();
        }
        if (this.game.key.spacebar) {
            this.player.shoot();
        }
        this.player.ship.refill();
        var available = Math.floor(this.player.ship.canonsAvailable);
        this.canonsLeft.innerHTML = (available < 10 ? "0" + String(available) : available) + " kanonnen over";
        for (var bullets = 0; bullets < this.game.bullets.length; bullets++) {
            this.game.bullets[bullets].update();
        }
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