import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Character extends MovableObject {
    // #region properties
    height = 280;
    y = 140;
    speed = 10;
    imagesWalk = ImageHelper.CHARACTER.walk;
    imagesJump = ImageHelper.CHARACTER.jump;
    imagesDead = ImageHelper.CHARACTER.dead;
    imagesHurt = ImageHelper.CHARACTER.hurt;
    imagesIdle = ImageHelper.CHARACTER.idle;
    imagesLongIdle = ImageHelper.CHARACTER.longIdle;
    // setWorld  assigns world class to this property so world is available to character
    world;

    offset = {
        top: 100,
        left: 30,
        right: 30,
        bottom: 10,
    };
    lastMove = 0;
    longIdleStart = 15;
    // #endregion

    constructor() {
        super();
        this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.applyGravity();
        this.animate();
        this.lastMove = new Date().getTime();
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
                this.lastMove = new Date().getTime();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.lastMove = new Date().getTime();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.lastMove = new Date().getTime();
            }

            // tie camera to character
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        // walking, jumping, dead animation
        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.imagesJump);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.imagesWalk);
            } else if (this.isLongIdle()) {
                this.playAnimation(this.imagesLongIdle);
            } else {
                this.playAnimation(this.imagesIdle);
            }
        }, 50);
    }

    jump() {
        this.speedY = 30;
    }

    // we add long idle state so that character falls asleep if it has not been moved for 15 seconds
    // set variable last move = 0; then assign the current timestamp (now) in constructor with:
    // this.lastMove = new Date().getTime();
    // whenever character is moved with <-- SPACE --> lastMove gets the new timestamp
    // in isLongIdle we check timePassed as in the difference since the character was moved last
    // when the difference is bigger than 15 we return true and the longIdle animation is executed
    isLongIdle() {
        let timePassed = new Date().getTime() - this.lastMove; // difference since last move in ms
        timePassed /= 1000; // difference in sec
        return timePassed > this.longIdleStart;
    }

    // #endregion
}
