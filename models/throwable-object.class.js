import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Represents throwable objects in the game.
 *
 * ThrowableObject extends MovableObject and adds functionality for objects
 * that can be thrown, affected by gravity, and react when reaching their
 * target or the ground.
 *
 * Currently used for bottle objects. It handles bottle rotation animations,
 * splash animations, and tracking whether the object has already splashed.
 *
 * @class
 */
export class ThrowableObject extends MovableObject {
    // #region properties

    /**
     * @property {string[]} imagesBottleRotation - Image paths used for the bottle rotation animation.
     * @property {string[]} imagesBottleSplash - Image paths used for the bottle splash animation.
     * @property {boolean} throwable - Indicates that this object is affected by throwing logic.
     * @property {boolean} hasSplashed - Indicates whether the bottle has already triggered its splash animation.
     * @property {number} splashTime - Timestamp when the splash animation started.
     */
    imagesBottleRotation = ImageHelper.BOTTLE.rotation;
    imagesBottleSplash = ImageHelper.BOTTLE.splash;

    throwable = true;
    hasSplashed = false;
    splashTime = 0;
    // #endregion

    /**
     * Creates a new ThrowableObject instance.
     *
     * The constructor initializes the bottle sprite, loads all required animation
     * images, and sets the initial position and direction of the thrown object.
     *
     * The character's current position and direction are passed into the
     * constructor so the bottle starts at the correct location and is thrown
     * in the direction the character is facing.
     *
     * After initialization, the bottle receives its throwing movement, gravity,
     * rotation animation, and forward movement intervals.
     *
     * @constructor
     *
     * @param {number} x - Initial horizontal position of the thrown object.
     * @param {number} y - Initial vertical position of the thrown object.
     * @param {boolean} otherDirection - Indicates whether the character is facing left, determining the throwing direction.
     */
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

    /**
     * Applies gravity to the thrown object.
     *
     * This overrides the default gravity behavior from MovableObject by stopping
     * the movement once the bottle has already splashed. Before the splash state,
     * the object's vertical position and speed are updated to simulate falling.
     *
     * The arrow function preserves the correct object context (`this`) when the
     * method is used as an interval callback.
     *
     * @returns {void}
     */
    applyGravity = () => {
        if (this.hasSplashed) return;

        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    /**
     * Initializes the throwing motion of the object.
     *
     * Sets the initial upward speed to create the throwing arc and immediately
     * applies the movement behavior for gravity, forward motion, and rotation.
     *
     * The continuous updates for these actions are handled by intervals started
     * in the constructor.
     *
     * @returns {void}
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwForward();
        this.rotateBottle();
    }

    /**
     * Moves the thrown object forward based on its throwing direction.
     *
     * The object moves horizontally depending on which direction the character
     * was facing when the bottle was thrown. Movement stops after the bottle has
     * splashed.
     *
     * This method is repeatedly called through an interval to create the forward
     * throwing motion.
     *
     * @returns {void}
     */
    throwForward = () => {
        if (this.hasSplashed) return;

        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    };

    /**
     * Plays the bottle rotation animation while the object is being thrown.
     *
     * The method cycles through the bottle rotation images using playAnimation().
     * The rotation animation stops once the bottle has splashed.
     *
     * This method is repeatedly called through an interval while the bottle is
     * moving.
     *
     * @returns {void}
     */
    rotateBottle = () => {
        if (this.hasSplashed) return;
        this.playAnimation(this.imagesBottleRotation);
    };

    /**
     * Checks whether the bottle has reached the ground.
     *
     * The y-position is compared against the defined ground level to determine
     * whether the bottle should stop its movement and trigger the splash effect.
     *
     * @returns {boolean} True if the bottle has reached the ground.
     */
    isOnGround() {
        return this.y >= 380;
    }

    /**
     * Triggers the bottle splash effect.
     *
     * This method changes the bottle into its splash state, stores the time when
     * the splash started, plays the splash animation, and triggers the breaking
     * sound effect.
     *
     * Once the bottle has splashed, further movement and rotation updates are
     * stopped by checking the hasSplashed property.
     *
     * @returns {void}
     */
    splashBottle() {
        if (this.hasSplashed) return;

        this.hasSplashed = true;
        this.splashTime = new Date().getTime();
        this.playAnimation(this.imagesBottleSplash);

        SoundHub.playOne(SoundHub.break, 0.2);
    }
    // #endregion
}
