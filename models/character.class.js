import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    imagesWalk = ImageHelper.CHARACTER.walk;
    world;

    constructor() {
        super();
        this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalk);
        this.animate();
    }

    animate() {
        // walking speed
        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

              if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            // tie camera to character
            this.world.camera_x = - this.x;
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                // loop array with modulo operator / Walk animation
                let i = this.currentImage % this.imagesWalk.length;
                let path = this.imagesWalk[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {}
}
