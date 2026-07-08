import { IntervalHub } from "../helper_classes/interval-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
    // #region properties
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    throwable = false;
    deathTime = 0;
    hasDied = false;
    world;
    // #endregion

    // #region methods

    // applyGravity gets called in Character and throwable Objects --> interval is in constructor
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    isAboveGround() {
        if (this.throwable == true) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // returns true if hit happened in the past second
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference since last hit in ms
        timePassed /= 1000; // difference in sec
        return timePassed < 1;
    }

    die() {
        if (this.hasDied) {
            return;
        } else {
            this.hasDied = true;
            this.energy = 0;
            this.speed = 0;
            this.deathTime = new Date().getTime();
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        // loop array with modulo operator / Walk animation or for endboss alert animation?
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    // #endregion
}
