"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Bug Attack!
 * @author Max Anderson
 *
 * Event Listeners
 * Functions
 * Classes
 * Levels
 * Global Objects
 *
 */

/**
 * Event Listeners
 */
window.addEventListener("load", loadAssets);

/**
 * Functions
 */

/**
 * Preload fonts then init game
 * @return null
 */
function loadAssets() {
    document.fonts.load("50px 'Creepster', cursive", "'Press Start 2P', cursive").then(menu.init);
}

/**
 * Classes
 */

var Environment = function () {
    function Environment() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Environment);

        /**
         * Active enemies
         * @type {Array}
         */
        this.units = options.units !== undefined ? options.units : [];

        /**
         * Current level background
         * @type {String}
         */
        this.background = options.background !== undefined ? options.background : "background.png";

        /**
         * Game speed
         * @type {Number}
         */
        this.speed = options.speed !== undefined ? options.speed : 20;

        /**
         * Is game active
         * @type {object}
         */
        this.isActive = options.isActive !== undefined ? options.isActive : true;

        /**
         * Death audio object
         * @param {object}
         */
        this.audio = new Audio(directory + "axelf.mp3");

        /**
         * Is game muted
         * @type {Boolean}
         */
        this.isMuted = false;

        /**
         * Audio object 1
         * @param {object}
         */
        this.audio1 = new Audio(directory + "sfx_exp_short_hard3.wav");

        /**
         * Attack audio object
         * @param {object}
         */
        this.audio2 = new Audio(directory + "sfx_weapon_singleshot7.wav");

        /**
         * Damage audio object
         * @param {object}
         */
        this.audio3 = new Audio(directory + "sfx_sounds_damage3.wav");

        /**
         * Collection audio object
         * @param {object}
         */
        this.audio4 = new Audio(directory + "sfx_sounds_powerup2.wav");

        /**
         * Collection audio object
         * @param {object}
         */
        this.audio5 = new Audio(directory + "sfx_exp_medium7.wav");

        /**
         * Death audio object
         * @param {object}
         */
        this.audio6 = new Audio(directory + "sfx_exp_short_hard3.wav");
    }

    /**
     * Draw the background
     * @return null
     */


    _createClass(Environment, [{
        key: "drawBackground",
        value: function drawBackground() {
            var background = new Image();
            background.src = directory + "images/" + this.background;
            this.canvas.style.backgroundSize = "cover";
            this.canvas.style.backgroundImage = "url(" + directory + "images/" + this.background + ")";
        }

        /**
         * Draw the audio icon
         * @return null
         */

    }, {
        key: "drawAudio",
        value: function drawAudio() {
            var icon = new Image();
            if (this.isMuted) {
                icon.src = directory + "images/volume-off.png";
            } else {
                icon.src = directory + "images/volume-on.png";
            }
            GAME.context.drawImage(icon, 10, GAME.canvas.height - 50);
        }

        /**
         * Initialize the game
         * @return null
         */

    }, {
        key: "init",
        value: function init() {
            this.initCanvas();
            menu.init();
        }

        /**
         * Initialize the canvas
         * @return null
         */

    }, {
        key: "initCanvas",
        value: function initCanvas() {
            this.canvas = document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.canvas.width = 900;
            this.canvas.height = 600;
        }

        /**
         * Keydown controls
         */

    }, {
        key: "controlsKeydown",
        value: function controlsKeydown(event) {
            if (event.keyCode === 13) {
                //do something
            }
        }

        /**
         * Keyup controls
         */

    }, {
        key: "controlsKeyup",
        value: function controlsKeyup(event) {
            if (event.keyCode === 13) {
                //do something
            }
        }

        /**
         * Clear the canvas
         * @return null
         */

    }, {
        key: "clearCanvas",
        value: function clearCanvas() {
            GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
        }
    }]);

    return Environment;
}();

