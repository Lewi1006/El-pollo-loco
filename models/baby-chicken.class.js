import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

export class BabyChicken extends MovableObject {
    // #region properties
    y = 380;
    height = 40;
    width = 50;
    imagesWalk = ImageHelper.BABY_CHICKEN.walk;
    imagesDead = ImageHelper.BABY_CHICKEN.dead;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    // deathTime = 0;
    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesDead);
        // this.x = 1100 + Math.random() * 3000;
        this.x = 500 + Math.random() * 50;
        // this.speed = 1.2 + Math.random() * 3;
        this.speed = 0;
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
        if (!this.world || !this.world.gameStarted) return;
        this.moveLeft();
    };

    updateAnimation = () => {
        if (!this.world || !this.world.gameStarted) return;
        if (this.isDead()) {
            this.playAnimation(this.imagesDead);
        } else {
            this.playAnimation(this.imagesWalk);
        }
    };

    die() {
        super.die();
        SoundHub.playOne(SoundHub.babyChickenDead, 0.8);
    }

    // #endregion
}
