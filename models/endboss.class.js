import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Endboss extends MovableObject {
    // #region properties
    height = 400;
    width = 250;
    y = 55;
    imagesAlert = ImageHelper.ENDBOSS.alert;
    imagesHurt = ImageHelper.ENDBOSS.hurt;
    imagesDead = ImageHelper.ENDBOSS.dead;
    energy = 100;
    offset = {
        top: 80,
        left: 10,
        right: 5,
        bottom: 20,
    };

    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 2500;
        this.animate();
        IntervalHub.startInterval(this.updateAnimation, 200);
    }

    // #region methods
    animate() {
        this.updateAnimation();
    }

    hit() {
        this.energy -= 50;
        if (this.energy <= 0) {
            this.energy = 0;
            this.deathTime = new Date().getTime();
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    updateAnimation = () => {
        if (this.isDead()) {
            this.stopMovement();

            let timePassed = new Date().getTime() - this.deathTime;
            timePassed /= 1000;

            console.log(timePassed);
            // play animation for 4 seconds and then freeze on last frame
            if (timePassed < 4 ){
                this.playAnimation(this.imagesDead);
            }
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else {
            this.playAnimation(this.imagesAlert);
        }
    };

    // #endregion
}
