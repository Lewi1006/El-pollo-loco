import { DrawableObject } from "./drawable-object.class.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Base class for all movable game objects.
 *
 * MovableObject extends DrawableObject by adding properties required for
 * movement, physics, health management, damage handling, and interaction
 * with the game world.
 *
 * Objects that inherit from this class can move, take damage, react to
 * gravity, and interact with other game elements.
 *
 * @class
 */
export class MovableObject extends DrawableObject {
    // #region properties
    /**
     * @property {number} speed - Movement speed of the object.
     * @property {boolean} otherDirection - Indicates whether the object is facing the opposite direction.
     * @property {number} speedY - Current vertical movement speed used for jumping and gravity.
     * @property {number} acceleration - Gravity acceleration applied to vertical movement.
     * @property {number} energy - Current health value of the object.
     * @property {number} damage - Amount of damage this object can deal.
     * @property {number} lastHit - Timestamp of the last damage taken.
     * @property {boolean} throwable - Indicates whether the object can be thrown.
     * @property {number} deathTime - Timestamp when the object died.
     * @property {boolean} hasDied - Indicates whether the object has already completed its death state.
     * @property {number} hurtTime - Duration of the hurt animation/state in seconds.
     * @property {World} world - Reference to the current game world instance.
     */
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    damage = 10;
    lastHit = 0;
    throwable = false;
    deathTime = 0;
    hasDied = false;
    hurtTime = 0.3;
    world;
    // #endregion

    // #region methods

    /**
     * Applies gravity to the object and updates its vertical position.
     *
     * This method is called repeatedly for objects affected by gravity, such as
     * the Character and ThrowableObjects. It updates the object's y-position
     * based on the current vertical speed and reduces the vertical speed over
     * time using the acceleration value.
     *
     * The method is defined as an arrow function to preserve the object context
     * (`this`) when used as an interval callback.
     *
     * @returns {void}
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    /**
     * Checks whether the object is currently above the ground.
     *
     * Throwable objects are always considered above ground because they need to
     * follow their own movement and gravity logic until they are handled after
     * reaching the ground.
     *
     * Other movable objects are considered above ground when their y-position is
     * above the defined ground level.
     *
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this.throwable) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Applies damage to the object.
     *
     * If the object has not already died, its energy is reduced by the given
     * damage amount and a damage sound effect is played. If the remaining energy
     * reaches zero, the object dies. Otherwise, the time of the last hit is
     * stored for hurt-state handling.
     *
     * @param {number} damage - Amount of energy to remove from the object.
     *
     * @returns {void}
     */
    hit(damage) {
        if (this.hasDied) return;

        this.energy -= damage;
        SoundHub.playOne(SoundHub.damage, 0.2);

        if (this.energy <= 0) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object is currently in its hurt state.
     *
     * The method calculates the time passed since the last hit and returns true
     * while the hurt duration has not yet expired. This can be used to prevent
     * the object from receiving repeated damage immediately after being hit.
     *
     * @returns {boolean} True if the object was hit recently and is still hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference since last hit in ms
        timePassed /= 1000; // difference in sec
        return timePassed < this.hurtTime;
    }

    /**
     * Marks the object as dead and stores the time of death.
     *
     * If the object has not already died, this method changes its state by setting
     * its energy to zero, stopping its movement speed, and saving the current
     * timestamp. The death timestamp is later used to control death animations
     * and delayed removal from the game.
     *
     * @returns {void}
     */
    die() {
        if (this.hasDied) {
            return;
        } else {
            this.hasDied = true;
            this.energy = 0;
            this.speed = 0;
            this.deathTime = new Date().getTime();
        }
    }

    /**
     * Checks whether the object is dead.
     * It is used to handle events such as removing enemies or game lost or won.
     *
     * @returns {boolean} True if the object's energy is zero or below.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Moves the object horizontally to the right.
     *
     * The movement distance is determined by the object's current speed value.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object horizontally to the left.
     *
     * The movement distance is determined by the object's current speed value.
     *
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying an upward vertical speed.
     *
     * The gravity system in applyGravity() reduces speedY over time, creating
     * the falling movement after the jump.
     *
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays an animation by cycling through an array of image paths.
     *
     * The method uses the modulo operator to loop back to the beginning of the
     * image array once the last frame has been reached. The current image path is
     * retrieved and used to select the corresponding loaded image from the
     * imageCache.
     *
     * This method can be used for different animations such as walking, idle,
     * jumping, or enemy alert animations.
     *
     * @param {string[]} images - Array of image paths representing animation frames.
     *
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // #endregion
}
