import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class BabyChicken extends MovableObject {
    // #region properties
    y = 380;
    height = 40;
    width = 50;
    imagesWalk = ImageHelper.BABY_CHICKEN.walk;
    imagesDead = ImageHelper.BABY_CHICKEN.dead;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 0,
    };
    deathTime = 0;
    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesDead);
        this.x = 400 + Math.random() * 1900;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        IntervalHub.startInterval(this.updateMovement, 1000 / 60);
        IntervalHub.startInterval(this.updateAnimation, 200);
    }

    animate() {
        this.updateMovement();
        this.updateAnimation();
    }

    updateMovement = () => {
        this.moveLeft();
    };

    updateAnimation = () => {
        if (this.isDead()) {
            this.stopMovement();
            this.playAnimation(this.imagesDead);
        } else {
            this.playAnimation(this.imagesWalk);
        }
    };
}
