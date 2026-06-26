import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Character extends MovableObject {
    // #region properties
    height = 280;
    y = 155;
    speed = 10;
    imagesWalk = ImageHelper.CHARACTER.walk;
    world;
    // #endregion

    constructor() {
        super();
        this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalk);
        this.animate();
        console.log(this.imagesWalk);
    }

    // #region methods
    animate() {
        // walking speed
        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

              if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            // tie camera to character
            this.world.camera_x = - this.x + 100;
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                this.playAnimation(this.imagesWalk);
            }
        }, 50);
    }



    jump() {}

    // #endregion
}

