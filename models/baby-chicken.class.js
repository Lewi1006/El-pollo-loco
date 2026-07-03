import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class BabyChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 50;
    imagesWalk = ImageHelper.BABY_CHICKEN.walk;

    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.x = 400 + Math.random() * 700;
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
        this.playAnimation(this.imagesWalk);
    };
}