var Game = function (_Environment) {
    _inherits(Game, _Environment);

    function Game() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Game);

        /**
         * Active enemies
         * @type {Array}
         */

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

        _this.enemies = options.enemies !== undefined ? options.enemies : [];

        /**
         * Active enemy attacs
         * @type {Array}
         */
        _this.enemyAttacks = options.enemyAttacks !== undefined ? options.enemyAttacks : [];

        /**
         * Active power-up objects
         * @type {Array}
         */
        _this.powerUps = options.powerUps !== undefined ? options.powerUps : [];

        /**
         * Current level background
         * @type {String}
         */
        _this.background = options.background !== undefined ? options.background : "background.png";

        /**
         * Current game status
         * @type {Boolean}
         */
        _this.isActive = options.isActive !== undefined ? options.isActive : true;

        /**
         * Current game status
         * @type {Boolean}
         */
        _this.isBoss = options.isBoss !== undefined ? options.isBoss : false;

        /**
         * Current user score
         * @type {Number}
         */
        _this.score = options.score !== undefined ? options.score : 0;

        /**
         * Game speed
         * @type {Number}
         */
        _this.speed = options.speed !== undefined ? options.speed : 20;

        /**
         * Current game level
         * @type {Number}
         */
        _this.level = options.level !== undefined ? options.level : 1;

        /**
         * Current user lives
         * @type {Number}
         */
        _this.startingLives = options.startingLives !== undefined ? options.startingLives : 10;

        /**
         * Current user lives
         * @type {Number}
         */
        _this.lives = 10;

        /**
         * Current keydown listener
         * @type {}
         */
        _this.keydownListener = null;

        /**
         * Current keyup listener
         * @type {}
         */
        _this.keyupListener = null;
        return _this;
    }

    /**
     * Increment the score
     * @param  {integer} points Points to increment
     * @return null
     */


    _createClass(Game, [{
        key: "incrementScore",
        value: function incrementScore(points) {
            this.score += points;
        }

        /**
         * Draw the background
         * @return null
         */

    }, {
        key: "drawBackground",
        value: function drawBackground() {
            var background = new Image();
            background.src = directory + "images/" + GAME.background;
            GAME.canvas.style.backgroundSize = "cover";
            GAME.canvas.style.backgroundImage = "url(" + directory + "images/" + GAME.background + ")";
        }

        /**
         * Initialize the game
         * @return null
         */

    }, {
        key: "init",
        value: function init() {
            GAME.initCanvas();
            menu.drawStartScreen();
            window.addEventListener("keydown", GAME.controlsKeydownStart);
            GAME.keydownListener = GAME.controlsKeydownStart;
        }

        /**
         * Initialize the canvas
         * @return null
         */

    }, {
        key: "initCanvas",
        value: function initCanvas() {
            GAME.canvas = document.getElementById("canvas");
            GAME.context = GAME.canvas.getContext("2d");
            GAME.canvas.width = 900;
            GAME.canvas.height = 600;
        }

        /**
         * Initialize current level
         * @param  {integer} number [The current level number]
         * @return null
         */

    }, {
        key: "initLevel",
        value: function initLevel() {
            switch (GAME.level) {
                case 1:
                    level1();
                    break;
                case 2:
                    level2();
                    break;
                case 3:
                    level3();
                    break;
                case 4:
                    level4();
                    break;
                case 5:
                    level5();
                    break;
                case 6:
                    level6();
                    break;
                case 7:
                    level7();
                    break;
                case 8:
                    level8();
                    break;
                case 9:
                    level9();
                    break;
                case 10:
                    level10();
                    break;
                default:
                    level11();
            }
        }

        /**
         * The main function is the central controller for the
         * game. This determines what actions are carried out
         * in each frame/cycle of the game.
         * @return null
         */

    }, {
        key: "main",
        value: function main() {
            if (GAME.isActive) {
                GAME.setEnemyMovement();
                GAME.moveEnemies();
                GAME.moveUser();
                GAME.moveAttacks();
                GAME.moveEnemyAttacks();
                GAME.movePowerUps();
                GAME.createEnemyAttacks();
                GAME.createUserAttacks();
                GAME.checkHit();
                GAME.checkDamage();
                GAME.checkPowerUps();
                GAME.animateEnemies();
            }
            GAME.clearCanvas();
            if (GAME.isBoss) {
                if (GAME.enemies.length) {
                    GAME.enemies[0].drawHealthContainer();
                    GAME.enemies[0].drawHealth();
                }
            }
            GAME.drawEnemies();
            user.draw();
            GAME.drawPowerUps();
            GAME.drawAttacks();
            GAME.drawEnemyAttacks();
            GAME.drawScore();
            GAME.drawLevel();
            GAME.drawLives();
            GAME.drawClears();
            GAME.drawBombs();
            environment.drawAudio();
            if (!GAME.isActive) {
                GAME.drawPaused();
            }
            GAME.checkWin();
            GAME.checkLoss();
            if (GAME.isActive) {
                setTimeout(GAME.main, GAME.speed);
            }
        }

        /**
         * Draw all user attacks onto the canvas
         * @return null
         */

    }, {
        key: "drawAttacks",
        value: function drawAttacks() {
            for (var i = 0; i < user.attacks.length; i++) {
                user.attacks[i].draw();
            }
        }

        /**
         * Move all user attacks
         * @return null
         */

    }, {
        key: "moveAttacks",
        value: function moveAttacks() {
            for (var i = 0; i < user.attacks.length; i++) {
                user.attacks[i].move();
            }
        }

        /**
         * Generate enemy attacks
         * @return null
         */

    }, {
        key: "createEnemyAttacks",
        value: function createEnemyAttacks() {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].attack();
            }
        }

        /**
         * Create user attacks
         * @return null
         */

    }, {
        key: "createUserAttacks",
        value: function createUserAttacks() {
            if (user.isAttacking) {
                user.attack();
            }
        }

        /**
         * Draw enemy attacks to the canvas
         * @return null
         */

    }, {
        key: "drawEnemyAttacks",
        value: function drawEnemyAttacks() {
            for (var i = 0; i < GAME.enemyAttacks.length; i++) {
                GAME.enemyAttacks[i].draw();
            }
        }

        /**
         * Move enemy attacks
         * @return null
         */

    }, {
        key: "moveEnemyAttacks",
        value: function moveEnemyAttacks() {
            for (var i = 0; i < GAME.enemyAttacks.length; i++) {
                GAME.enemyAttacks[i].moveDown();
            }
        }

        /**
         * Draw the paused screen
         * @return null
         */

    }, {
        key: "drawPaused",
        value: function drawPaused() {
            this.context.textAlign = "center";
            this.context.fillStyle = "black";
            this.context.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
        }

        /**
         * Check if any enemies have been hit by user attacks
         * @return null
         */

    }, {
        key: "checkHit",
        value: function checkHit() {
            for (var i = 0; i < user.attacks.length; i++) {
                for (var j = 0; j < this.enemies.length; j++) {
                    if (this.hitChecker(user.attacks[i], this.enemies[j])) {
                        this.resolveHit(this.enemies[j], user.attacks[i], i, j);
                        break;
                    } else {
                        if (user.attacks[i].checkInBounds()) {
                            user.attacks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

        /**
         * Handle enemy being hit
         * @param  {object} enemy  The enemy object that was hit
         * @param  {object} attack The projectile object that hit the enemy
         * @param  {integer} i     The attack's position in the attacks array
         * @param  {integer} j     The enemy's position in the enemies array
         * @return null
         */

    }, {
        key: "resolveHit",
        value: function resolveHit(enemy, attack, i, j) {
            enemy.health -= attack.damage;
            if (enemy.health <= 0) {
                enemy.onDeath();
                this.enemies.splice(j, 1);
            }
            user.attacks.splice(i, 1);
        }

        /**
         * Check if the objects have collided
         * @param  {object} object1 The first object being tested
         * @param  {object} object2 The second object being tested
         * @return {boolean}
         */

    }, {
        key: "hitChecker",
        value: function hitChecker(object1, object2) {
            if (object1.xPosition + object1.width * object1.scale >= object2.xPosition && object1.xPosition <= object2.xPosition + object2.width * object2.scale && object1.yPosition + object1.height * object1.scale >= object2.yPosition && object1.yPosition <= object2.yPosition + object2.height * object2.scale) {
                return true;
            }
            return false;
        }

        /**
         * Check if user has been hit by any enemy attacks
         * @return null
         */

    }, {
        key: "checkDamage",
        value: function checkDamage() {
            for (var i = 0; i < this.enemyAttacks.length; i++) {
                if (this.hitChecker(this.enemyAttacks[i], user)) {
                    this.enemyAttacks.splice(i, 1);
                    this.lives--;
                    if (!environment.isMuted) {
                        user.damageAudio.play();
                    }
                } else {
                    if (this.enemyAttacks[i].checkInBounds()) {
                        this.enemyAttacks.splice(i, 1);
                    }
                }
            }
        }

        /**
         * Check if user has collected any power-ups
         * @return null
         */

    }, {
        key: "checkPowerUps",
        value: function checkPowerUps() {
            for (var i = 0; i < this.powerUps.length; i++) {
                if (this.hitChecker(this.powerUps[i], user)) {
                    this.powerUps[i].onCollect();
                    this.powerUps.splice(i, 1);
                } else {
                    if (this.powerUps[i].checkInBounds()) {
                        this.powerUps.splice(i, 1);
                    }
                }
            }
        }

        /**
         * Check if all enemies have been destroyed
         * @return null
         */

    }, {
        key: "checkWin",
        value: function checkWin() {
            if (!this.enemies.length) {
                this.resolveWin();
            }
        }

        /**
         * Prepare for next level
         * @return null
         */

    }, {
        key: "resolveWin",
        value: function resolveWin() {
            this.clearCanvas();
            this.isActive = false;
            this.isBoss = false;
            user.isAttacking = false;
            user.attacks = [];
            this.enemyAttacks = [];
            this.powerUps = [];
            this.drawWin();
            this.level++;
            window.removeEventListener("keydown", this.keydownListener);
            window.removeEventListener("keyup", this.keyupListener);
            window.addEventListener("keydown", menu.controlsKeydownStart);
            this.keydownListener = menu.controlsKeydownStart;
        }

        /**
         * Check if user has lost
         * @return null
         */

    }, {
        key: "checkLoss",
        value: function checkLoss() {
            if (this.lives <= 0) {
                GAME.clearCanvas();
                GAME.drawLoss();
                GAME.resetGame();
                window.removeEventListener("keydown", GAME.keydownListener);
                window.removeEventListener("keyup", GAME.keyupListener);
                window.addEventListener("keydown", menu.controlsKeydownStart);
                GAME.keydownListener = menu.controlsKeydownStart;
            }
        }

        /**
         * Reset the game
         * @return null
         */

    }, {
        key: "resetGame",
        value: function resetGame() {
            user = new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
            this.isActive = false;
            this.isBoss = false;
            this.level = 1;
            this.lives = this.startingLives;
            this.score = 0;
            this.enemies = [];
            this.enemyAttacks = [];
            this.powerUps = [];
            user.attacks = [];
        }

        /**
         * Controls for keydown events
         * @param  {event} event The event
         * @return null
         */

    }, {
        key: "controlsKeydownLevel",
        value: function controlsKeydownLevel(event) {
            if (event.keyCode === 13) {
                if (GAME.isActive) {
                    GAME.isActive = false;
                } else {
                    GAME.isActive = true;
                    GAME.main();
                }
            } else if (event.keyCode === 32) {
                user.isAttacking = true;
            } else if (event.keyCode === 37) {
                user.isMoving = true;
                user.movingRight = false;
                GAME.keyCode = event.keyCode;
            } else if (event.keyCode === 39) {
                user.isMoving = true;
                user.movingRight = true;
                GAME.keyCode = event.keyCode;
            } else if (event.keyCode === 65) {
                if (user.clears >= 1) {
                    user.clears--;
                    GAME.enemyAttacks = [];
                }
            } else if (event.keyCode === 68) {
                if (user.bombs >= 1) {
                    user.bombs--;
                    GAME.createBomb();
                }
            } else if (event.keyCode === 77) {
                if (environment.isMuted) {
                    menu.audio.muted = false;
                } else {
                    menu.audio.muted = true;
                }
                environment.isMuted = !environment.isMuted;
                if (!GAME.isActive) {
                    GAME.main();
                }
            }
        }

        /**
         * Controls for keyup events
         * @param  {event} event The event
         * @return null
         */

    }, {
        key: "controlsKeyupLevel",
        value: function controlsKeyupLevel(event) {
            if (GAME.isActive) {
                if (event.keyCode === 32) {
                    user.isAttacking = false;
                } else if (event.keyCode === 37 && GAME.keyCode == event.keyCode) {
                    user.isMoving = false;
                } else if (event.keyCode === 39 && GAME.keyCode == event.keyCode) {
                    user.isMoving = false;
                }
            }
        }

        /**
         * Move the user
         * @return null
         */

    }, {
        key: "moveUser",
        value: function moveUser() {
            if (user.isMoving) {
                if (user.movingRight) {
                    user.moveRight();
                } else {
                    user.moveLeft();
                }
            }
        }

        /**
         * Draw all enemies
         * @return null
         */

    }, {
        key: "drawEnemies",
        value: function drawEnemies() {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].draw();
            }
        }

        /**
         * Update current animation frame for all enemies
         * @return null
         */

    }, {
        key: "animateEnemies",
        value: function animateEnemies() {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].updateFrame();
            }
        }

        /**
         * Draw all power-ups
         * @return {[type]} [description]
         */

    }, {
        key: "drawPowerUps",
        value: function drawPowerUps() {
            for (var i = 0; i < this.powerUps.length; i++) {
                this.powerUps[i].draw();
            }
        }

        /**
         * Move all power-ups
         * @return null
         */

    }, {
        key: "movePowerUps",
        value: function movePowerUps() {
            for (var i = 0; i < this.powerUps.length; i++) {
                this.powerUps[i].moveDown();
            }
        }

        /**
         * Move all enemies
         * @return {[type]} [description]
         */

    }, {
        key: "moveEnemies",
        value: function moveEnemies() {
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].move();
            }
        }

        /**
         * Draw the current score
         * @return null
         */

    }, {
        key: "drawScore",
        value: function drawScore() {
            this.context.textAlign = "left";
            this.context.fillStyle = "black";
            this.context.font = "20px 'Press Start 2P', cursive";
            this.context.fillText("Score: " + this.score, 10, 35);
        }

        /**
         * Draw the current level counter
         * @return null
         */

    }, {
        key: "drawLevel",
        value: function drawLevel() {
            this.context.textAlign = "center";
            this.context.fillStyle = "black";
            this.context.fillText("Level: " + this.level, this.canvas.width / 2, 35);
        }

        /**
         * Draw the current lives counter
         * @return null
         */

    }, {
        key: "drawLives",
        value: function drawLives() {
            var image = new Image();
            image.src = directory + "images/extra-life.png";

            if (this.lives <= 5) {
                for (var i = 0; i < this.lives; i++) {
                    this.context.drawImage(image, this.canvas.width - 10 - 35 * (i + 1), 10, 25, 25);
                }
            } else {
                this.context.drawImage(image, this.canvas.width - 125, 10, 25, 25);
                this.context.textAlign = "left";
                this.context.fillStyle = "black";
                this.context.fillText("x" + this.lives, this.canvas.width - 90, 35);
            }
        }

        /**
         * Draw the current lives counter
         * @return null
         */

    }, {
        key: "drawClears",
        value: function drawClears() {
            var image = new Image();
            image.src = directory + "images/blue.png";

            if (user.clears <= 4) {
                for (var i = 0; i < user.clears; i++) {
                    this.context.drawImage(image, this.canvas.width - 10 - 35 * (i + 1), 45, 25, 25);
                }
            } else {
                this.context.drawImage(image, this.canvas.width - 125, 45, 25, 25);
                this.context.textAlign = "left";
                this.context.fillStyle = "black";
                this.context.fillText("x" + user.clears, this.canvas.width - 90, 70);
            }
        }

        /**
         * Draw the current lives counter
         * @return null
         */

    }, {
        key: "drawBombs",
        value: function drawBombs() {
            var image = new Image();
            image.src = directory + "images/white.png";

            if (user.bombs <= 4) {
                for (var i = 0; i < user.bombs; i++) {
                    this.context.drawImage(image, this.canvas.width - 10 - 35 * (i + 1), 80, 25, 25);
                }
            } else {
                this.context.drawImage(image, this.canvas.width - 125, 80, 25, 25);
                this.context.textAlign = "left";
                this.context.fillStyle = "black";
                this.context.fillText("x" + user.bombs, this.canvas.width - 90, 105);
            }
        }

        /**
         * Draw level complete screen
         * @return null
         */

    }, {
        key: "drawWin",
        value: function drawWin() {
            this.context.textAlign = "center";
            this.context.fillText("Level " + this.level + " complete!", this.canvas.width / 2, this.canvas.height / 2);
            this.context.fillText("Press Enter to Start Next Level", this.canvas.width / 2, this.canvas.height / 2 + 35);
            this.context.fillText("Score: " + this.score, this.canvas.width / 2, this.canvas.height / 2 + 65);
        }

        /**
         * Draw game over screen
         * @return null
         */

    }, {
        key: "drawLoss",
        value: function drawLoss() {
            this.context.textAlign = "center";
            this.context.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
            this.context.fillText("Press Enter to Restart", this.canvas.width / 2, this.canvas.height / 2 + 35);
            this.context.fillText("Final Score: " + this.score, this.canvas.width / 2, this.canvas.height / 2 + 65);
        }

        /**
         * Set movement direction for all enemies
         * @return null
         */

    }, {
        key: "setEnemyMovement",
        value: function setEnemyMovement() {
            for (var i = 0; i < this.enemies.length; i++) {
                for (var j = 0; j < this.enemies.length; j++) {
                    if (i != j) {
                        GAME.checkCollision(this.enemies[i], this.enemies[j]);
                    }
                }
                this.enemies[i].setMovement();
            }
        }

        /**
         * Check if the enemies are colliding, and change movement directions if so
         * @param  {object} unit1 First unit
         * @param  {object} unit2 Second unit
         * @return null
         */

    }, {
        key: "checkCollision",
        value: function checkCollision(unit1, unit2) {
            var dx = unit1.xPosition + unit1.width * unit1.scale / 2 - (unit2.xPosition + unit2.width * unit2.scale / 2);
            var dy = unit1.yPosition + unit1.height * unit1.scale / 2 - (unit2.yPosition + unit2.height * unit2.scale / 2);
            var width = (unit1.width * unit1.scale + unit2.width * unit2.scale) / 2;
            var height = (unit1.height * unit1.scale + unit2.height * unit2.scale) / 2;
            var crossWidth = width * dy;
            var crossHeight = height * dx;

            if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                if (crossWidth > crossHeight) {
                    if (crossWidth > -crossHeight) {
                        // unit1 top collision
                        // unit2 bottom collision
                        unit1.movingUp = false;
                        unit2.movingUp = true;
                    } else {
                        // unit1 right collision
                        // unit2 left collision
                        unit1.movingRight = false;
                        unit2.movingRight = true;
                    }
                } else {
                    if (crossWidth > -crossHeight) {
                        // unit1 left collision
                        // unit2 right collision
                        unit1.movingRight = true;
                        unit2.movingRight = false;
                    } else {
                        // unit1 bottom collision
                        // unit2 top collision
                        unit1.movingUp = true;
                        unit2.MovingUp = false;
                    }
                }
            }
        }

        /**
         * Create a new bomb (specifically new projectiles)
         * @return null
         */

    }, {
        key: "createBomb",
        value: function createBomb() {
            var x = Math.floor(this.canvas.width / 10 + Math.random() * this.canvas.width * 0.8);
            var y = Math.floor(this.canvas.height / 10 + Math.random() * this.canvas.height * 0.8);
            for (var i = 0; i < 25; i++) {
                user.attacks.push(new Projectile(x, y, { damage: user.attackDamage }).randomizeMovement().randomizeSpeed());
            }
            if (!environment.isMuted) {
                environment.audio5.play();
            }
        }
    }]);

    return Game;
}(Environment);

