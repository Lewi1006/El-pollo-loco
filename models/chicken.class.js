import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Represents a chicken enemy in the game.
 *
 * Chicken extends MovableObject and uses inherited movement, gravity,
 * collision, health, and animation functionality. The chicken enemy can walk,
 * be damaged, and enter a dead state.
 *
 * The class provides the image sets required for the walking and death
 * animations.
 *
 * @class
 */
export class Chicken extends MovableObject {
    // #region properties
    /**
     * @property {number} y - Vertical position of the chicken.
     * @property {number} height - Height of the chicken image.
     * @property {number} width - Width of the chicken image.
     * @property {string[]} imagesWalk - Image paths used for the walking animation.
     * @property {string[]} imagesDead - Image paths used for the death animation.
     */
    y = 350;
    height = 70;
    width = 80;
    imagesWalk = ImageHelper.CHICKEN.walk;
    imagesDead = ImageHelper.CHICKEN.dead;

    // #endregion

    /**
     * Creates a new Chicken enemy.
     *
     * The constructor initializes the chicken's images, assigns a random starting
     * position and movement speed, and starts the movement and animation updates.
     *
     * The random x-position allows chickens to spawn at different locations in
     * the level, while the random speed creates variation between enemies.
     *
     * The update intervals continuously handle the chicken's movement and
     * animation during the game.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesDead);
        this.x = 400 + Math.random() * 5000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        IntervalHub.startInterval(this.updateMovement, 1000 / 60);
        IntervalHub.startInterval(this.updateAnimation, 200);
    }

    // #region methods

    /**
     * Starts the chicken movement and animation updates.
     *
     * Calls the movement and animation methods which are continuously updated
     * through intervals started in the constructor.
     *
     * @returns {void}
     */
    animate() {
        this.updateMovement();
        this.updateAnimation();
    }

    /**
     * Moves the chicken to the left while the game is active.
     *
     * @returns {void}
     */
    updateMovement = () => {
        if (!this.world || !this.world.gameStarted) return;

        this.moveLeft();
    };

    /**
     * Updates the chicken animation depending on its state.
     *
     * Plays the death animation when the chicken is dead, otherwise the walking
     * animation is played.
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
     * Handles the chicken death state.
     *
     * Calls the parent die() method to apply the default death logic and then
     * plays the chicken-specific death sound effect.
     *
     * @returns {void}
     */
    die() {
        super.die();
        SoundHub.playOne(SoundHub.chickenDead, 0.6);
    }

    // #endregion
}
