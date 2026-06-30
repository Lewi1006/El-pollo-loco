// World is the main game state --> created after game.js initializes everything
// imports all elements of the game as well as IntervalHub and ImageHelper
// no need to import drawableObjects > (movableObjects )--> cause they are only used by their subclasses??
// StatusBar is on the same hierachy level as MovableObject --> siblings
// character gets initialized
// levels are connected here

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


export class World {
    // #region properties
    character = new Character();
    level = level1; //current level data
    ctx;
    canvas;
    keyboard;
    camera_x = 0; // Camera vertical scrolling behavior
    statusBar = new StatusBarHealth();
    throwableObjects = [];
   
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
        this.run();
    }

    // #region methods
    // hand over world instance to character so that keyboard can be accessed ???
    setWorld() {
        this.character.world = this;
    }

    // method for running other methods like collision or throwObjects
    run() {
        IntervalHub.startInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    // loops through the enemies of the level and checks if the enemy collides with the character
    // calls isColliding(), hit() from Character class
    // calls setPercentage from StatusBar and passes the characters energy into it as percentage value
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // creates new ThrowableObject if D is pressed on keyboard and pushes it (bottle) into array
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100,
            );
            this.throwableObjects.push(bottle);
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
        if (mo instanceof Character || mo instanceof Chicken) {
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
