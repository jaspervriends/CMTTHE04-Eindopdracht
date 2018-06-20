"use strict";
var Game = (function () {
    function Game() {
        this.bullets = [];
        this.score = {
            waves: 0,
            survived: 0,
            cannonsShoot: 0
        };
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
        this.bellSound = this.bellsInitializer();
        this.boomSound = this.boomInitializer();
        this.endsceneSound = this.endSceneInitializer();
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
    Game.prototype.bellsInitializer = function () {
        return new Howl({
            src: ['./sounds/bell.mp3'],
            autoplay: false,
            loop: false,
            volume: 1
        });
    };
    Game.prototype.boomInitializer = function () {
        return new Howl({
            src: ['./sounds/boom.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.4,
            pool: 5
        });
    };
    Game.prototype.endSceneInitializer = function () {
        return new Howl({
            src: ['./sounds/endscene.mp3'],
            autoplay: false,
            loop: false,
            volume: 0.4,
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
    function Bullet(g, up, left, ship) {
        this._speed = 1.2;
        this._range = 200;
        this._startPoint = 0;
        this._up = false;
        this._left = true;
        this._x = 0;
        this._y = 0;
        this._vissible = true;
        this.isEnemyBullet = false;
        this.game = g;
        this.ship = ship;
        this._up = up;
        this._left = left;
        this.isEnemyBullet = ship._type != 'pirate';
        this.element = document.createElement("bullet");
        if (up) {
            this.element.style.zIndex = "5";
        }
        else {
            this.element.style.zIndex = "8";
        }
        var randomPosition = Math.random();
        if (this._left) {
            this._x = ship.x + 40 + (randomPosition * 80);
            this._y = ship.y + 120 + (randomPosition * 40);
        }
        else {
            this._x = ship.x + 142 - (randomPosition * 80);
            this._y = ship.y + 120 + (randomPosition * 40);
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
        if (!this._up && ((this._left && (this._startPoint - this._x) > this._range) || (!this._left && (this._x - this._startPoint) > this._range))) {
            this.plons();
        }
        else if (this._up && ((this._left && (this._x - this._startPoint) > this._range) || (!this._left && (this._startPoint - this._x) > this._range))) {
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
            var getMe = _this.game.bullets.indexOf(_this);
            _this.game.bullets.splice(getMe, 1);
        }, 1000);
    };
    Bullet.prototype.boom = function () {
        var _this = this;
        this._vissible = false;
        this.element.style.background = "#FF0000";
        this.game.boomSound.play();
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
        this.killed = false;
        this._x = 100;
        this._y = 100;
        this._speed = 0.8;
        this.goingUp = false;
        this.goingDown = false;
        this.goingRight = false;
        this.goingLeft = false;
        this.shoot = false;
        this.game = g;
        this.ship = new Ship(false, g);
        this.ship.refillSpeed = 0.03;
        this._x = (window.innerWidth - Math.floor(Math.random() * 300));
        this._y = (window.innerHeight - Math.floor(Math.random() * 250));
        this.ship.element.style.animationDelay = Math.random() + "s";
        this.ship.element.style.zIndex = "70";
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
        else if (playerPositionX > 100 || (playerPositionY > -100 && playerPositionX > -100 && playerPositionX < 0 && this.game.key.right)) {
            this.goingLeft = false;
            this.goingRight = true;
        }
        else {
            this.goingLeft = false;
            this.goingRight = false;
        }
        if (playerPositionY < -200) {
            this.goingUp = true;
            this.goingDown = false;
        }
        else if (playerPositionY > 100 || (playerPositionY > -100 && playerPositionY < 0 && this.game.key.down)) {
            this.goingUp = false;
            this.goingDown = true;
        }
        else {
            this.goingUp = false;
            this.goingDown = false;
        }
        if ((playerPositionX > -150 && playerPositionX < -50) || (playerPositionY > -150 && playerPositionY < -50)) {
            this.shoot = true;
        }
        else {
            this.shoot = false;
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
        if (this.shoot && this.ship.canonsAvailable > 7) {
            this.ship.shootAmount(true, 7);
        }
        this.ship.refill();
        this.ship.update(this._x, this._y);
    };
    Enemy.prototype.sink = function () {
        this.ship.element.remove();
        var getMe = this.game.screen.enemy.indexOf(this);
        this.game.screen.enemy.splice(getMe, 1);
        if (!this.killed) {
            this.killed = true;
            this.game.score.survived++;
        }
    };
    Enemy.prototype.gotShot = function () {
        this.health -= 3.5;
        if (this.health < 0) {
            this.sink();
        }
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
        this.ship.element.style.zIndex = "4";
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
    Player.prototype.gotShot = function () {
        this.health -= 3.5;
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
        this.x = 0;
        this.y = 0;
        this.game = g;
        this._type = (isPirate ? 'pirate' : 'default');
        this.element = document.createElement("ship");
        this.element.className = this._type;
        this.hitbox1 = this.createHitboxElements(1);
        this.hitbox2 = this.createHitboxElements(2);
        this.hitbox3 = this.createHitboxElements(3);
    }
    Ship.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
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
        if (this._type === "pirate") {
            this.game.score.cannonsShoot++;
        }
        this.canonsAvailable--;
        this.game.bullets.push(new Bullet(this.game, shootUp, this.movingRight, this));
    };
    Ship.prototype.shootAmount = function (shootUp, amount) {
        for (var i = 0; i < amount; i++) {
            this.shoot(shootUp);
        }
    };
    Ship.prototype.createHitboxElements = function (nr) {
        var hitbox = document.createElement("div");
        hitbox.className = "hitbox_" + nr;
        this.element.appendChild(hitbox);
        return hitbox;
    };
    Ship.prototype.checkHitboxes = function () {
    };
    return Ship;
}());
var GameOverScreen = (function () {
    function GameOverScreen(g) {
        var _this = this;
        this.game = g;
        this.scene = document.createElement("endscreen");
        this.scene.className = "animated bounceInUp";
        g.game.appendChild(this.scene);
        var middle = document.createElement("div");
        middle.className = "centered";
        middle.innerHTML = "<b>GAME OVER!</b><small>Waves survived:</small>" + (this.game.score.waves - 1) + "<br /><small>Ships destroyed:</small>" + this.game.score.survived + "<br /><small>Fired cannons:</small>" + this.game.score.cannonsShoot + "<br />";
        var timeOut = 60;
        var addPoints = setInterval(function () {
            timeOut--;
            if (timeOut === 0) {
                _this.game.menu();
                clearInterval(addPoints);
                setTimeout(function () {
                    _this.scene.remove();
                }, 1000);
            }
            else {
            }
        }, 1000);
        var menuButton = document.createElement("a");
        menuButton.className = "back-to-menu";
        menuButton.innerHTML = "Back to menu";
        menuButton.href = "javascript:void(0)";
        menuButton.addEventListener("click", function () {
            clearInterval(addPoints);
            _this.game.menu();
        });
        middle.appendChild(menuButton);
        this.scene.appendChild(middle);
        this.game.themeMusic.fade(1, 0, 500);
        this.game.endsceneSound.play();
        setTimeout(function () {
            _this.game.themeMusic.fade(0, 1, 500);
        }, 5000);
    }
    GameOverScreen.prototype.update = function () {
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.isRunning = true;
        this.enemy = [];
        this.wave = 0;
        this.creatingNewWave = false;
        this.game = g;
        this.game.score = {
            waves: 0,
            survived: 0,
            cannonsShoot: 0
        };
        this.scene = document.createElement("playscreen");
        this.scene.className = "animated fadeInUp";
        g.game.appendChild(this.scene);
        this.player = new Player(g);
        this.scene.appendChild(this.player.getShip());
        new Clouds(this.scene);
        var island1 = new Island(this.scene, 'first');
        island1.position((window.innerWidth / 2 - 220), -50).big().show();
        var island2 = new Island(this.scene, 'second');
        island2.position(-(window.innerWidth / 2 + 140), 670).big().show();
        this.canonsLeft = document.createElement("div");
        this.canonsLeft.className = "canons-left";
        this.canonsLeft.innerHTML = "10";
        this.scene.appendChild(this.canonsLeft);
        this.healthBar = document.createElement("div");
        this.healthBar.className = "health-bar";
        this.healthBarIndicator = document.createElement("div");
        this.healthBarIndicator.className = "health-bar-indicator";
        this.healthBar.appendChild(this.healthBarIndicator);
        this.scene.appendChild(this.healthBar);
    }
    PlayScreen.prototype.update = function () {
        if (!this.isRunning || this.creatingNewWave) {
            return;
        }
        this.player.update();
        if (this.enemy.length === 0) {
            this.creatingNewWave = true;
            this.newWave();
            return;
        }
        for (var enemy = 0; enemy < this.enemy.length; enemy++) {
            this.enemy[enemy].update();
        }
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
        this.healthBarIndicator.style.width = this.player.health + "%";
        if (this.player.health < 0) {
            this.closeScene();
            return;
        }
        this.player.ship.refill();
        var available = Math.floor(this.player.ship.canonsAvailable);
        this.canonsLeft.innerHTML = (available < 10 ? "0" + String(available) : available) + " kanonnen over";
        for (var bullets = 0; bullets < this.game.bullets.length; bullets++) {
            this.game.bullets[bullets].update();
            if (this.game.bullets[bullets]._vissible) {
                if (this.game.bullets[bullets].isEnemyBullet) {
                    if (this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox1.getBoundingClientRect()) ||
                        this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox2.getBoundingClientRect()) ||
                        this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.player.ship.hitbox3.getBoundingClientRect())) {
                        this.player.gotShot();
                        this.game.bullets[bullets].boom();
                    }
                }
                else {
                    for (var enemy = 0; enemy < this.enemy.length; enemy++) {
                        if (this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox1.getBoundingClientRect()) ||
                            this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox2.getBoundingClientRect()) ||
                            this.checkCollision(this.game.bullets[bullets].element.getBoundingClientRect(), this.enemy[enemy].ship.hitbox3.getBoundingClientRect())) {
                            this.enemy[enemy].gotShot();
                            this.game.bullets[bullets].boom();
                        }
                    }
                }
            }
        }
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    PlayScreen.prototype.closeScene = function () {
        var _this = this;
        this.isRunning = false;
        new Woosh('scene');
        this.scene.className = "animated fadeOutUp";
        this.game.gameOver();
        setTimeout(function () {
            _this.scene.remove();
        }, 750);
    };
    PlayScreen.prototype.newWave = function () {
        var _this = this;
        this.wave++;
        this.game.score.waves++;
        this.game.bellSound.play();
        var waveText = document.createElement("div");
        waveText.className = "wave-number animated fadeInDown";
        waveText.innerHTML = "WAVE <b>" + this.wave + "</b>";
        document.body.appendChild(waveText);
        setTimeout(function () {
            waveText.className = "wave-number animated fadeOutDown";
            setTimeout(function () {
                waveText.remove();
            }, 2500);
        }, 2500);
        var amountOfShips = Math.floor(this.wave / 1.3);
        for (var i = 0; i < (amountOfShips == 0 ? 1 : amountOfShips); i++) {
            var enemyShip = new Enemy(this.game);
            this.scene.appendChild(enemyShip.getShip());
            this.enemy.push(enemyShip);
        }
        setTimeout(function () {
            _this.creatingNewWave = false;
        }, 100);
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