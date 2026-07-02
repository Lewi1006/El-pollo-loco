import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class ThrowableObject extends MovableObject {
    imagesBottleRotation = ImageHelper.BOTTLE.rotation;

    throwable = true;

    constructor(x, y) {
        super();
        this.loadImage(ImageHelper.BOTTLE.rotation[0]);
        this.loadImages(this.imagesBottleRotation);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.throw();

        console.log(this.imagesBottleRotation);
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        IntervalHub.startInterval(() => {
            this.x += 10;
        }, 25);

        this.rotateBottle();
    }

    rotateBottle() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.imagesBottleRotation);
        }, 120);
    }
}
