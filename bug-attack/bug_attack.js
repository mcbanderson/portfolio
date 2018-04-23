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

class Environment {
    constructor(options = {}) {

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
    drawBackground() {
        var background = new Image();
        background.src = directory + "images/" + this.background;
        this.canvas.style.backgroundSize = "cover";
        this.canvas.style.backgroundImage = "url(" + directory + "images/" + this.background + ")";
    }

    /**
     * Draw the audio icon
     * @return null
     */
    drawAudio() {
        var icon = new Image();
        if(this.isMuted) {
            icon.src = directory + "images/volume-off.png";
        }
        else {
            icon.src = directory + "images/volume-on.png";
        }
        GAME.context.drawImage(icon, 10, GAME.canvas.height - 50);
    }

    /**
     * Initialize the game
     * @return null
     */
    init() {
        this.initCanvas();
        menu.init();
    }

    /**
     * Initialize the canvas
     * @return null
     */
    initCanvas() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 900;
        this.canvas.height = 600;
    }

    /**
     * Keydown controls
     */
    controlsKeydown(event) {
        if (event.keyCode === 13) {
            //do something
        }
    }

    /**
     * Keyup controls
     */
    controlsKeyup(event) {
        if (event.keyCode === 13) {
            //do something
        }
    }

    /**
     * Clear the canvas
     * @return null
     */
    clearCanvas() {
        GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
    }
}

class Game extends Environment {
    constructor(options = {}) {
        super();

        /**
         * Active enemies
         * @type {Array}
         */
        this.enemies = options.enemies !== undefined ? options.enemies : [];

        /**
         * Active enemy attacs
         * @type {Array}
         */
        this.enemyAttacks = options.enemyAttacks !== undefined ? options.enemyAttacks : [];

        /**
         * Active power-up objects
         * @type {Array}
         */
        this.powerUps = options.powerUps !== undefined ? options.powerUps : [];

        /**
         * Current level background
         * @type {String}
         */
        this.background = options.background !== undefined ? options.background : "background.png";

        /**
         * Current game status
         * @type {Boolean}
         */
        this.isActive = options.isActive !== undefined ? options.isActive : true;

        /**
         * Current game status
         * @type {Boolean}
         */
        this.isBoss = options.isBoss !== undefined ? options.isBoss : false;

        /**
         * Current user score
         * @type {Number}
         */
        this.score = options.score !== undefined ? options.score : 0;

        /**
         * Game speed
         * @type {Number}
         */
        this.speed = options.speed !== undefined ? options.speed : 20;

        /**
         * Current game level
         * @type {Number}
         */
        this.level = options.level !== undefined ? options.level : 1;

        /**
         * Current user lives
         * @type {Number}
         */
        this.startingLives = options.startingLives !== undefined ? options.startingLives : 10;

        /**
         * Current user lives
         * @type {Number}
         */
        this.lives = 10;

        /**
         * Current keydown listener
         * @type {}
         */
        this.keydownListener = null;

        /**
         * Current keyup listener
         * @type {}
         */
        this.keyupListener = null;
    }

    /**
     * Increment the score
     * @param  {integer} points Points to increment
     * @return null
     */
    incrementScore(points) {
        this.score += points;
    }

    /**
     * Draw the background
     * @return null
     */
    drawBackground() {
        var background = new Image();
        background.src = directory + "images/" + GAME.background;
        GAME.canvas.style.backgroundSize = "cover";
        GAME.canvas.style.backgroundImage = "url(" + directory + "images/" + GAME.background + ")";
    }

    /**
     * Initialize the game
     * @return null
     */
    init() {
        GAME.initCanvas();
        menu.drawStartScreen();
        window.addEventListener("keydown", GAME.controlsKeydownStart);
        GAME.keydownListener = GAME.controlsKeydownStart;
    }