var Menu = function (_Environment2) {
    _inherits(Menu, _Environment2);

    function Menu() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this));

        _this2.controlsKeydown = _this2.controlsKeydownStart;
        _this2.currentScreen = _this2.drawStartScreen;
        return _this2;
    }

    /**
     * Initialize the game
     * @return null
     */


    _createClass(Menu, [{
        key: "init",
        value: function init() {
            GAME.initCanvas();
            window.addEventListener("keydown", menu.controlsKeydownStart);
            GAME.keydownListener = menu.controlsKeydownStart;
            window.addEventListener("keydown", function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
            GAME.drawBackground();
            menu.units.push(new Bee(canvas.width / 2, canvas.height / 2, { attackRate: 0, ySpeed: 1 }).randomizeMovement());
            menu.main();
            menu.audio.loop = true;
            menu.audio.play();
        }
    }, {
        key: "controlsKeydownStart",
        value: function controlsKeydownStart(event) {
            if (event.keyCode === 13) {
                menu.clearCanvas();
                menu.isActive = false;
                GAME.isActive = true;
                window.removeEventListener("keydown", GAME.keydownListener);
                window.removeEventListener("keyup", GAME.keyupListener);
                window.addEventListener("keydown", GAME.controlsKeydownLevel);
                window.addEventListener("keyup", GAME.controlsKeyupLevel);
                GAME.keydownListener = GAME.controlsKeydownLevel;
                GAME.keyupListener = GAME.controlsKeyupLevel;
                GAME.initLevel();
            }
            if (event.keyCode === 67) {
                menu.currentScreen = menu.drawControlsScreen;
                menu.changeKeydownListener(menu.controlsKeydownControls);
            }
            if (event.keyCode === 77) {
                if (environment.isMuted) {
                    menu.audio.muted = false;
                } else {
                    menu.audio.muted = true;
                }
                environment.isMuted = !environment.isMuted;
            }
            if (event.keyCode === 85) {
                menu.currentScreen = menu.drawUpgradeScreen;
                menu.changeKeydownListener(menu.controlsKeydownUpgrades);
            }
        }
    }, {
        key: "controlsKeydownUpgrades",
        value: function controlsKeydownUpgrades(event) {
            if (event.keyCode === 27 || event.keyCode === 66 || event.keyCode === 85 || event.keyCode === 13 || event.keyCode === 32) {
                menu.currentScreen = menu.drawStartScreen;
                menu.changeKeydownListener(menu.controlsKeydownStart);
            }
            if (event.keyCode === 77) {
                if (environment.isMuted) {
                    menu.audio.muted = false;
                } else {
                    menu.audio.muted = true;
                }
                environment.isMuted = !environment.isMuted;
            }
        }
    }, {
        key: "controlsKeydownControls",
        value: function controlsKeydownControls(event) {
            if (event.keyCode === 27 || event.keyCode === 66 || event.keyCode === 67 || event.keyCode === 13 || event.keyCode === 32) {
                menu.currentScreen = menu.drawStartScreen;
                menu.changeKeydownListener(menu.controlsKeydownStart);
            }
            if (event.keyCode === 77) {
                if (environment.isMuted) {
                    menu.audio.muted = false;
                } else {
                    menu.audio.muted = true;
                }
                environment.isMuted = !environment.isMuted;
            }
        }
    }, {
        key: "main",
        value: function main() {
            menu.clearCanvas();
            menu.drawUnits();
            menu.currentScreen();
            environment.drawAudio();
            if (menu.isActive) {
                setTimeout(menu.main, GAME.speed);
            }
        }

        /**
         * Draw the start screen
         * @return null
         */

    }, {
        key: "drawStartScreen",
        value: function drawStartScreen() {
            GAME.context.font = "100px 'Creepster', cursive";
            GAME.context.textAlign = "center";
            GAME.context.fillText("Bug Attack!", GAME.canvas.width / 2, GAME.canvas.height / 2);
            GAME.context.font = "20px 'Press Start 2P'";
            GAME.context.fillText("Press Enter to Start", GAME.canvas.width / 2, GAME.canvas.height / 2 + 35);
            GAME.context.fillText("U - Upgrades", GAME.canvas.width / 2, GAME.canvas.height / 2 + 95);
            GAME.context.fillText("C - Controls", GAME.canvas.width / 2, GAME.canvas.height / 2 + 130);
        }
    }, {
        key: "changeKeydownListener",
        value: function changeKeydownListener(listener) {
            window.removeEventListener("keydown", GAME.keydownListener);
            window.addEventListener("keydown", listener);
            GAME.keydownListener = listener;
        }

        /**
         * Draw the start screen
         * @return null
         */

    }, {
        key: "drawControlsScreen",
        value: function drawControlsScreen() {
            GAME.context.font = "20px 'Press Start 2P'";
            GAME.context.textAlign = "center";

            GAME.context.fillText("Left/Right Arrows - Move", GAME.canvas.width / 2, 55);
            GAME.context.fillText("Spacebar - Attack", GAME.canvas.width / 2, 90);
            GAME.context.fillText("A Key - Clear Board (of Enemy Attacks)", GAME.canvas.width / 2, 125);
            GAME.context.fillText("D Key - Bomb", GAME.canvas.width / 2, 160);
            GAME.context.fillText("Enter - Pause", GAME.canvas.width / 2, 195);
            GAME.context.fillText("M Key - Mute", GAME.canvas.width / 2, 230);
        }

        /**
         * Draw the start screen
         * @return null
         */

    }, {
        key: "drawUpgradeScreen",
        value: function drawUpgradeScreen() {
            GAME.context.font = "20px 'Press Start 2P'";
            GAME.context.textAlign = "left";

            var green = new Image();
            green.src = directory + "images/green.png";
            GAME.context.drawImage(green, 20, 20, 50, 50);
            GAME.context.fillText("Movement speed upgrade", 90, 55);

            var red = new Image();
            red.src = directory + "images/red.png";
            GAME.context.drawImage(red, 20, 90, 50, 50);
            GAME.context.fillText("Weapon upgrade", 90, 125);

            var yellow = new Image();
            yellow.src = directory + "images/yellow.png";
            GAME.context.drawImage(yellow, 20, 160, 50, 50);
            GAME.context.fillText("Decrease user size", 90, 195);

            var black = new Image();
            black.src = directory + "images/black.png";
            GAME.context.drawImage(black, 20, 230, 50, 50);
            GAME.context.fillText("Attack damage upgrade", 90, 265);

            var orange = new Image();
            orange.src = directory + "images/orange.png";
            GAME.context.drawImage(orange, 20, 300, 50, 50);
            GAME.context.fillText("Attack rate upgrade", 90, 335);

            var purple = new Image();
            purple.src = directory + "images/purple.png";
            GAME.context.drawImage(purple, 20, 370, 50, 50);
            GAME.context.fillText("Attack velocity upgrade", 90, 405);

            var blue = new Image();
            blue.src = directory + "images/blue.png";
            GAME.context.drawImage(blue, 20, 440, 50, 50);
            GAME.context.fillText("Extra Board Clear", 90, 475);

            var white = new Image();
            white.src = directory + "images/white.png";
            GAME.context.drawImage(white, 20, 510, 50, 50);
            GAME.context.fillText("Extra Bomb", 90, 545);
        }
    }, {
        key: "drawUnits",
        value: function drawUnits() {
            for (var i = 0; i < this.units.length; i++) {
                this.units[i].setMovement().move().updateFrame().draw();
            }
        }
    }]);

    return Menu;
}(Environment);

