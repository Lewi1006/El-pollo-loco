import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class ThrowableObject extends MovableObject {
    imagesBottleRotation = ImageHelper.BOTTLE.rotation;

    throwable = true;

    // when we create bottle in world we pass the coordinates as well as the diection
    // the character has because bottle should be thrown the way the character is walking into
    constructor(x, y, otherDirection) {
        super();
        this.loadImage(ImageHelper.BOTTLE.rotation[0]);
        this.loadImages(this.imagesBottleRotation);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;

        console.log(this.otherDirection);
        this.throw();
        this.lastThrow = new Date().getTime();
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
        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    };

    rotateBottle = () => {
        this.playAnimation(this.imagesBottleRotation);
    };
}
