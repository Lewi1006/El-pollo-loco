import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Represents a baby chicken enemy in the game.
 *
 * BabyChicken extends MovableObject and uses inherited movement, gravity,
 * collision, health, and animation functionality.
 *
 * It has its own walking and death animations.
 *
 * @class BabyChicken
 */
export class BabyChicken extends MovableObject {
    // #region properties
    /**
     * @property {number} y - Vertical position of the baby chicken.
     * @property {number} height - Height of the baby chicken image.
     * @property {number} width - Width of the baby chicken image.
     * @property {string[]} imagesWalk - Image paths used for the walking animation.
     * @property {string[]} imagesDead - Image paths used for the death animation.
     *  * @property {Object} offset - Collision box adjustments to match the smaller sprite size.
     * @property {number} offset.top - Top offset of the collision box.
     * @property {number} offset.left - Left offset of the collision box.
     * @property {number} offset.right - Right offset of the collision box.
     * @property {number} offset.bottom - Bottom offset of the collision box.
     */
    y = 380;
    height = 40;
    width = 50;
    imagesWalk = ImageHelper.BABY_CHICKEN.walk;
    imagesDead = ImageHelper.BABY_CHICKEN.dead;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 0,
    };
    // #endregion

    /**
     * Creates a new BabyChicken enemy.
     *
     * Loads the required animations, assigns a random starting position and speed,
     * and starts movement and animation updates.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesDead);
        this.x = 1100 + Math.random() * 3000;
        this.speed = 1.2 + Math.random() * 3;
        this.animate();
        IntervalHub.startInterval(this.updateMovement, 1000 / 60);
        IntervalHub.startInterval(this.updateAnimation, 200);
    }

    // #region methods
    /**
     * Starts the baby chicken movement and animation updates.
     *
     * @returns {void}
     */
    animate() {
        this.updateMovement();
        this.updateAnimation();
    }

    /**
     * Moves the baby chicken to the left while the game is active.
     *
     * @returns {void}
     */
    updateMovement = () => {
        if (!this.world || !this.world.gameStarted) return;
        this.moveLeft();
    };

    /**
     * Updates the baby chicken animation depending on its state.
     *
     * @returns {void}
     */
    updateAnimation = () => {
        if (!this.world || !this.world.gameStarted) return;
        if (this.isDead()) {
            this.playAnimation(this.imagesDead);
        } else {
            this.playAnimation(this.imagesWalk);
        }
    };

    /**
     * Handles the baby chicken death state.
     *
     * Calls the parent death logic and plays the baby chicken death sound.
     *
     * @returns {void}
     */
    die() {
        super.die();
        SoundHub.playOne(SoundHub.babyChickenDead, 0.8);
    }

    // #endregion
}
