// World is the main game state --> created after game.js initializes everything
// imports all elements of the game as well as IntervalHub and ImageHelper
// no need to import drawableObjects > (movableObjects )--> cause they are only used by their subclasses??
// StatusBar is on the same hierachy level as MovableObject --> siblings
// character gets initialized
// levels are connected here

// #region Imports
import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { Level } from "./level.class.js";
import { initLevel1 } from "../levels/level1.js";
import { StatusBarHealth } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Bottle } from "./bottle.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatus } from "./status-bar-coins.class.js";
import { BottleStatus } from "./status-bar-bottles.class.js";
import { EndbossStatus } from "./status-bar-endboss.class.js";
import { Endboss } from "./endboss.class.js";
import { BabyChicken } from "./baby-chicken.class.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

// #endregion

/**
 * Represents the complete game world and controls the main game.
 *
 * The World class manages rendering, player movement, enemies,
 * collectibles, UI elements and game states.
 * @class
 */
export class World {
    // #region properties
    /**
     * @property {boolean} gameStarted - Indicates whether the game has started.
     * @property {boolean} gameOver - Indicates whether the player has lost.
     * @property {boolean} gameWon - Indicates whether the player has won.
     * @property {Character} character - The playable character instance.
     * @property {Level} level - The currently active game level.
     * @property {CanvasRenderingContext2D} ctx - The canvas drawing context.
     * @property {HTMLCanvasElement} canvas - The game canvas element.
     * @property {Keyboard} keyboard - Keyboard input handler.
     * @property {number} camera_x - Current camera offset for scrolling.
     * @property {StatusBarHealth} statusBar - Player health display.
     * @property {CoinStatus} statusBar - Coin counter display.
     * @property {BottleStatus} statusBar - Bottle counter display.
     * @property {EndbossStatus} statusBar - Endboss health display.
     * @property {ThrowableObject[]} throwableObjects - Array of active throwable objects.
     * @property {number} coinCounter - Amount of collected coins.
     * @property {number} totalCoins - Total coins available in the level.
     * @property {number} bottleCounter - Amount of collected bottles.
     * @property {number} totalBottles - Total bottles available in the level.
     * @property {number} lastThrow - Timestamp of the last throwable object creation.
     * @property {function} showGameOverScreen - Function used to display the game over screen.
     * @property {function} showGameWonScreen - Function used to display the game won screen.
     */
    gameStarted = false;
    gameOver = false;
    gameWon = false;
    character;
    level;
    ctx;
    canvas;
    keyboard;
    camera_x = 0; // Camera vertical scrolling behavior
    statusBar = new StatusBarHealth();
    statusBarCoins = new CoinStatus();
    statusBarBottles = new BottleStatus();
    statusBarEndboss = new EndbossStatus();
    throwableObjects = [];
    coinCounter = 0;
    totalCoins = 30;
    bottleCounter = 0;
    totalBottles = 8;
    lastThrow = 0;
    showGameOverScreen;
    showGameWonScreen;

    // #endregion

    /**
     * Creates a new World instance and initializes the game.
     *
     * The constructor receives the canvas and keyboard instances from game.js and
     * stores them inside the World class, making them accessible throughout the
     * entire game world.
     *
     * The constructor creates the canvas rendering context using the predefined 2D context,
     * stores references to keyboard input and screen callbacks,
     * creates the character and level,
     * connects game objects to the world instance,
     * starts rendering and activates the game loop.
     *
     * @constructor
     *
     * @param {HTMLCanvasElement} canvas - Canvas element used for rendering.
     * @param {Keyboard} keyboard - Global keyboard input handler.
     * @param {() => void} showGameOverScreen - Callback function that displays the game over screen.
     * @param {() => void} showGameWonScreen - Callback function that displays the victory screen.
     */
    constructor(canvas, keyboard, showGameOverScreen, showGameWonScreen) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.showGameOverScreen = showGameOverScreen;
        this.showGameWonScreen = showGameWonScreen;

        this.character = new Character();
        this.level = initLevel1(); //current level data

