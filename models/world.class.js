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
import { MovableObject } from "./movable-object.class.js";

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
     * @param {function} showGameOverScreen - Callback function that displays the game over screen.
     * @param {function} showGameWonScreen - Callback function that displays the victory screen.
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
    /**
     * Checks whether the player has lost the game.
     *
     * If the character is dead, the method waits until the death animation has
     * finished before ending the game. Once the delay has passed, the game loop
     * is stopped and the game over screen is displayed.
     *
     * @returns {void}
     */
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

    /**
     * Checks whether the player has won the game.
     *
     * The game is won when the endboss has been defeated. After the endboss dies,
     * the method waits for the death animation to finish before stopping the game
     * and displaying the victory screen.
     *
     * @returns {void}
     */
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

    /**
     * Executes all collision-related checks for the current game update.
     *
     * This method coordinates the game's collision detection by checking for
     * collectible items, throwable object impacts, enemy interactions, player
     * damage, and the removal of defeated enemies.
     *
     * @returns {void}
     */
    checkCollisions() {
        this.collectCoin();
        this.collectBottle();
        this.checkBottleCollisions();
        this.stompEnemy();
        this.loseEnergy();
        this.removeDeadEnemy();
    }

    /**
     * Detects collisions between the character and collectible coins.
     *
     * When the character collides with a coin, the coin is removed from the level,
     * the collected coin counter is increased, the coin status bar is updated,
     * and the corresponding collection sound is played.
     *
     * @returns {void}
     */
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

    /**
     * Detects collisions between the character and collectible bottles.
     *
     * Each collected bottle is removed from the level, increases the player's
     * bottle count, updates the bottle status bar based on the total number of
     * available bottles, and plays the bottle collection sound.
     *
     * @returns {void}
     */
    collectBottle() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];

            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCounter++;
                let percentage = (this.bottleCounter / this.totalBottles) * 100;
                this.statusBarBottles.setPercentage(percentage);
                SoundHub.playOne(SoundHub.bottle, 0.4);
            }
        }
    }

    /**
     * Checks whether the character collides with enemies and applies damage.
     *
     * The method loops through all enemies in the current level and checks for
     * collisions with the character. Dead enemies are ignored. If the character
     * is hit by an active enemy and is not already hurt, the character loses
     * energy and the health status bar is updated with the new energy value.
     *
     * @returns {void}
     */
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

    /**
     * Checks whether the character stomps on enemies.
     *
     * If the character collides with an active enemy while falling from above,
     * the enemy is defeated. After a successful stomp, the character's vertical
     * speed is reset to 0 to allow the falling condition to be triggered again for
     * future enemy interactions.
     *
     * Dead enemies are ignored and cannot be stomped again.
     *
     * @returns {void}
     */
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
                this.character.speedY = 0;
            }
        });
    }

    /**
     * Removes defeated enemies from the current level.
     *
     * The method loops through all enemies and checks whether they are dead (energy=0).
     * When an enemy dies, its death time is stored in the enemy object.
     * (the variable deathTime is set to the current time)
     *
     * During collision handling, dead enemies are marked by setting their energy
     * to zero and saving the current timestamp as their death time.
     *
     * This method checks how much time has passed since the enemy died and removes the enemy
     * from the level after the death animation has finished.
     *
     * Currently, only Chicken and BabyChicken enemies are removed. Other enemy
     * types, such as the Endboss, remain in the level after death.
     *
     * @returns {void}
     */
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
    /**
     * Checks collisions between thrown bottles and enemies.
     *
     * The method loops through all currently active throwable bottles and checks
     * whether they collide with the endboss or other enemies. The specific
     * collision handling is delegated to separate methods for each enemy type.
     *
     * @returns {void}
     */
    checkBottleCollisions() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            let bottle = this.throwableObjects[i];

            this.checkCollisionWithEndboss(bottle, i);
            this.checkCollisionWithEnemies(bottle, i);
        }
    }

    /**
     * Checks whether a thrown bottle collides with the endboss.
     *
     * If a collision is detected between a bottle and the endboss, the endboss
     * receives damage, the endboss health bar is updated, and the used bottle is
     * removed from the active throwable objects. A breaking sound effect is played
     * to indicate the impact.
     *
     * @param {ThrowableObject} bottle - The thrown bottle being checked for collision.
     * @param {number} i - The index of the bottle in the throwable objects array.
     *
     * @returns {void}
     */
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

    /**
     * Checks whether a thrown bottle collides with regular enemies.
     *
     * If a bottle collides with a Chicken or BabyChicken, the enemy is defeated,
     * the used bottle is removed from the active throwable objects, and a breaking
     * sound effect is played.
     *
     * @param {ThrowableObject} bottle - The thrown bottle being checked for collision.
     * @param {number} i - The index of the bottle in the throwable objects array.
     *
     * @returns {void}
     */
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

    /**
     * Checks whether the player can throw a bottle.
     *
     * If bottles are available, the method calculates the time passed since the
     * last throw and passes this value to the throwing logic. The method controls
     * when a new ThrowableObject can be created based on the player's bottle count
     * and the time passed.
     *
     * @returns {void}
     */
    checkThrowObjects() {
        if (this.bottleCounter <= this.totalBottles && this.bottleCounter > 0) {
            let timePassed = new Date().getTime() - this.lastThrow;
            timePassed /= 1000;

            this.throwBottle(timePassed);
        }
    }

    /**
     * Creates and throws a new bottle object.
     *
     * A bottle is created only if the time till lastThrow has passed and the throw
     * key (D) is pressed. The new ThrowableObject receives its starting position
     * based on the character's location and direction, then gets added to the
     * active throwable objects array.
     *
     * After throwing, the method updates the last throw timestamp, decreases
     * the available bottle count, and updates the bottle status bar.
     *
     * @param {number} timePassed - Time in seconds since the last bottle was thrown.
     *
     * @returns {void}
     */
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

    /**
     * Calculates the horizontal starting position for a thrown bottle.
     *
     * The bottle position is adjusted depending on the direction the character
     * is facing. If the character is looking left, the bottle starts slightly
     * behind the character; otherwise, it starts in front of the character.
     *
     * @returns {number} The x-coordinate where the thrown bottle should be created.
     */
    getBottleX() {
        if (this.character.otherDirection) {
            return this.character.x - 10;
        } else {
            return this.character.x + 100;
        }
    }

    /**
     * Updates the state of thrown bottles based on their location.
     *
     * When a thrown bottle reaches the ground, the splash animation is triggered.
     * After the splash animation has finished, the bottle is removed from the
     * active throwable objects array.
     *
     * This method manages the complete lifecycle of thrown bottles after they
     * leave the character's hand.
     *
     * @returns {void}
     */
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
    /**
     * Renders all game elements onto the canvas.
     *
     * This method acts as the main rendering loop of the game. It clears the
     * canvas, draws the game world, and updates the status bars. Individual
     * objects are drawn using helper methods such as addToMap(), while arrays
     * of objects are handled using addObjectsToMap().
     *
     * requestAnimationFrame() continuously calls this method to create the
     * animation loop and keep the game visuals updated.
     *
     * An arrow function is used inside requestAnimationFrame() to preserve the
     * World class context (`this`). This ensures that methods and properties of
     * the World instance remain accessible during the rendering loop.
     *
     * @returns {void}
     */
    draw() {
        this.clearCanvas();
        this.drawWorld();
        this.drawStatusBar();
        // main game loop
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the entire canvas before the next frame is rendered.
     *
     * Removes all previously drawn pixels from the canvas area to prepare
     * it for the next rendering cycle.
     *
     * @returns {void}
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all game world objects onto the canvas.
     *
     * The camera position is applied before rendering world objects to create the
     * scrolling effect as the character moves. After drawing all objects affected
     * by the camera, the camera offset is reset so fixed UI elements such as the
     * status bars remain in their original position.
     *
     * The method draws background elements, the character, enemies, throwable
     * objects, and collectibles using the corresponding drawing helper methods.
     *
     * @returns {void}
     */
    drawWorld() {
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all status bar elements onto the canvas.
     *
     * The status bars are rendered separately from the game world so they remain
     * fixed on the screen and are not affected by camera movement.
     *
     * This includes the player's health, coin counter, bottle counter,
     * and endboss health display.
     *
     * @returns {void}
     */
    drawStatusBar() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws multiple objects onto the canvas.
     *
     * This helper method loops through an array of game objects and passes each
     * individual object to addToMap() for rendering.
     *
     * It is used for collections such as enemies, clouds, background objects,
     * throwable objects, and collectibles.
     *
     * @param {DrawableObject[]} objects - Array of objects that should be drawn.
     *
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single game object onto the canvas.
     *
     * Before rendering, the method checks whether the object is facing the
     * opposite direction and temporarily flips the canvas context to mirror
     * the image. After drawing the object, the original canvas orientation is
     * restored.
     *
     * For specific interactive game objects, collision frames are also drawn
     * to visualize their hitboxes during development.
     *
     * @param {MovableObject} mo - The game object that should be rendered.
     *
     * @returns {void}
     */
    addToMap(mo) {
        if (mo.otherDirection === true) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // only draw rectangle if its a character or chicken object for implementing collisions
        // if (
        //     mo instanceof Character ||
        //     mo instanceof Endboss ||
        //     mo instanceof Chicken ||
        //     mo instanceof BabyChicken ||
        //     mo instanceof Bottle ||
        //     mo instanceof Coin
        // ) {
        //     mo.drawFrame(this.ctx);
        // }

        if (mo.otherDirection === true) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the canvas context horizontally to mirror a game object.
     *
     * This method is used when an object is facing the opposite direction.
     * It saves the current canvas state, moves the coordinate system, and scales
     * the canvas horizontally by -1 to create a mirrored drawing effect.
     *
     * The original canvas state should be restored by calling flipImageBack()
     * after the object has been drawn.
     *
     * @param {MovableObject} mo - The object that should be mirrored.
     *
     * @returns {void}
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after an object has been mirrored.
     *
     * This method reverses the temporary canvas transformation created by
     * flipImage() and resets the object's x-coordinate back to its original
     * position.
     *
     * @param {MovableObject} mo - The object that was previously mirrored.
     *
     * @returns {void}
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    // #endregion
    // #endregion
}
