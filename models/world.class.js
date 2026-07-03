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
import { level1 } from "../levels/level1.js";
import { StatusBarHealth } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Bottle } from "./bottle.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatus } from "./status-bar-coins.class.js";
import { BottleStatus } from "./status-bar-bottles.class.js";
import { EndbossStatus } from "./status-bar-endboss.class.js";
import { Endboss } from "./endboss.class.js";
import { BabyChicken } from "./baby-chicken.class.js";

// #endregion

export class World {
    // #region properties
    character = new Character();
    level = level1; //current level data
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
    totalCoins = 16;
    bottleCounter = 0;
    totalBottles = 5;

    // #endregion

    // create canvas with predefined canvas.getContext("2d");
    // constructor receives canvas and keyboard variables from game.js
    // canvas and keyboard are assigned to variables within World class so they are accessible
    // initialize methods in constructor for setting world(whole world class is made accesible to character)
    // --> drawing the elements and run intervals
    // Gives the Character a reference to the World instance,
    // allowing the Character to access things like keyboard, level, and camera.
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        IntervalHub.startInterval(this.run, 200);
    }

    // #region methods
    // hand over world instance to character so that keyboard can be accessed ???
    setWorld() {
        this.character.world = this;
    }

    // method for running other methods like collision or throwObjects
    run = () => {
        this.checkCollisions();
        this.checkThrowObjects();
    };

    // loops through the enemies of the level and checks if the enemy collides with the character
    // calls isColliding(), hit() from Character class
    // calls setPercentage from StatusBar and passes the characters energy into it as percentage value
    checkCollisions() {
        this.loseEnergy();
        this.collectCoin();
        this.collectBottle();
        this.checkBottleCollisions();
        this.checkStompCollision();
        this.removeDeadEnemy();
    }

    checkBottleCollisions() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            let bottle = this.throwableObjects[i];

            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.statusBarEndboss.setPercentage(enemy.energy);
                    console.log(enemy.energy);
                    this.throwableObjects.splice(i, 1);
                }

                if (
                    (enemy instanceof Chicken ||
                        enemy instanceof BabyChicken) &&
                    bottle.isColliding(enemy)
                ) {
                    enemy.energy = 0;
                    enemy.deathTime = new Date().getTime();
                    this.throwableObjects.splice(i, 1);
                }
            });
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
                console.log(this.bottleCounter);
            }
        }
    }

    // creates new ThrowableObject if D is pressed on keyboard and pushes it (bottle) into array
    checkThrowObjects() {
        if (this.bottleCounter <= this.totalBottles && this.bottleCounter > 0) {
            if (this.keyboard.D) {
                let bottle = new ThrowableObject(
                    this.character.x + 100,
                    this.character.y + 100,
                );
                this.throwableObjects.push(bottle);

                this.bottleCounter--;
                let percentage = (this.bottleCounter / this.totalBottles) * 100;
                this.statusBarBottles.setPercentage(percentage);

                console.log(this.bottleCounter);
            }
        }
    }

    //  only works with many conditional statements otherwise it doesn't register
    checkStompCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
                const characterBottom =
                    this.character.y +
                    this.character.height +
                    this.character.offset.bottom;
                const enemyTop = enemy.y + enemy.offset.top;

                // needs to fall down so we need to say that the position of the character was above the enemy
                const fallingDown =
                    this.character.speedY < 0 && this.character.y < enemy.y;

                const horizontalCollision =
                    this.character.x +
                        this.character.width -
                        this.character.offset.left >
                        enemy.x + enemy.offset.left &&
                    enemy.x + enemy.width - enemy.offset.left >
                        this.character.x + this.character.offset.left;

                const verticalCollision = characterBottom >= enemyTop;

                if (verticalCollision && horizontalCollision && fallingDown) {
                    enemy.energy = 0;
                    enemy.deathTime = new Date().getTime();
                }
            }
        });
    }

    loseEnergy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    collectCoin() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinCounter++;
                let percentage = (this.coinCounter / this.totalCoins) * 100;
                this.statusBarCoins.setPercentage(percentage);
            }
        }
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

    // draws all objects onto canvas
    // addToMap --> draws one object
    // addObjectsToMap --> draws an array / is a loop
    draw() {
        // Clears previous frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // camera movement scroll effect
        this.ctx.translate(this.camera_x, 0);

        // Draw world objects (affected by camera)
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        // reset camera so that status bar sticks to position when character is moving
        this.ctx.translate(-this.camera_x, 0); // move camera back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0); // move camera forward

        this.ctx.translate(-this.camera_x, 0);

        // main game loop
        requestAnimationFrame(() => this.draw());
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
}