        this.setWorld();
        this.draw();
        IntervalHub.startInterval(this.run, 1000 / 60);
    }

    // #region methods

    /**
     * setWorld() assigns this World instance as a reference to the character and enemies.
     * This reference allows game objects to access shared world information such as
     * keyboard input, level data, and camera position.
     *
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    // #region game start/stop
    // method for running other methods like collision or throwObjects
    /**
     * This method is called repeatedly by the game loop (interval)
     * it coordinates checks, including game over conditions, victory conditions,
     * bottle collection, collisions, and throwing objects.
     *
     * @returns {void}
     */
    run = () => {
        if (this.gameOver) return;

        this.checkGameOver();
        this.checkGameWon();
        this.checkBottleLocation();
        this.checkCollisions();
        this.checkThrowObjects();
    };

    /**
     * This method stops all running intervals to pause game updates and sounds, 
     * when game is won lost or exited.
     *
     * @returns {void}
     */
    stopGame() {
        IntervalHub.stopAllIntervals();
        SoundHub.pauseAll();
    }
    // #endregion

    // #region game state
    checkGameOver() {
        if (this.character.isDead()) {
            let timePassed = new Date().getTime() - this.character.deathTime;
            timePassed /= 1000;

            if (timePassed > 2) {
                this.gameOver = true;

                this.stopGame();
                this.showGameOverScreen();
            }
        }
    }

    checkGameWon() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isDead()) {
                let timePassed = new Date().getTime() - enemy.deathTime;
                timePassed /= 1000;

                if (timePassed > 1.5) {
                    this.gameWon = true;

                    this.stopGame();
                    this.showGameWonScreen();
                }
            }
        });
    }

    // #endregion

    // #region collisions
    // loops through the enemies of the level and checks if the enemy collides with the character
    // calls isColliding(), hit() from Character class
    // calls setPercentage from StatusBar and passes the characters energy into it as percentage value
    checkCollisions() {
        this.collectCoin();
        this.collectBottle();
        this.checkBottleCollisions();
        this.stompEnemy();
        this.loseEnergy();
        this.removeDeadEnemy();
    }

    collectCoin() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinCounter++;
                let percentage = (this.coinCounter / this.totalCoins) * 100;
                this.statusBarCoins.setPercentage(percentage);
                SoundHub.playOne(SoundHub.coin, 0.05);
            }
        }
    }

    collectBottle() {
        for (let j = 0; j < this.level.bottles.length; j++) {
            let bottle = this.level.bottles[j];

            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(j, 1);
                this.bottleCounter++;
                let percentage = (this.bottleCounter / this.totalBottles) * 100;
                this.statusBarBottles.setPercentage(percentage);
                SoundHub.playOne(SoundHub.bottle, 0.4);
            }
        }
    }

    loseEnergy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                return;
            }

            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hit(enemy.damage);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    stompEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                return;
            }

            const fallingDown = this.character.speedY <= 0;

            if (
                this.character.isColliding(enemy) &&
                fallingDown &&
                this.character.isAboveGround()
            ) {
                enemy.die();

                // resets speedY to be above 0 again so the falling down condition works every time
                this.character.speedY = 0;
            }
        });
    }

    // go through all the enemies array
    // check if each enemy isDead (energy=0)
    // in collision we set energy to 0 to mark the death we also time stamp it
    // and set the variable deathTime in class chicken to the current time
    // we loop through enemies to check if they are dead
    // if so we check the time passed since the moment they dies
    // if it is over 1Second we splice this exact enemy from the array
    removeDeadEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];

            if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
                if (enemy.isDead()) {
                    let timePassed = new Date().getTime() - enemy.deathTime; // difference since death in ms
                    timePassed /= 1000;

                    if (timePassed > 1) {
                        this.level.enemies.splice(i, 1);
                    }
                }
            }
        }
    }
    // #endregion

    // #region throwable object
    checkBottleCollisions() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            let bottle = this.throwableObjects[i];

            this.checkCollisionWithEndboss(bottle, i);
            this.checkCollisionWithEnemies(bottle, i);
        }
    }

    checkCollisionWithEndboss(bottle, i) {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                enemy.hit();
                this.statusBarEndboss.setPercentage(enemy.energy);
                this.throwableObjects.splice(i, 1);
                SoundHub.playOne(SoundHub.break, 0.2);
            }
        });
    }

    checkCollisionWithEnemies(bottle, i) {
        this.level.enemies.forEach((enemy) => {
            if (
                (enemy instanceof Chicken || enemy instanceof BabyChicken) &&
                bottle.isColliding(enemy)
            ) {
                enemy.die();
                this.throwableObjects.splice(i, 1);
                SoundHub.playOne(SoundHub.break, 0.2);
            }
        });
    }

    // creates new ThrowableObject if D is pressed on keyboard and pushes it (bottle) into array
    checkThrowObjects() {
        if (this.bottleCounter <= this.totalBottles && this.bottleCounter > 0) {
            let timePassed = new Date().getTime() - this.lastThrow;
            timePassed /= 1000;

            this.throwBottle(timePassed);
        }
    }

    throwBottle(timePassed) {
        if (timePassed > 0.5 && this.keyboard.D) {
            let bottle = new ThrowableObject(
                this.getBottleX(),
                this.character.y + 100,
                this.character.otherDirection,
            );

            this.throwableObjects.push(bottle);

            this.lastThrow = new Date().getTime();

            this.bottleCounter--;
            let percentage = (this.bottleCounter / this.totalBottles) * 100;
            this.statusBarBottles.setPercentage(percentage);
        }
    }

    getBottleX() {
        if (this.character.otherDirection) {
            return this.character.x - 10;
        } else {
            return this.character.x + 100;
        }
    }

    checkBottleLocation() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            let bottle = this.throwableObjects[i];

            if (bottle.hasSplashed) {
                let timePassed = new Date().getTime() - bottle.splashTime;
                timePassed /= 1000;

                if (timePassed > 0.3) {
                    this.throwableObjects.splice(i, 1);
                }
            }

            if (bottle.isOnGround() && !bottle.hasSplashed) {
                bottle.splashBottle();
            }
        }
    }

    // #endregion

    // #region draw
    // draws all objects onto canvas
    // addToMap --> draws one object
    // addObjectsToMap --> draws an array / is a loop
    draw() {
        this.clearCanvas();
        this.drawWorld();
        this.drawStatusBar();
        // main game loop
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawWorld() {
        // camera movement scroll effect
        // reset camera so that status bar sticks to position when character is moving
        this.ctx.translate(this.camera_x, 0); // move camera forward

        // Draw world objects (affected by camera)
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0); // move camera back
    }

    drawStatusBar() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        //  mirror image
        if (mo.otherDirection === true) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // only draw rectangle if its a character or chicken object for implementing collisions
        if (
            mo instanceof Character ||
            mo instanceof Endboss ||
            mo instanceof Chicken ||
            mo instanceof BabyChicken ||
            mo instanceof Bottle ||
            mo instanceof Coin
        ) {
            mo.drawFrame(this.ctx);
        }

        if (mo.otherDirection === true) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    // #endregion
    // #endregion
}
