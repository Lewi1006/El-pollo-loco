import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Character extends MovableObject {
    // #region properties
    height = 280;
    y = 80;
    speed = 10;
    imagesWalk = ImageHelper.CHARACTER.walk;
    imagesJump = ImageHelper.CHARACTER.jump;
    // setWorld  assigns world class to this property so world is available to character
    world;
    // #endregion

    constructor() {
        super();
        this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.animate();
        this.applyGravity();
        console.log(this.world);
    }

    // #region methods

    animate() {
        // walking speed
        IntervalHub.startInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            // tie camera to character
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        // walking and jumping animation
        IntervalHub.startInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJump);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalk);
                }
            }
        }, 50);
    }

    jump() {
        this.speedY = 30;
    }

    // #endregion
}