    /**
     * Initialize the canvas
     * @return null
     */
    initCanvas() {
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
    initLevel() {
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
    main() {
        if(GAME.isActive) {
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
        if(GAME.isBoss) {
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
        if(!GAME.isActive) {
            GAME.drawPaused();
        }
        GAME.checkWin();
        GAME.checkLoss();
        if(GAME.isActive) {
            setTimeout(GAME.main, GAME.speed);
        }
    }

    /**
     * Draw all user attacks onto the canvas
     * @return null
     */
    drawAttacks() {
        for(let i = 0; i < user.attacks.length; i++) {
            user.attacks[i].draw();
        }
    }

    /**
     * Move all user attacks
     * @return null
     */
    moveAttacks() {
        for(let i = 0; i < user.attacks.length; i++) {
            user.attacks[i].move();
        }
    }

    /**
     * Generate enemy attacks
     * @return null
     */
    createEnemyAttacks() {
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].attack();
        }
    }

    /**
     * Create user attacks
     * @return null
     */
    createUserAttacks() {
        if(user.isAttacking) {
            user.attack();
        }
    }

    /**
     * Draw enemy attacks to the canvas
     * @return null
     */
    drawEnemyAttacks() {
        for(let i = 0; i < GAME.enemyAttacks.length; i++) {
            GAME.enemyAttacks[i].draw();
        }
    }

    /**
     * Move enemy attacks
     * @return null
     */
    moveEnemyAttacks() {
        for(let i = 0; i < GAME.enemyAttacks.length; i++) {
            GAME.enemyAttacks[i].moveDown();
        }
    }

    /**
     * Draw the paused screen
     * @return null
     */
    drawPaused() {
        this.context.textAlign = "center";
        this.context.fillStyle = "black";
        this.context.fillText("Paused", this.canvas.width/2, this.canvas.height/2);
    }

    /**
     * Check if any enemies have been hit by user attacks
     * @return null
     */
    checkHit() {
        for(let i = 0; i < user.attacks.length; i++) {
            for(let j = 0; j < this.enemies.length; j++) {
                if(this.hitChecker(user.attacks[i], this.enemies[j])) {
                    this.resolveHit(this.enemies[j], user.attacks[i], i, j);
                    break;
                }
                else {
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
    resolveHit(enemy, attack, i, j) {
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
    hitChecker(object1, object2) {
        if (object1.xPosition + object1.width * object1.scale >= object2.xPosition &&
            object1.xPosition <= object2.xPosition + object2.width * object2.scale &&
            object1.yPosition + object1.height * object1.scale >= object2.yPosition &&
            object1.yPosition <= object2.yPosition + object2.height * object2.scale)
        {
            return true;
        }
        return false;
    }

    /**
     * Check if user has been hit by any enemy attacks
     * @return null
     */
    checkDamage() {
        for(let i = 0; i < this.enemyAttacks.length; i++) {
            if(this.hitChecker(this.enemyAttacks[i], user)) {
                this.enemyAttacks.splice(i, 1);
                this.lives--;
                if(!environment.isMuted) {
                    user.damageAudio.play();
                }
            }
            else {
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
    checkPowerUps() {
        for(let i = 0; i < this.powerUps.length; i++) {
            if(this.hitChecker(this.powerUps[i], user)) {
                this.powerUps[i].onCollect();
                this.powerUps.splice(i, 1);
            }
            else {
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
    checkWin() {
        if(!this.enemies.length) {
            this.resolveWin();
        }
    }

    /**
     * Prepare for next level
     * @return null
     */
    resolveWin() {
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
    checkLoss() {
        if(this.lives <= 0) {
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
    resetGame() {
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
    controlsKeydownLevel(event) {
        if (event.keyCode === 13) {
            if (GAME.isActive) {
                GAME.isActive = false;
            }
            else {
                GAME.isActive = true;
                GAME.main();
            }
        }
        else if (event.keyCode === 32) {
            user.isAttacking = true;
        }
        else if (event.keyCode === 37) {
            user.isMoving = true;
            user.movingRight = false;
            GAME.keyCode = event.keyCode;
        }
        else if (event.keyCode === 39) {
            user.isMoving = true;
            user.movingRight = true;
            GAME.keyCode = event.keyCode;
        }
        else if (event.keyCode === 65) {
            if (user.clears >= 1) {
                user.clears--;
                GAME.enemyAttacks = [];
            }
        }
        else if (event.keyCode === 68) {
            if (user.bombs >= 1) {
                user.bombs--;
                GAME.createBomb();
            }
        }
        else if (event.keyCode === 77) {
            if(environment.isMuted) {
                menu.audio.muted = false;
            }
            else {
                menu.audio.muted = true;
            }
            environment.isMuted = !environment.isMuted;
            if(!GAME.isActive) {
                GAME.main();
            }
        }
    }

    /**
     * Controls for keyup events
     * @param  {event} event The event
     * @return null
     */
    controlsKeyupLevel(event) {
        if(GAME.isActive) {
            if (event.keyCode === 32) {
                user.isAttacking = false;
            }
            else if (event.keyCode === 37 && GAME.keyCode == event.keyCode) {
                user.isMoving = false;
            }
            else if (event.keyCode === 39 && GAME.keyCode == event.keyCode) {
                user.isMoving = false;
            }
        }
    }

    /**
     * Move the user
     * @return null
     */
    moveUser() {
        if(user.isMoving) {
            if(user.movingRight) {
                user.moveRight();
            }
            else {
                user.moveLeft();
            }
        }
    }

    /**
     * Draw all enemies
     * @return null
     */
    drawEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
        }
    }

    /**
     * Update current animation frame for all enemies
     * @return null
     */
    animateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].updateFrame();
        }
    }

    /**
     * Draw all power-ups
     * @return {[type]} [description]
     */
    drawPowerUps() {
        for (let i = 0; i < this.powerUps.length; i++) {
            this.powerUps[i].draw();
        }
    }

    /**
     * Move all power-ups
     * @return null
     */
    movePowerUps() {
        for (let i = 0; i < this.powerUps.length; i++) {
            this.powerUps[i].moveDown();
        }
    }

    /**
     * Move all enemies
     * @return {[type]} [description]
     */
    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].move();
        }
    }

    /**
     * Draw the current score
     * @return null
     */
    drawScore() {
        this.context.textAlign = "left";
        this.context.fillStyle = "black";
        this.context.font = "20px 'Press Start 2P', cursive";
        this.context.fillText("Score: " + this.score, 10, 35);
    }

    /**
     * Draw the current level counter
     * @return null
     */
    drawLevel() {
        this.context.textAlign = "center";
        this.context.fillStyle = "black";
        this.context.fillText("Level: " + this.level, this.canvas.width / 2, 35);
    }

    /**
     * Draw the current lives counter
     * @return null
     */
    drawLives() {
        var image = new Image();
        image.src = directory + "images/extra-life.png";

        if (this.lives <= 5) {
            for(let i = 0; i < this.lives; i++) {
                this.context.drawImage(image, (this.canvas.width - 10) - (35 * (i + 1)), 10, 25, 25);
            }
        }
        else {
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
    drawClears() {
        var image = new Image();
        image.src = directory + "images/blue.png";

        if (user.clears <= 4) {
            for(let i = 0; i < user.clears; i++) {
                this.context.drawImage(image, (this.canvas.width - 10) - (35 * (i + 1)), 45, 25, 25);
            }
        }
        else {
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
    drawBombs() {
        var image = new Image();
        image.src = directory + "images/white.png";

        if (user.bombs <= 4) {
            for(let i = 0; i < user.bombs; i++) {
                this.context.drawImage(image, (this.canvas.width - 10) - (35 * (i + 1)), 80, 25, 25);
            }
        }
        else {
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
    drawWin() {
        this.context.textAlign = "center";
        this.context.fillText("Level " + this.level + " complete!", this.canvas.width/2, this.canvas.height/2);
        this.context.fillText("Press Enter to Start Next Level", this.canvas.width/2, this.canvas.height/2 + 35);
        this.context.fillText("Score: " + this.score, this.canvas.width/2, this.canvas.height/2 + 65);
    }

    /**
     * Draw game over screen
     * @return null
     */
    drawLoss() {
        this.context.textAlign = "center";
        this.context.fillText("Game Over", this.canvas.width/2, this.canvas.height/2);
        this.context.fillText("Press Enter to Restart", this.canvas.width/2, this.canvas.height/2 + 35);
        this.context.fillText("Final Score: " + this.score, this.canvas.width/2, this.canvas.height/2 + 65);
    }

    /**
     * Set movement direction for all enemies
     * @return null
     */
    setEnemyMovement() {
        for (let i = 0; i < this.enemies.length; i++) {
            for (let j = 0; j < this.enemies.length; j++) {
                if(i != j) {
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
    checkCollision(unit1, unit2) {
        var dx = (unit1.xPosition + unit1.width * unit1.scale / 2) - (unit2.xPosition + unit2.width * unit2.scale / 2);
        var dy = (unit1.yPosition + unit1.height * unit1.scale / 2) - (unit2.yPosition + unit2.height * unit2.scale / 2);
        var width = (unit1.width * unit1.scale + unit2.width * unit2.scale) / 2;
        var height = (unit1.height * unit1.scale + unit2.height * unit2.scale ) / 2;
        var crossWidth = width * dy;
        var crossHeight = height * dx;

        if(Math.abs(dx) <= width && Math.abs(dy) <= height){
            if(crossWidth > crossHeight){
                if (crossWidth > -crossHeight) {
                    // unit1 top collision
                    // unit2 bottom collision
                    unit1.movingUp = false;
                    unit2.movingUp = true;
                }
                else {
                    // unit1 right collision
                    // unit2 left collision
                    unit1.movingRight = false;
                    unit2.movingRight = true;
                }
            }
            else {
                if (crossWidth > -crossHeight) {
                    // unit1 left collision
                    // unit2 right collision
                    unit1.movingRight = true;
                    unit2.movingRight = false;
                }
                else {
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
    createBomb() {
        var x = Math.floor(this.canvas.width/10 + Math.random() * this.canvas.width * 0.8);
        var y = Math.floor(this.canvas.height/10 + Math.random() * this.canvas.height * 0.8);
        for (let i = 0; i < 25; i++) {
            user.attacks.push(new Projectile(x, y, {damage: user.attackDamage}).randomizeMovement().randomizeSpeed());
        }
        if(!environment.isMuted) {
            environment.audio5.play();
        }
    }
}

class Menu extends Environment {
    constructor(options = {}) {
        super();

        this.controlsKeydown = this.controlsKeydownStart
        this.currentScreen = this.drawStartScreen;
    }

    /**
     * Initialize the game
     * @return null
     */
    init() {
        GAME.initCanvas();
        window.addEventListener("keydown", menu.controlsKeydownStart);
        GAME.keydownListener = menu.controlsKeydownStart;
        window.addEventListener("keydown", function(event){
            if(event.keyCode === 32) {
                event.preventDefault();
            }
        });
        GAME.drawBackground();
        menu.units.push(new Bee(canvas.width / 2, canvas.height / 2, {attackRate: 0, ySpeed: 1}).randomizeMovement());
        menu.main();
        menu.audio.loop = true;
        menu.audio.play();
    }

    controlsKeydownStart(event) {
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
            if(environment.isMuted) {
                menu.audio.muted = false;
            }
            else {
                menu.audio.muted = true;
            }
            environment.isMuted = !environment.isMuted;
        }
        if (event.keyCode === 85) {
            menu.currentScreen = menu.drawUpgradeScreen;
            menu.changeKeydownListener(menu.controlsKeydownUpgrades);
        }
    }

    controlsKeydownUpgrades(event) {
        if (event.keyCode === 27 || event.keyCode === 66 || event.keyCode === 85 || event.keyCode === 13 || event.keyCode === 32) {
            menu.currentScreen = menu.drawStartScreen;
            menu.changeKeydownListener(menu.controlsKeydownStart);
        }
        if (event.keyCode === 77) {
            if(environment.isMuted) {
                menu.audio.muted = false;
            }
            else {
                menu.audio.muted = true;
            }
            environment.isMuted = !environment.isMuted;
        }
    }

    controlsKeydownControls(event) {
        if (event.keyCode === 27 || event.keyCode === 66 || event.keyCode === 67 || event.keyCode === 13 || event.keyCode === 32) {
            menu.currentScreen = menu.drawStartScreen;
            menu.changeKeydownListener(menu.controlsKeydownStart);
        }
        if (event.keyCode === 77) {
            if(environment.isMuted) {
                menu.audio.muted = false;
            }
            else {
                menu.audio.muted = true;
            }
            environment.isMuted = !environment.isMuted;
        }
    }

    main() {
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
    drawStartScreen() {
        GAME.context.font = "100px 'Creepster', cursive";
        GAME.context.textAlign = "center";
        GAME.context.fillText("Bug Attack!", GAME.canvas.width / 2, GAME.canvas.height / 2);
        GAME.context.font = "20px 'Press Start 2P'";
        GAME.context.fillText("Press Enter to Start", GAME.canvas.width / 2, GAME.canvas.height / 2 + 35);
        GAME.context.fillText("U - Upgrades", GAME.canvas.width / 2, GAME.canvas.height / 2 + 95);
        GAME.context.fillText("C - Controls", GAME.canvas.width / 2, GAME.canvas.height / 2 + 130);
    }

    changeKeydownListener(listener) {
        window.removeEventListener("keydown", GAME.keydownListener);
        window.addEventListener("keydown", listener);
        GAME.keydownListener = listener;
    }

    /**
     * Draw the start screen
     * @return null
     */
    drawControlsScreen() {
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
    drawUpgradeScreen() {
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

    drawUnits() {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].setMovement().move().updateFrame().draw();
        }
    }
}

/**
 * Basic unit object
 */
class Unit {
    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos = 0, yPos = 0, options = {}) {

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
    draw() {
        GAME.context.drawImage(this.image, this.currentFrame * this.width, 0, this.width, this.height, this.xPosition, this.yPosition, this.getWidth(), this.getHeight());
        return this;
    }

    /**
     * [updateFrameCount description]
     * @return {[type]} [description]
     */
    updateFrame() {
        this.delayCount++;
        if (this.delayCount > this.frameDelay) {
        	this.delayCount = 0;
            if (this.currentFrame < this.numberOfFrames - 1) {
                this.currentFrame++;
            }
            else {
                this.currentFrame = 0;
            }
        }
        return this;
    }

    /**
     * Move the projectile right
     * @return this
     */
    moveRight() {
        this.xPosition += this.xSpeed;
        return this;
    }

    /**
     * Move the projectile left
     * @return this
     */
    moveLeft() {
        this.xPosition -= this.xSpeed;
        return this;
    }

    /**
     * Move the projectile up
     * @return this
     */
    moveUp() {
        this.yPosition -= this.ySpeed;
        return this;
    }

    /**
     * Move the projectile down
     * @return this
     */
    moveDown() {
        this.yPosition += this.ySpeed;
        return this;
    }

    /**
     *
     */
    move() {
        if (this.movingRight) {
            this.moveRight();
        }
        else {
            this.moveLeft();
        }
        if (this.movingUp) {
            this.moveUp();
        }
        else {
            this.moveDown();
        }
        return this;
    }

    /**
     * Randomize horizontal movement direction
     * @return this
     */
    randomizeXMovement() {
        this.movingRight = Math.floor(Math.random() * 2) ? true : false;
        return this;
    }

    /**
     * Randomize vertical movement direction
     * @return this
     */
    randomizeYMovement() {
        this.movingUp = Math.floor(Math.random() * 2) ? true : false;
        return this;
    }

    /**
     * Randomize vertical and horizontal movement directions
     * @return this
     */
    randomizeMovement() {
        this.randomizeXMovement();
        this.randomizeYMovement();
        return this;
    }

    /**
     *
     */
    setMovement() {
        if (this.xPosition >= GAME.canvas.width - this.width * this.scale) {
            this.movingRight = false;
        }
        else if (this.xPosition <= 0) {
            this.movingRight = true;
        }
        if (this.yPosition + this.height * this.scale >= GAME.canvas.height - 150) {
            this.movingUp = true;
        }
        else if (this.yPosition <= 0) {
            this.movingUp = false;
        }
        return this;
    }

    /**
     * Adjust speed by given multiplier
     * @param {number} number  The desired speed multiplier
     */
    adjustSpeed(number) {
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
    randomizeXSpeed(min = 1, max = 10) {
        this.xSpeed = Math.floor(min + Math.random() * (max - min + 1));
        return this;
    }

    /**
     * Randomize vertical speed
     * @param  {number} min  Minimum speed
     * @param  {number} max  Maximum speed
     * @return this
     */
    randomizeYSpeed(min = 1, max = 10) {
        this.ySpeed = Math.floor(min + Math.random() * (max - min + 1));
        return this;
    }

    randomizeSpeed(min = 1, max = 10) {
        this.randomizeXSpeed(min, max);
        this.randomizeYSpeed(min, max);
        return this;
    }

    /**
     * Return scaled width
     * @return {number}
     */
    getWidth() {
        return this.width * this.scale;
    }

    /**
     * Return scaled height
     * @return {number}
     */
    getHeight() {
        return this.height * this.scale;
    }

    /**
     * Check if unit is out of bounds
     * @param  {object} unit The unit to check
     * @return {boolean}
     */
    checkInBounds() {
        if (this.xPosition + this.width <= 0 ||
            this.xPosition >= GAME.canvas.width ||
            this.yPosition + this.height <= 0 ||
            this.yPosition >= GAME.canvas.height)
        {
            return true;
        }
        return false;
    }
}

/**
 * Basic attack object, either enemy or user
 */
class Projectile extends Unit {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Damage amount
         * @type {Number}
         */
        this.damage = options.damage !== undefined ? options.damage : 1;

        /**
         * Unit image
         * @type Image object
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = options.src !== undefined ? options.src : directory + "images/projectile1.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 12;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 12;
    }

    /**
     * The point cost per attack
     * @return {number} Cost per attack (in points)
     */
    static cost() {
        return 5;
    }
}

/**
 * Basic user object
 */
class Person extends Unit {
    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 6;

        /**
         * Vertical speed
         * @type {Number}
         */
        this.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 0;

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 75;

        /**
         * Height width
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 75;

        /**
         * Attack level
         * @type {Number}
         */
        this.attackLevel = options.attackLevel !== undefined ? options.attackLevel : 1;

        /**
         * Attack damage
         * @type {number}
         */
        this.attackDamage = options.attackDamage !== undefined ? options.attackDamage : 1;

        /**
         * Attack rate, in milliseconds between shots
         * @type {Number}
         */
        this.attackRate = options.attackRate !== undefined ? options.attackRate : 250;

        /**
         * Attack speed multiplier
         * @type {Number}
         */
        this.attackSpeed = options.attackSpeed !== undefined ? options.attackSpeed : 1;

        /**
         * Number of enemy attack clears
         * @type {integer}
         */
        this.clears = options.clears !== undefined ? options.clears : 5;

        /**
         * Number of enemy attack clears
         * @type {integer}
         */
        this.bombs = options.bombs !== undefined ? options.bombs : 5;

        /**
         * Is able to shoot
         * @type {boolean}
         */
        this.canAttack = options.canAttack !== undefined ? options.canAttack : true;

        /**
         * Unit image
         * @type Image object
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/carl.png";

        /**
         * Attack audio object
         * @param {object}
         */
        this.attackAudio = environment.audio2;

        /**
         * Attack audio object
         * @param {object}
         */
        this.damageAudio = environment.audio3;

        /**
         * User is moving
         * @type {Boolean}
         */
        this.isMoving = options.isMoving !== undefined ? options.isMoving : false;

        /**
         * Active user attacks
         * @type {Array}
         */
        this.attacks = [];
    }

    /**
     * Move the user left
     * @return this
     */
    moveLeft() {
        if(this.xPosition >= 0) {
            this.xPosition -= this.xSpeed;
        }
        return this;
    }

    /**
     * Move the user right
     * @return this
     */
    moveRight() {
        if(this.xPosition + this.getWidth() <= GAME.canvas.width) {
            this.xPosition += this.xSpeed;
        }
        return this;
    }

    /**
     * Reset the user's position and movement state
     */
    resetPosition() {
        this.xPosition = GAME.canvas.width / 2;
        this.isMoving = false;
        return this;
    }

    /**
     * Create a new attack
     * @return null
     */
    attack() {
        if(this.canAttack) {
            if(!environment.isMuted) {
                this.attackAudio.play();
            }
            this.canAttack = false;
            switch(this.attackLevel) {
                case 1:
                    this.attacks.push(new Projectile(this.xPosition + 59 * this.scale, this.yPosition, {damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    GAME.score -= Projectile.cost();
                    break;
                case 2:
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: true, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: false, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    GAME.score -= Projectile.cost();
                    break;
                case 3:
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: true, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: false, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    GAME.score -= Projectile.cost();
                    break;
                default:
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: true, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: false, xSpeed: 1, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: true, xSpeed: 2, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    user.attacks.push(new Projectile(user.xPosition + 59 * user.scale, user.yPosition, {movingRight: false, xSpeed: 2, damage: this.attackDamage}).adjustSpeed(this.attackSpeed));
                    GAME.score -= Projectile.cost();
            }
            setTimeout(this.resetAttack.bind(this), this.attackRate);
        }
    }

    resetAttack() {
        this.canAttack = true;
    }
}

class PowerUp extends Unit {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Horizontal movement speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 0;

        /**
         * Vertical movement speed
         * @type {Number}
         */
        this.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 2;

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 75;

        /**
         * Object's image
         * @type Image object
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/black.png";

        /**
         * Collection audio object
         * @param {object}
         */
        this.collectAudio = environment.audio4;

        /**
         * Image size multiplier
         * @type {number}
         */
        this.scale = options.upgradeValue !== undefined ? options.upgradeValue : 0.666666;
    }

    /**
     * Return drop rate
     * @return number
     */
    static dropRate() {
        return 0.05;
    }
}

class ExtraLife extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Number of extra lives to award user
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;

        /**
         * Object's image
         * @type Image object
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/extra-life.png";

        /**
         * Size multiplier
         * @type {number}
         */
        this.scale = options.upgradeValue !== undefined ? options.upgradeValue : 0.666666;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
            this.collectAudio.play();
        }
        GAME.lives += this.upgradeValue;
        return this;
    }
}

class WeaponUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/red.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
            this.collectAudio.play();
        }
        user.attackLevel += this.upgradeValue;
        return this;
    }

    /**
     * Return drop rate
     * @return number
     */
    static dropRate() {
        return 0.01;
    }
}

class SpeedUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/green.png";

        /**
         * Speed upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
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
    static dropRate() {
        return 0.01;
    }
}

class SizeUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/yellow.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 0.1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
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
    static dropRate() {
        return 0.01;
    }
}

class AttackRateUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/orange.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 50;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
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
    static dropRate() {
        return 0.01;
    }
}

class AttackSpeedUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/purple.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 0.25;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
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
    static dropRate() {
        return 0.01;
    }
}

class AttackDamageUpgrade extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/black.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
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
    static dropRate() {
        return 0.01;
    }
}

class ExtraBoardClear extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/blue.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
            this.collectAudio.play();
        }
        user.clears += this.upgradeValue;
        return this;
    }

    /**
     * Return drop rate
     * @return number
     */
    static dropRate() {
        return 0.01;
    }
}

class ExtraBomb extends PowerUp {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/white.png";

        /**
         * Weapon upgrade value
         * @type {Number}
         */
        this.upgradeValue = options.upgradeValue !== undefined ? options.upgradeValue : 1;
    }

    /**
     * Provide the power-up
     * @return this
     */
    onCollect() {
        if(!environment.isMuted) {
            this.collectAudio.play();
        }
        user.bombs += this.upgradeValue;
        return this;
    }

    /**
     * Return drop rate
     * @return number
     */
    static dropRate() {
        return 0.01;
    }
}

class Enemy extends Unit {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 1;

        /**
         * Vertical speed
         * @type {Number}
         */
        this.ySpeed = options.ySpeed !== undefined ? options.ySpeed : 0;

        /**
         * Point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 10;

        /**
         * Size multiplier
         * @type {Number}
         */
        this.scale = options.scale !== undefined ? options.scale : 1;

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 50;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 50;

        /**
         * Enemy attack rate, between 0 and 1 where 1 is fastest
         * @type {number}
         */
        this.attackRate = options.attackRate !== undefined ? options.attackRate : 0.0025;

        /**
         * Percentage chance to drop power-ups
         * @type {Number}
         */
        this.dropMultiplier = options.dropMultiplier !== undefined ? options.dropMultiplier : 1;

        /**
         * Health total
         * @type {Number}
         */
        this.startingHealth = options.startingHealth !== undefined ? options.startingHealth : 2;

        /**
         * Health total
         * @type {Number}
         */
        this.health = options.health !== undefined ? options.health : 2;
    }

    /**
     * Create a new attack
     * @return this
     */
    attack() {
        if(Math.random() >= 1 - this.attackRate) {
            GAME.enemyAttacks.push(new Projectile(this.xPosition + this.getWidth() / 2, this.yPosition + this.getHeight(), {ySpeed: 3, src: directory + "images/projectile2.png"}));
        }
        return this;
    }

    /**
     * Randomize unit attack rate
     * @param  {number} min  Minimum attack rate
     * @param  {number} max  Maximum attack rate
     * @return this
     */
    randomizeAttackRate(min = 0, max = 1) {
        this.attackRate = Math.floor(min + Math.random() * (max - min + 1));
        return this;
    }

    /**
     * Randomize horizontal speed
     * @param  {number} min  Minimum speed
     * @param  {number} max  Maximum speed
     * @return this
     */
    randomizeXSpeed(min = 1, max = 10) {
        this.xSpeed = Math.floor(min + Math.random() * (max - min + 1));
        return this;
    }

    /**
     * Randomize vertical speed
     * @param  {number} min  Minimum speed
     * @param  {number} max  Maximum speed
     * @return this
     */
    randomizeYSpeed(min = 1, max = 10) {
        this.ySpeed = Math.floor(min + Math.random() * (max - min + 1));
        return this;
    }

    randomizeSpeed(min = 1, max = 10) {
        this.randomizeXSpeed(min, max);
        this.randomizeYSpeed(min, max);
        return this;
    }

    /**
     * Randomize horizontal movement direction
     * @return this
     */
    randomizeXMovement() {
        this.movingRight = Math.floor(Math.random() * 2) ? true : false;
        return this;
    }

    /**
     * Randomize vertical movement direction
     * @return this
     */
    randomizeYMovement() {
        this.movingUp = Math.floor(Math.random() * 2) ? true : false;
        return this;
    }

    /**
     * Randomize vertical and horizontal movement directions
     * @return this
     */
    randomizeMovement() {
        this.randomizeXMovement();
        this.randomizeYMovement();
        return this;
    }

    /**
     * Drop a power-up
     * @return this
     */
    dropPowerUps() {
        if(Math.random() >= 1 - ExtraLife.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new ExtraLife(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - (WeaponUpgrade.dropRate() * this.dropMultiplier)) {
            GAME.powerUps.push(new WeaponUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - SpeedUpgrade.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new SpeedUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - SizeUpgrade.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new SizeUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - AttackRateUpgrade.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new AttackRateUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - AttackDamageUpgrade.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new AttackDamageUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - AttackSpeedUpgrade.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new AttackSpeedUpgrade(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - ExtraBoardClear.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new ExtraBoardClear(this.xPosition, this.yPosition));
        }
        if(Math.random() >= 1 - ExtraBomb.dropRate() * this.dropMultiplier) {
            GAME.powerUps.push(new ExtraBomb(this.xPosition, this.yPosition));
        }
        return this;
    }

    /**
     * Trigger death events
     * @return this
     */
    onDeath() {
        GAME.incrementScore(this.points);
        if(!environment.isMuted) {
            this.deathAudio.play();
        }
        this.dropPowerUps();
        return this;
    }
}

class Boss extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 1000;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/flying-beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 141;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 96;

        /**
         * Starting health
         * @type {integer}
         */
        this.startingHealth = options.health !== undefined ? options.health : 1000;

        /**
         * Current health
         * @type {integer}
         */
        this.health = options.health !== undefined ? options.health : 1000;

        /**
         * Death audio object
         * @param {object}
         */
        this.deathAudio = environment.audio6;
    }

    /**
     * Draw current health
     * @return null
     */
    drawHealth() {
        GAME.context.fillStyle = "red";
        GAME.context.fillRect(13, (GAME.canvas.height / 10) + ((this.startingHealth - this.health) * (GAME.canvas.height * 0.6 - 6) / this.startingHealth) + 3, 44, this.health * (GAME.canvas.height * 0.6 - 6) / this.startingHealth);
    }

    /**
     * Draw health container
     * @return null
     */
    drawHealthContainer() {
        GAME.context.lineWidth = 6;
        GAME.context.strokeStyle = "black";
        GAME.context.strokeRect(10, GAME.canvas.height / 10, 50, GAME.canvas.height * 0.6);
    }
}

class Bee extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 35;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 3;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/bee-sprite.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 100;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 63;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 1;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        this.numberOfFrames = 4;
    }
}

class RedBee extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 35;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 3;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/bee-sprite-red.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 100;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 63;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 1;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        this.numberOfFrames = 4;
    }
}

class Beetle extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 50;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 6;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 75;

        /**
         * Attack rate
         * @type {Number}
         */
        this.attackRate = options.attackRate !== undefined ? options.attackRate : 0.01;
    }
}

class FlyingBeetle extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 125;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 7;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/flying-beetle.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 141;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 96;

        /**
         * Enemy attack rate
         * @type {Number}
         */
        this.attackRate = options.attackRate !== undefined ? options.attackRate : 0.02;
    }
}

class StickBug extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 75;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 8;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/beetle2.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 81;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 100;

        /**
         * Enemy attack rate
         * @type {Number}
         */
        this.attackRate = options.attackRate !== undefined ? options.attackRate : 0.015;
    }
}

class Spider extends Enemy {

    /**
     * Instantiate the new object
     * @param  {integer} xPos The horizontal position of the object
     * @param  {integer} yPos The vertical position of the object
     */
    constructor(xPos, yPos, options = {}) {

        /**
         * Call the parent class' constructor
         */
        super(xPos, yPos, options);

        /**
         * Enemy point value
         * @type {Number}
         */
        this.points = options.points !== undefined ? options.points : 25;

        /**
         * Horizontal speed
         * @type {Number}
         */
        this.xSpeed = options.xSpeed !== undefined ? options.xSpeed : 2;

        /**
         * Object's image
         */
        this.image = new Image();

        /**
         * Image location
         * @type {String}
         */
        this.image.src = directory + "images/spider-sprite.png";

        /**
         * Object width
         * @type {Number}
         */
        this.width = options.width !== undefined ? options.width : 75;

        /**
         * Object height
         * @type {Number}
         */
        this.height = options.height !== undefined ? options.height : 75;

        /**
         * Animation speed (number of cycles before changing frames)
         * @type {integer}
         */
        this.frameDelay = options.frameDelay !== undefined ? options.frameDelay : 3;

        /**
         * Current number of delayed frames
         * @type {integer}
         */
        this.delayCount = options.delayCount !== undefined ? options.delayCount : 0;

        /**
         * Number of animation frames
         * @type {Number}
         */
        this.numberOfFrames = 10;
    }
}

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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60).randomizeYSpeed(2, 4).randomizeXSpeed(2, 4).randomizeMovement());
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 350));
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
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 150).randomizeYSpeed(3, 5).randomizeXSpeed(3, 5).randomizeMovement());
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 250));
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 350));
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 150));
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 150));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 250));
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 60));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 150));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 250));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 350));
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
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Beetle((i * 100) + 25, 60));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 150));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 250));
    }
    for(let i = 0; i < 5; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 350));
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
    GAME.enemies.push(new Boss(GAME.canvas.width / 4, 10, {attackRate: .05, xSpeed: 1, ySpeed: 1, scale: 3, health: 100, points: 10000}).randomizeMovement());

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
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Beetle((i * 100) + 25, 60, {scale: .5, health: 5}));
    }
    for(let i = 0; i < 6; i++) {
        GAME.enemies.push(new FlyingBeetle((i * 100) + 25, 100, {scale: .5, health: 5}));
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new StickBug((i * 100) + 25, 150, {scale: .5, health: 5}));
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Bee((i * 100) + 25, 250, {scale: .5, health: 5}));
    }
    for(let i = 0; i < 10; i++) {
        GAME.enemies.push(new Spider((i * 100) + 25, 350, {scale: .5, health: 5}));
    }
    for(let enemy of GAME.enemies) {
        enemy.randomizeYSpeed();
        enemy.randomizeXSpeed();
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
 * Global Objects
 */

/**
 * The user
 * @type {Person}
 */
var user;

var directory = "bug-attack/"

var environment = new Environment();

var menu = new Menu();

/**
 * The main game object
 * @type {Object}
 */
var GAME = new Game();