/**
 * Basic unit object
 */


var Unit = function () {
    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Unit() {
        var xPos = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var yPos = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Unit);

        /**
         * Set horizontal position
         * @type {integer}
         */
        this.xPosition = xPos;

        /**
         * Set vertical position
         * @type {integer}
         */
        this.yPosition = yPos;

        /**
         * Vertical movement direction
         * @type {Boolean}
         */
        this.movingUp = options.movingUp !== undefined ? options.movingUp : true;

        /**
         * Horizontal movement direction
         * @type {Boolean}
         */
        this.movingRight = options.movingRight !== undefined ? options.movingRight : true;

        /**
         * Vertical speed
         * @type {Number}
         */
        this.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 5;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 0;

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 10;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 10;

        /**
         * Size multiplier
         * @type {Number}
         */
        this.scale = options.scale !== undefined ? options.scale : 1;

        /**
         * Current animation frame
         * @type {integer}
         */
        this.currentFrame = options.currentFrame !== undefined ? options.currentFrame : 0;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 20;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        this.numberOfFrames = 1;

        /**
         * Death audio object
         * @param {object}
         */
        this.deathAudio = environment.audio1;
    }

    /**
     * Draw the user
     * @return this
     */


    _createClass(Unit, [{
        key: "draw",
        value: function draw() {
            GAME.context.drawImage(this.image, this.currentFrame * this.width, 0, this.width, this.height, this.xPosition, this.yPosition, this.getWidth(), this.getHeight());
            return this;
        }

        /**
         * [updateFrameCount description]
         * @return {[type]} [description]
         */

    }, {
        key: "updateFrame",
        value: function updateFrame() {
            this.delayCount++;
            if (this.delayCount > this.frameDelay) {
                this.delayCount = 0;
                if (this.currentFrame < this.numberOfFrames - 1) {
                    this.currentFrame++;
                } else {
                    this.currentFrame = 0;
                }
            }
            return this;
        }

        /**
         * Move the projectile right
         * @return this
         */

    }, {
        key: "moveRight",
        value: function moveRight() {
            this.xPosition += this.xSpeed;
            return this;
        }

        /**
         * Move the projectile left
         * @return this
         */

    }, {
        key: "moveLeft",
        value: function moveLeft() {
            this.xPosition -= this.xSpeed;
            return this;
        }

        /**
         * Move the projectile up
         * @return this
         */

    }, {
        key: "moveUp",
        value: function moveUp() {
            this.yPosition -= this.ySpeed;
            return this;
        }

        /**
         * Move the projectile down
         * @return this
         */

    }, {
        key: "moveDown",
        value: function moveDown() {
            this.yPosition += this.ySpeed;
            return this;
        }

        /**
         *
         */

    }, {
        key: "move",
        value: function move() {
            if (this.movingRight) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
            if (this.movingUp) {
                this.moveUp();
            } else {
                this.moveDown();
            }
            return this;
        }

        /**
         * Randomize horizontal movement direction
         * @return this
         */

    }, {
        key: "randomizeXMovement",
        value: function randomizeXMovement() {
            this.movingRight = Math.floor(Math.random() * 2) ? true : false;
            return this;
        }

        /**
         * Randomize vertical movement direction
         * @return this
         */

    }, {
        key: "randomizeYMovement",
        value: function randomizeYMovement() {
            this.movingUp = Math.floor(Math.random() * 2) ? true : false;
            return this;
        }

        /**
         * Randomize vertical and horizontal movement directions
         * @return this
         */

    }, {
        key: "randomizeMovement",
        value: function randomizeMovement() {
            this.randomizeXMovement();
            this.randomizeYMovement();
            return this;
        }

        /**
         *
         */

    }, {
        key: "setMovement",
        value: function setMovement() {
            if (this.xPosition >= GAME.canvas.width - this.width * this.scale) {
                this.movingRight = false;
            } else if (this.xPosition <= 0) {
                this.movingRight = true;
            }
            if (this.yPosition + this.height * this.scale >= GAME.canvas.height - 150) {
                this.movingUp = true;
            } else if (this.yPosition <= 0) {
                this.movingUp = false;
            }
            return this;
        }

        /**
         * Adjust speed by given multiplier
         * @param {number} number  The desired speed multiplier
         */

    }, {
        key: "adjustSpeed",
        value: function adjustSpeed(number) {
            this.xSpeed = this.xSpeed * number;
            this.ySpeed = this.ySpeed * number;
            return this;
        }

        /**
         * Randomize horizontal speed
         * @param  {number} min  Minimum speed
         * @param  {number} max  Maximum speed
         * @return this
         */

    }, {
        key: "randomizeXSpeed",
        value: function randomizeXSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.xSpeed = Math.floor(min + Math.random() * (max - min + 1));
            return this;
        }

        /**
         * Randomize vertical speed
         * @param  {number} min  Minimum speed
         * @param  {number} max  Maximum speed
         * @return this
         */

    }, {
        key: "randomizeYSpeed",
        value: function randomizeYSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.ySpeed = Math.floor(min + Math.random() * (max - min + 1));
            return this;
        }
    }, {
        key: "randomizeSpeed",
        value: function randomizeSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.randomizeXSpeed(min, max);
            this.randomizeYSpeed(min, max);
            return this;
        }

        /**
         * Return scaled width
         * @return {number}
         */

    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.width * this.scale;
        }

        /**
         * Return scaled height
         * @return {number}
         */

    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.height * this.scale;
        }

        /**
         * Check if unit is out of bounds
         * @param  {object} unit The unit to check
         * @return {boolean}
         */

    }, {
        key: "checkInBounds",
        value: function checkInBounds() {
            if (this.xPosition + this.width <= 0 || this.xPosition >= GAME.canvas.width || this.yPosition + this.height <= 0 || this.yPosition >= GAME.canvas.height) {
                return true;
            }
            return false;
        }
    }]);

    return Unit;
}();

