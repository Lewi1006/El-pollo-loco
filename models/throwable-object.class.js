import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

export class ThrowableObject extends MovableObject {
    // #region properties
    imagesBottleRotation = ImageHelper.BOTTLE.rotation;
    imagesBottleSplash = ImageHelper.BOTTLE.splash;

    throwable = true;
    hasSplashed = false;
    splashTime = 0;
    // #endregion

    // when we create bottle in world we pass the coordinates as well as the diection
    // the character has because bottle should be thrown the way the character is walking into
    constructor(x, y, otherDirection) {
        super();
        this.loadImage(ImageHelper.BOTTLE.rotation[0]);
        this.loadImages(this.imagesBottleRotation);
        this.loadImages(this.imagesBottleSplash);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;

        this.throw();
        this.lastThrow = new Date().getTime();
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.rotateBottle, 120);
        IntervalHub.startInterval(this.throwForward, 25);
    }

    // #region methods

    applyGravity = () => {
        if (this.hasSplashed) return;

        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwForward();
        this.rotateBottle();
    }

    throwForward = () => {
        if (this.hasSplashed) return;

        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    };

    rotateBottle = () => {
        if (this.hasSplashed) return;
        this.playAnimation(this.imagesBottleRotation);
    };

    isOnGround() {
        return this.y >= 380;
    }

    splashBottle() {
        if (this.hasSplashed) return;

        this.hasSplashed = true;
        this.splashTime = new Date().getTime();
        this.playAnimation(this.imagesBottleSplash);

        SoundHub.playOne(SoundHub.break, 0.2);
    }
    // #endregion
}
