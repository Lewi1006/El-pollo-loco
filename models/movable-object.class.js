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
    
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    throwable = false;
    // #endregion

    // #region methods

    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this.throwable == true) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    // character.isColliding(Chicken);
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }

    // returns true if hit happened in the past second
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference since last hit in ms
        timePassed /= 1000; // difference in sec
        return timePassed < 1;
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