/**
 * Basic attack object, either enemy or user
 */


var Projectile = function (_Unit) {
    _inherits(Projectile, _Unit);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Projectile(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Projectile);

        /**
         * Damage amount
         * @type {Number}
         */

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Projectile).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this3.damage = options.damage !== undefined ? options.damage : 1;

        /**
         * Unit image
         * @type Image object
         */
        _this3.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this3.image.src = options.src !== undefined ? options.src : directory + "images/projectile1.png";

        /**
         * Object width
         * @type {Number}
         */
        _this3.width = options.width !== undefined ? options.width : 12;

        /**
         * Object height
         * @type {Number}
         */
        _this3.height = options.height !== undefined ? options.height : 12;
        return _this3;
    }

    /**
     * The point cost per attack
     * @return {number} Cost per attack (in points)
     */


    _createClass(Projectile, null, [{
        key: "cost",
        value: function cost() {
            return 5;
        }
    }]);

    return Projectile;
}(Unit);

/**
 * Basic user object
 */


var Person = function (_Unit2) {
    _inherits(Person, _Unit2);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Person(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Person);

        /**
         * Horizontal speed
         * @type {Number}
         */

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Person).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this4.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 6;

        /**
         * Vertical speed
         * @type {Number}
         */
        _this4.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 0;

        /**
         * Object width
         * @type {Number}
         */
        _this4.width = options.width !== undefined ? options.width : 75;

        /**
         * Height width
         * @type {Number}
         */
        _this4.height = options.height !== undefined ? options.height : 75;

        /**
         * Attack level
         * @type {Number}
         */
        _this4.attackLevel = options.attackLevel !== undefined ? options.attackLevel : 1;

        /**
         * Attack damage
         * @type {number}
         */
        _this4.attackDamage = options.attackDamage !== undefined ? options.attackDamage : 1;

        /**
         * Attack rate, in milliseconds between shots
         * @type {Number}
         */
        _this4.attackRate = options.attackRate !== undefined ? options.attackRate : 250;

        /**
         * Attack speed multiplier
         * @type {Number}
         */
        _this4.attackSpeed = options.attackSpeed !== undefined ? options.attackSpeed : 1;

        /**
         * Number of enemy attack clears
         * @type {integer}
         */
        _this4.clears = options.clears !== undefined ? options.clears : 5;

        /**
         * Number of enemy attack clears
         * @type {integer}
         */
        _this4.bombs = options.bombs !== undefined ? options.bombs : 5;

        /**
         * Is able to shoot
         * @type {boolean}
         */
        _this4.canAttack = options.canAttack !== undefined ? options.canAttack : true;

        /**
         * Unit image
         * @type Image object
         */
        _this4.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this4.image.src = directory + "images/carl.png";

        /**
         * Attack audio object
         * @param {object}
         */
        _this4.attackAudio = environment.audio2;

        /**
         * Attack audio object
         * @param {object}
         */
        _this4.damageAudio = environment.audio3;

        /**
         * User is moving
         * @type {Boolean}
         */
        _this4.isMoving = options.isMoving !== undefined ? options.isMoving : false;

        /**
         * Active user attacks
         * @type {Array}
         */
        _this4.attacks = [];
        return _this4;
    }

    /**
     * Move the user left
     * @return this
     */


    _createClass(Person, [{
        key: "moveLeft",
        value: function moveLeft() {
            if (this.xPosition >= 0) {
                this.xPosition -= this.xSpeed;
            }
            return this;
        }

        /**
         * Move the user right
         * @return this
         */

    }, {
        key: "moveRight",
        value: function moveRight() {
            if (this.xPosition + this.getWidth() <= GAME.canvas.width) {
                this.xPosition += this.xSpeed;
            }
            return this;
        }

        /**
         * Reset the user's position and movement state
         */

    }, {
        key: "resetPosition",
        value: function resetPosition() {
            this.xPosition = GAME.canvas.width / 2;
            this.isMoving = false;
            return this;
        }

        /**
         * Create a new attack
         * @return null
         */

    }, {
        key: "attack",
        value: function attack() {
            if (this.canAttack) {
                if (!environment.isMuted) {
                    this.attackAudio.play();
                }
                this.canAttack = false;
                switch (this.attackLevel) {
                    case 1:
                        this.attacks.push(new Projectile(this.xPosition + 59 * this.scale, this.yPosition, { damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        GAME.score -= Projectile.cost();
                        break;
                    case 2:
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: true, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: false, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        GAME.score -= Projectile.cost();
                        break;
                    case 3:
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: true, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: false, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        GAME.score -= Projectile.cost();
                        break;
                    default:
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: true, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: false, xSpeed: 1, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: true, xSpeed: 2, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, { movingRight: false, xSpeed: 2, damage: this.attackDamage }).adjustSpeed(this.attackSpeed));
                        GAME.score -= Projectile.cost();
                }
                setTimeout(this.resetAttack.bind(this), this.attackRate);
            }
        }
    }, {
        key: "resetAttack",
        value: function resetAttack() {
            this.canAttack = true;
        }
    }]);

    return Person;
}(Unit);

