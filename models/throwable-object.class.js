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
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.rotateBottle, 120);
        IntervalHub.startInterval(this.throwForward, 25);
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwForward();
        this.rotateBottle();
    }

    throwForward = () => {
        this.x += 10;
    };

    rotateBottle = () => {
        this.playAnimation(this.imagesBottleRotation);
    };
}
