import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Chicken extends MovableObject {
    // #region properties
    y = 350;
    height = 70;
    width = 80;
    imagesWalk = ImageHelper.CHICKEN.walk;
    imagesDead = ImageHelper.CHICKEN.dead;
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

    // #region methods

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

    // #endregion
}