var PowerUp = function (_Unit3) {
    _inherits(PowerUp, _Unit3);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function PowerUp(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, PowerUp);

        /**
         * Horizontal movement speed
         * @type {Number}
         */

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(PowerUp).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this5.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 0;

        /**
         * Vertical movement speed
         * @type {Number}
         */
        _this5.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 2;

        /**
         * Object width
         * @type {Number}
         */
        _this5.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        _this5.height = options.height !== undefined ? options.height : 75;

        /**
         * Object's image
         * @type Image object
         */
        _this5.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this5.image.src = directory + "images/black.png";

        /**
         * Collection audio object
         * @param {object}
         */
        _this5.collectAudio = environment.audio4;

        /**
         * Image size multiplier
         * @type {number}
         */
        _this5.scale = options.upgradeValue !== undefined ? options.upgradeValue : 0.666666;
        return _this5;
    }

    /**
     * Return drop rate
     * @return number
     */


    _createClass(PowerUp, null, [{
        key: "dropRate",
        value: function dropRate() {
            return 0.05;
        }
    }]);

    return PowerUp;
}(Unit);

var ExtraLife = function (_PowerUp) {
    _inherits(ExtraLife, _PowerUp);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function ExtraLife(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ExtraLife);

        /**
         * Number of extra lives to award user
         * @type {Number}
         */

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtraLife).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this6.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;

        /**
         * Object's image
         * @type Image object
         */
        _this6.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this6.image.src = directory + "images/extra-life.png";

        /**
         * Size multiplier
         * @type {number}
         */
        _this6.scale = options.upgradeValue !== undefined ? options.upgradeValue : 0.666666;
        return _this6;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(ExtraLife, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            GAME.lives += this.upgradeValue;
            return this;
        }
    }]);

    return ExtraLife;
}(PowerUp);

