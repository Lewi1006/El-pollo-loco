import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Chicken extends MovableObject {
    // #region properties
    y = 360;
    height = 70;
    width = 80;
    imagesWalk = ImageHelper.CHICKEN.walk;

    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    // #region methods

    animate() {
        IntervalHub.startInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            this.playAnimation(this.imagesWalk);
        }, 200);
    }

    // #endregion
}
