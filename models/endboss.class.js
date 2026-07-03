import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Endboss extends MovableObject {
    // #region properties
    height = 400;
    width = 250;
    y = 55;
    imagesAlert = ImageHelper.ENDBOSS.alert;
    imagesWalk = ImageHelper.ENDBOSS.walk;
    imagesHurt = ImageHelper.ENDBOSS.hurt;
    imagesDead = ImageHelper.ENDBOSS.dead;
    energy = 100;
    offset = {
        top: 80,
        left: 10,
        right: 5,
        bottom: 20,
    };
    world;

    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 3900;
        this.speed = 0.1;
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
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    updateAnimation = () => {
        // wait till world is loaded/exists before animation starts
        // https://stackoverflow.com/questions/5339121/how-do-you-implement-a-guard-clause-in-javascript
        if (!this.world) return;

        if (this.isDead()) {
            this.die();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.shouldWalk()) {
            console.log(this.shouldWalk());
            this.playAnimation(this.imagesWalk);
        } else {
            this.playAnimation(this.imagesAlert);
        }
    };

    die() {
        this.stopMovement();

        let timePassed = new Date().getTime() - this.deathTime;
        timePassed /= 1000;

        console.log(timePassed);
        // play animation for 4 seconds and then freeze on last frame
        if (timePassed < 4) {
            this.playAnimation(this.imagesDead);
        }
    }

    shouldWalk() {
        const distance = this.getDistance();
        return distance <= 600;
    }

    // https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
    getDistance() {
        const distanceX = this.world.character.x - this.x;
        const distanceY = this.world.character.y - this.y;
        return Math.hypot(distanceX, distanceY);
    }

    // #endregion



    // why does endboss dissapear when I get close and does not start playing the walking animation
}