var WeaponUpgrade = function (_PowerUp2) {
    _inherits(WeaponUpgrade, _PowerUp2);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function WeaponUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, WeaponUpgrade);

        /**
         * Object's image
         */

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(WeaponUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this7.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this7.image.src = directory + "images/red.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this7.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
        return _this7;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(WeaponUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            user.attackLevel += this.upgradeValue;
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return WeaponUpgrade;
}(PowerUp);

var SpeedUpgrade = function (_PowerUp3) {
    _inherits(SpeedUpgrade, _PowerUp3);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function SpeedUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, SpeedUpgrade);

        /**
         * Object's image
         */

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(SpeedUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this8.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this8.image.src = directory + "images/green.png";

        /**
         * Speed upgrade value
         * @type {Number}
         */
        _this8.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
        return _this8;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(SpeedUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            if (user.xSpeed < 15) {
                user.xSpeed += this.upgradeValue;
            }
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return SpeedUpgrade;
}(PowerUp);

var SizeUpgrade = function (_PowerUp4) {
    _inherits(SizeUpgrade, _PowerUp4);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function SizeUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, SizeUpgrade);

        /**
         * Object's image
         */

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this9.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this9.image.src = directory + "images/yellow.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this9.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 0.1;
        return _this9;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(SizeUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            if (user.scale > 0.5) {
                user.scale -= this.upgradeValue;
            }
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return SizeUpgrade;
}(PowerUp);

var AttackRateUpgrade = function (_PowerUp5) {
    _inherits(AttackRateUpgrade, _PowerUp5);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function AttackRateUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, AttackRateUpgrade);

        /**
         * Object's image
         */

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(AttackRateUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this10.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this10.image.src = directory + "images/orange.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this10.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 50;
        return _this10;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(AttackRateUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            if (user.attackRate >= 100) {
                user.attackRate -= this.upgradeValue;
            }
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return AttackRateUpgrade;
}(PowerUp);

var AttackSpeedUpgrade = function (_PowerUp6) {
    _inherits(AttackSpeedUpgrade, _PowerUp6);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function AttackSpeedUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, AttackSpeedUpgrade);

        /**
         * Object's image
         */

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(AttackSpeedUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this11.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this11.image.src = directory + "images/purple.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this11.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 0.25;
        return _this11;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(AttackSpeedUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            if (user.attackSpeed < 3) {
                user.attackSpeed += this.upgradeValue;
            }
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return AttackSpeedUpgrade;
}(PowerUp);

var AttackDamageUpgrade = function (_PowerUp7) {
    _inherits(AttackDamageUpgrade, _PowerUp7);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function AttackDamageUpgrade(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, AttackDamageUpgrade);

        /**
         * Object's image
         */

        var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(AttackDamageUpgrade).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this12.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this12.image.src = directory + "images/black.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this12.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
        return _this12;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(AttackDamageUpgrade, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            if (user.attackDamage < 10) {
                user.attackDamage += this.upgradeValue;
            }
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return AttackDamageUpgrade;
}(PowerUp);

var ExtraBoardClear = function (_PowerUp8) {
    _inherits(ExtraBoardClear, _PowerUp8);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function ExtraBoardClear(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ExtraBoardClear);

        /**
         * Object's image
         */

        var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtraBoardClear).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this13.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this13.image.src = directory + "images/blue.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this13.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
        return _this13;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(ExtraBoardClear, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            user.clears += this.upgradeValue;
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return ExtraBoardClear;
}(PowerUp);

var ExtraBomb = function (_PowerUp9) {
    _inherits(ExtraBomb, _PowerUp9);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function ExtraBomb(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ExtraBomb);

        /**
         * Object's image
         */

        var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtraBomb).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this14.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this14.image.src = directory + "images/white.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        _this14.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
        return _this14;
    }

    /**
     * Provide the power-up
     * @return this
     */


    _createClass(ExtraBomb, [{
        key: "onCollect",
        value: function onCollect() {
            if (!environment.isMuted) {
                this.collectAudio.play();
            }
            user.bombs += this.upgradeValue;
            return this;
        }

        /**
         * Return drop rate
         * @return number
         */

    }], [{
        key: "dropRate",
        value: function dropRate() {
            return 0.01;
        }
    }]);

    return ExtraBomb;
}(PowerUp);

var Enemy = function (_Unit4) {
    _inherits(Enemy, _Unit4);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Enemy(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Enemy);

        /**
         * Horizontal speed
         * @type {Number}
         */

        var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Enemy).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this15.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 1;

        /**
         * Vertical speed
         * @type {Number}
         */
        _this15.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 0;

        /**
         * Point value
         * @type {Number}
         */
        _this15.points = options.points !== undefined ? options.points : 10;

        /**
         * Size multiplier
         * @type {Number}
         */
        _this15.scale = options.scale !== undefined ? options.scale : 1;

        /**
         * Object width
         * @type {Number}
         */
        _this15.width = options.width !== undefined ? options.width : 50;

        /**
         * Object height
         * @type {Number}
         */
        _this15.height = options.height !== undefined ? options.height : 50;

        /**
         * Enemy attack rate, between 0 and 1 where 1 is fastest
         * @type {number}
         */
        _this15.attackRate = options.attackRate !== undefined ? options.attackRate : 0.0025;

        /**
         * Percentage chance to drop power-ups
         * @type {Number}
         */
        _this15.dropMultiplier = options.dropMultiplier !== undefined ? options.dropMultiplier : 1;

        /**
         * Health total
         * @type {Number}
         */
        _this15.startingHealth = options.startingHealth !== undefined ? options.startingHealth : 2;

        /**
         * Health total
         * @type {Number}
         */
        _this15.health = options.health !== undefined ? options.health : 2;
        return _this15;
    }

    /**
     * Create a new attack
     * @return this
     */


    _createClass(Enemy, [{
        key: "attack",
        value: function attack() {
            if (Math.random() >= 1 - this.attackRate) {
                GAME.enemyAttacks.push(new Projectile(this.xPosition + this.getWidth() / 2, this.yPosition + this.getHeight(), { ySpeed: 3, src: directory + "images/projectile2.png" }));
            }
            return this;
        }

        /**
         * Randomize unit attack rate
         * @param  {number} min  Minimum attack rate
         * @param  {number} max  Maximum attack rate
         * @return this
         */

    }, {
        key: "randomizeAttackRate",
        value: function randomizeAttackRate() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            this.attackRate = Math.floor(min + Math.random() * (max - min + 1));
            return this;
        }

        /**
         * Randomize horizontal speed
         * @param  {number} min  Minimum speed
         * @param  {number} max  Maximum speed
         * @return this
         */

    }, {
        key: "randomizeXSpeed",
        value: function randomizeXSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.xSpeed = Math.floor(min + Math.random() * (max - min + 1));
            return this;
        }

        /**
         * Randomize vertical speed
         * @param  {number} min  Minimum speed
         * @param  {number} max  Maximum speed
         * @return this
         */

    }, {
        key: "randomizeYSpeed",
        value: function randomizeYSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.ySpeed = Math.floor(min + Math.random() * (max - min + 1));
            return this;
        }
    }, {
        key: "randomizeSpeed",
        value: function randomizeSpeed() {
            var min = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var max = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            this.randomizeXSpeed(min, max);
            this.randomizeYSpeed(min, max);
            return this;
        }

        /**
         * Randomize horizontal movement direction
         * @return this
         */

    }, {
        key: "randomizeXMovement",
        value: function randomizeXMovement() {
            this.movingRight = Math.floor(Math.random() * 2) ? true : false;
            return this;
        }

        /**
         * Randomize vertical movement direction
         * @return this
         */

    }, {
        key: "randomizeYMovement",
        value: function randomizeYMovement() {
            this.movingUp = Math.floor(Math.random() * 2) ? true : false;
            return this;
        }

        /**
         * Randomize vertical and horizontal movement directions
         * @return this
         */

    }, {
        key: "randomizeMovement",
        value: function randomizeMovement() {
            this.randomizeXMovement();
            this.randomizeYMovement();
            return this;
        }

        /**
         * Drop a power-up
         * @return this
         */

    }, {
        key: "dropPowerUps",
        value: function dropPowerUps() {
            if (Math.random() >= 1 - ExtraLife.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new ExtraLife(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - WeaponUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new WeaponUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - SpeedUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new SpeedUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - SizeUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new SizeUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - AttackRateUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new AttackRateUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - AttackDamageUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new AttackDamageUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - AttackSpeedUpgrade.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new AttackSpeedUpgrade(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - ExtraBoardClear.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new ExtraBoardClear(this.xPosition, this.yPosition));
            }
            if (Math.random() >= 1 - ExtraBomb.dropRate() * this.dropMultiplier) {
                GAME.powerUps.push(new ExtraBomb(this.xPosition, this.yPosition));
            }
            return this;
        }

        /**
         * Trigger death events
         * @return this
         */

    }, {
        key: "onDeath",
        value: function onDeath() {
            GAME.incrementScore(this.points);
            if (!environment.isMuted) {
                this.deathAudio.play();
            }
            this.dropPowerUps();
            return this;
        }
    }]);

    return Enemy;
}(Unit);

var Boss = function (_Enemy) {
    _inherits(Boss, _Enemy);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Boss(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Boss);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(Boss).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this16.points = options.points !== undefined ? options.points : 1000;

        /**
         * Object's image
         */
        _this16.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this16.image.src = directory + "images/flying-beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        _this16.width = options.width !== undefined ? options.width : 141;

        /**
         * Object height
         * @type {Number}
         */
        _this16.height = options.height !== undefined ? options.height : 96;

        /**
         * Starting health
         * @type {integer}
         */
        _this16.startingHealth = options.health !== undefined ? options.health : 1000;

        /**
         * Current health
         * @type {integer}
         */
        _this16.health = options.health !== undefined ? options.health : 1000;

        /**
         * Death audio object
         * @param {object}
         */
        _this16.deathAudio = environment.audio6;
        return _this16;
    }

    /**
     * Draw current health
     * @return null
     */


    _createClass(Boss, [{
        key: "drawHealth",
        value: function drawHealth() {
            GAME.context.fillStyle = "red";
            GAME.context.fillRect(13, GAME.canvas.height / 10 + (this.startingHealth - this.health) * (GAME.canvas.height * 0.6 - 6) / this.startingHealth + 3, 44, this.health * (GAME.canvas.height * 0.6 - 6) / this.startingHealth);
        }

        /**
         * Draw health container
         * @return null
         */

    }, {
        key: "drawHealthContainer",
        value: function drawHealthContainer() {
            GAME.context.lineWidth = 6;
            GAME.context.strokeStyle = "black";
            GAME.context.strokeRect(10, GAME.canvas.height / 10, 50, GAME.canvas.height * 0.6);
        }
    }]);

    return Boss;
}(Enemy);

var Bee = function (_Enemy2) {
    _inherits(Bee, _Enemy2);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Bee(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Bee);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(Bee).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this17.points = options.points !== undefined ? options.points : 35;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this17.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 3;

        /**
         * Object's image
         */
        _this17.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this17.image.src = directory + "images/bee-sprite.png";

        /**
         * Object width
         * @type {Number}
         */
        _this17.width = options.width !== undefined ? options.width : 100;

        /**
         * Object height
         * @type {Number}
         */
        _this17.height = options.height !== undefined ? options.height : 63;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        _this17.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 1;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        _this17.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        _this17.numberOfFrames = 4;
        return _this17;
    }

    return Bee;
}(Enemy);

var RedBee = function (_Enemy3) {
    _inherits(RedBee, _Enemy3);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function RedBee(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, RedBee);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(RedBee).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this18.points = options.points !== undefined ? options.points : 35;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this18.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 3;

        /**
         * Object's image
         */
        _this18.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this18.image.src = directory + "images/bee-sprite-red.png";

        /**
         * Object width
         * @type {Number}
         */
        _this18.width = options.width !== undefined ? options.width : 100;

        /**
         * Object height
         * @type {Number}
         */
        _this18.height = options.height !== undefined ? options.height : 63;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        _this18.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 1;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        _this18.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        _this18.numberOfFrames = 4;
        return _this18;
    }

    return RedBee;
}(Enemy);

var Beetle = function (_Enemy4) {
    _inherits(Beetle, _Enemy4);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Beetle(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Beetle);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(Beetle).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this19.points = options.points !== undefined ? options.points : 50;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this19.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 6;

        /**
         * Object's image
         */
        _this19.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this19.image.src = directory + "images/beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        _this19.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        _this19.height = options.height !== undefined ? options.height : 75;

        /**
         * Attack rate
         * @type {Number}
         */
        _this19.attackRate = options.attackRate !== undefined ? options.attackRate : 0.01;
        return _this19;
    }

    return Beetle;
}(Enemy);

var FlyingBeetle = function (_Enemy5) {
    _inherits(FlyingBeetle, _Enemy5);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function FlyingBeetle(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, FlyingBeetle);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(FlyingBeetle).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this20.points = options.points !== undefined ? options.points : 125;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this20.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 7;

        /**
         * Object's image
         */
        _this20.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this20.image.src = directory + "images/flying-beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        _this20.width = options.width !== undefined ? options.width : 141;

        /**
         * Object height
         * @type {Number}
         */
        _this20.height = options.height !== undefined ? options.height : 96;

        /**
         * Enemy attack rate
         * @type {Number}
         */
        _this20.attackRate = options.attackRate !== undefined ? options.attackRate : 0.02;
        return _this20;
    }

    return FlyingBeetle;
}(Enemy);

var StickBug = function (_Enemy6) {
    _inherits(StickBug, _Enemy6);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function StickBug(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, StickBug);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(StickBug).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this21.points = options.points !== undefined ? options.points : 75;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this21.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 8;

        /**
         * Object's image
         */
        _this21.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this21.image.src = directory + "images/beetle2.png";

        /**
         * Object width
         * @type {Number}
         */
        _this21.width = options.width !== undefined ? options.width : 81;

        /**
         * Object height
         * @type {Number}
         */
        _this21.height = options.height !== undefined ? options.height : 100;

        /**
         * Enemy attack rate
         * @type {Number}
         */
        _this21.attackRate = options.attackRate !== undefined ? options.attackRate : 0.015;
        return _this21;
    }

    return StickBug;
}(Enemy);

var Spider = function (_Enemy7) {
    _inherits(Spider, _Enemy7);

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */

    function Spider(xPos, yPos) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, Spider);

        /**
         * Enemy point value
         * @type {Number}
         */

        var _this22 = _possibleConstructorReturn(this, Object.getPrototypeOf(Spider).call(this, xPos, yPos, options));

        /**
         * Call the parent class' constructor
         */


        _this22.points = options.points !== undefined ? options.points : 25;

        /**
         * Horizontal speed
         * @type {Number}
         */
        _this22.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 2;

        /**
         * Object's image
         */
        _this22.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        _this22.image.src = directory + "images/spider-sprite.png";

        /**
         * Object width
         * @type {Number}
         */
        _this22.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        _this22.height = options.height !== undefined ? options.height : 75;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        _this22.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 3;

        /**
         * Current number of delayed frames
         * @type {integer}
         */
        _this22.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        _this22.numberOfFrames = 10;
        return _this22;
    }

    return Spider;
}(Enemy);

/**
 * 5. Levels
 */

/**
 * Level 1
 * @return null
 */


function level1() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    GAME.enemies.push(menu.units[0]);

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 2
 * @return null
 */
function level2() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60).randomizeYSpeed(2, 4).randomizeXSpeed(2, 4).randomizeMovement());
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 3
 * @return null
 */
function level3() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for (var _i = 0; _i < 5; _i++) {
        GAME.enemies.push(new Bee(_i * 100 + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 4
 * @return null
 */
function level4() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for (var _i2 = 0; _i2 < 5; _i2++) {
        GAME.enemies.push(new Bee(_i2 * 100 + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for (var _i3 = 0; _i3 < 10; _i3++) {
        GAME.enemies.push(new Spider(_i3 * 100 + 25, 350));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 5
 * @return null
 */
function level5() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 10; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for (var _i4 = 0; _i4 < 10; _i4++) {
        GAME.enemies.push(new Bee(_i4 * 100 + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for (var _i5 = 0; _i5 < 10; _i5++) {
        GAME.enemies.push(new Spider(_i5 * 100 + 25, 250));
    }
    for (var _i6 = 0; _i6 < 10; _i6++) {
        GAME.enemies.push(new Spider(_i6 * 100 + 25, 350));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 6
 * @return null
 */
function level6() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60));
    }
    for (var _i7 = 0; _i7 < 5; _i7++) {
        GAME.enemies.push(new Spider(_i7 * 100 + 25, 150));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 7
 * @return null
 */
function level7() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background2.jpg";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60));
    }
    for (var _i8 = 0; _i8 < 5; _i8++) {
        GAME.enemies.push(new Spider(_i8 * 100 + 25, 150));
    }
    for (var _i9 = 0; _i9 < 5; _i9++) {
        GAME.enemies.push(new Bee(_i9 * 100 + 25, 250));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 8
 * @return null
 */
function level8() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee(i * 100 + 25, 60));
    }
    for (var _i10 = 0; _i10 < 5; _i10++) {
        GAME.enemies.push(new Spider(_i10 * 100 + 25, 150));
    }
    for (var _i11 = 0; _i11 < 5; _i11++) {
        GAME.enemies.push(new Bee(_i11 * 100 + 25, 250));
    }
    for (var _i12 = 0; _i12 < 5; _i12++) {
        GAME.enemies.push(new Spider(_i12 * 100 + 25, 350));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 9
 * @return null
 */
function level9() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 5; i++) {
        GAME.enemies.push(new Beetle(i * 100 + 25, 60));
    }
    for (var _i13 = 0; _i13 < 5; _i13++) {
        GAME.enemies.push(new Spider(_i13 * 100 + 25, 150));
    }
    for (var _i14 = 0; _i14 < 5; _i14++) {
        GAME.enemies.push(new Bee(_i14 * 100 + 25, 250));
    }
    for (var _i15 = 0; _i15 < 5; _i15++) {
        GAME.enemies.push(new Spider(_i15 * 100 + 25, 350));
    }

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 10
 * @return null
 */
function level10() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Set level type to boss
     * @type {boolean}
     */
    GAME.isBoss = true;

    /**
     * Create enemies
     */
    GAME.enemies.push(new Boss(GAME.canvas.width / 4, 10, { attackRate: .05, xSpeed: 1, ySpeed: 1, scale: 3, health: 100, points: 10000 }).randomizeMovement());

    /**
     * Initialize user
     */
    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Level 11
 * @return null
 */
function level11() {

    /**
     * Set level background
     * @type {String}
     */
    GAME.background = "background.png";

    /**
     * Draw the new background
     * @return null
     */
    GAME.drawBackground();

    /**
     * Create enemies
     */
    for (var i = 0; i < 10; i++) {
        GAME.enemies.push(new Beetle(i * 100 + 25, 60, { scale: .5, health: 5 }));
    }
    for (var _i16 = 0; _i16 < 6; _i16++) {
        GAME.enemies.push(new FlyingBeetle(_i16 * 100 + 25, 100, { scale: .5, health: 5 }));
    }
    for (var _i17 = 0; _i17 < 10; _i17++) {
        GAME.enemies.push(new StickBug(_i17 * 100 + 25, 150, { scale: .5, health: 5 }));
    }
    for (var _i18 = 0; _i18 < 10; _i18++) {
        GAME.enemies.push(new Bee(_i18 * 100 + 25, 250, { scale: .5, health: 5 }));
    }
    for (var _i19 = 0; _i19 < 10; _i19++) {
        GAME.enemies.push(new Spider(_i19 * 100 + 25, 350, { scale: .5, health: 5 }));
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = GAME.enemies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var enemy = _step.value;

            enemy.randomizeYSpeed();
            enemy.randomizeXSpeed();
        }

        /**
         * Initialize user
         */
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    user = user || new Person(GAME.canvas.width / 2, GAME.canvas.height - 100);
    user.resetPosition();

    /**
     * Start game
     */
    GAME.main();
}

/**
 * Global Objects
 */

/**
 * The user
 * @type {Person}
 */
var user;

var directory = "bugAttack/";

var environment = new Environment();

var menu = new Menu();

/**
 * The main game object
 * @type {Object}
 */
var GAME = new Game();
