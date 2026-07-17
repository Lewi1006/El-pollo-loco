import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Represents the player character in the game.
 *
 * Character extends MovableObject and adds player-specific behavior such as
 * movement, jumping, animations, sound effects, idle states, and interaction
 * with the game world.
 *
 * The character receives a reference to the World instance so it can access
 * shared game data such as keyboard input, level objects, and camera movement.
 *
 * @class
 */
export class Character extends MovableObject {
    // #region properties
    /**
     * @property {string[]} imagesWalk - Image paths used for the walking animation.
     * @property {string[]} imagesJump - Image paths used for the jumping animation.
     * @property {string[]} imagesDead - Image paths used for the death animation.
     * @property {string[]} imagesHurt - Image paths used for the hurt animation.
     * @property {string[]} imagesIdle - Image paths used for the idle animation.
     * @property {string[]} imagesLongIdle - Image paths used for the long idle animation.
     * @property {World} world - Reference to the current game world instance.
     * @property {Object} offset - Collision hitbox offsets used to adjust the character's collision area.
     * @property {number} lastMove - Timestamp of the last movement input.
     * @property {number} longIdleStart - Time threshold before triggering the long idle animation.
     * @property {boolean} isRunSoundPlaying - Tracks whether the running sound effect is currently active.
     * @property {boolean} isSnoreSoundPlaying - Tracks whether the snoring sound effect is currently active.
     */
    height = 280;
    y = 140;
    speed = 6;
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
    isRunSoundPlaying = false;
    isSnoreSoundPlaying = false;

    // #endregion

    /**
     * Creates a new Character instance.
     *
     * The constructor initializes the character's default image, loads all
     * animation image sets, starts the gravity system, and activates the
     * movement and animation update loops.
     *
     * The character uses intervals to continuously update physics, player input,
     * and animations throughout the game.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);

        this.animate();
        this.lastMove = new Date().getTime();

        IntervalHub.startInterval(this.updateMovement, 1000 / 60);
        IntervalHub.startInterval(this.updateAnimation, 50);
    }

    // #region methods

    /**
     * Initializes character updates.
     *
     * Starts the movement and animation for the character.
     * Movement and animation updates are handled continuously during gameplay.
     *
     * @returns {void}
     */
    animate() {
        this.updateMovement;
        this.updateAnimation;
    }

    /**
     * Updates the character's movement based on player input.
     *
     * Handles walking, jumping, running sounds, and camera movement.
     * The camera position is updated based on the character's current x-position
     * to create the scrolling effect while moving through the level.
     *
     * This method is executed repeatedly through an interval.
     *
     * @returns {void}
     */
    updateMovement = () => {
        this.manageWalking();
        this.manageJump();
        this.manageRunSound();

        this.world.camera_x = -this.x + 100;
    };

    /**
     * Handles horizontal movement input.
     *
     * Checks whether the player presses the left or right movement keys and moves
     * the character while staying inside the level boundaries. The character
     * direction and last movement timestamp are updated accordingly.
     *
     * @returns {void}
     */
    manageWalking() {
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
    }

    /**
     * Handles jump input from the player.
     *
     * Checks whether the jump key is pressed and whether the character is currently
     * on the ground. If both conditions are met, the character receives an upward
     * movement impulse and the last movement timestamp is updated.
     *
     * Prevents jumping while the character is already in the air.
     *
     * @returns {void}
     */
    manageJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastMove = new Date().getTime();
        }
    }

    /**
     * Updates the character animation based on the current state.
     *
     * Selects the appropriate animation depending on the character's condition.
     *
     * Possible animation states include:
     * - Dead animation when the character has no energy left.
     * - Hurt animation after receiving damage.
     * - Jump animation while above the ground.
     * - Walking animation while moving left or right.
     * - Long idle animation after being inactive for a certain time.
     * - Normal idle animation when no other state applies.
     *
     * The method also manages the snoring sound for idle states.
     *
     * This method is executed repeatedly through an interval.
     *
     * @returns {void}
     */
    updateAnimation = () => {
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

        this.manageSnoreSound();
    };

    /**
     * Manages the running sound effect based on the character's movement state.
     *
     * Plays the running sound when the character is moving horizontally and is
     * on the ground. The sound is only started once by using the
     * isRunSoundPlaying flag to prevent repeated sound triggers.
     *
     * The running sound is paused when the character stops moving or is in the air.
     *
     * @returns {void}
     */
    manageRunSound() {
        if (
            (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) &&
            !this.isAboveGround()
        ) {
            if (!this.isRunSoundPlaying) {
                SoundHub.playOne(SoundHub.run, 0.1);
                this.isRunSoundPlaying = true;
            }
        } else {
            SoundHub.pauseOne(SoundHub.run);
            this.isRunSoundPlaying = false;
        }
    }

    /**
     * Manages the snoring sound effect during the long idle state.
     *
     * Plays the snoring sound when the character has been inactive long enough
     * to trigger the long idle animation. The isSnoreSoundPlaying flag prevents
     * the sound from being restarted on every animation update.
     *
     * The snoring sound is paused when the character leaves the long idle state.
     *
     * @returns {void}
     */
    manageSnoreSound() {
        if (this.isLongIdle()) {
            if (!this.isSnoreSoundPlaying) {
                SoundHub.playOne(SoundHub.snore, 0.1);
                this.isSnoreSoundPlaying = true;
            }
        } else {
            SoundHub.pauseOne(SoundHub.snore, 0.1);
            this.isSnoreSoundPlaying = false;
        }
    }

    /**
     * Makes the character jump.
     *
     * Sets the initial upward movement speed inherited from MovableObject's
     * gravity system and plays the jump sound effect.
     *
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
        SoundHub.playOne(SoundHub.jump, 0.2);
    }

    /**
     * Handles the character death state.
     *
     * Calls the parent die() method from MovableObject to keep the existing death
     * logic, including preventing repeated death handling, setting energy to zero,
     * stopping movement, and storing the death timestamp.
     *
     * After the base death logic is executed, the character-specific death sound
     * effect is played.
     *
     * @returns {void}
     */
    die() {
        super.die();
        SoundHub.playOne(SoundHub.dead, 0.15);
    }

    /**
     * Checks whether the character has entered the long idle state.
     *
     * The long idle state was added so that the character falls asleep if it has
     * not been moved for a certain amount of time.
     *
     * The lastMove variable is initialized with 0 and receives the current
     * timestamp when the character is created:
     *
     * Whenever the character moves or jumps, lastMove is updated with a new
     * timestamp. This method calculates the difference between the current time
     * and the last movement time.
     *
     * If the passed time is greater than longIdleStart, the character is
     * considered inactive for too long and the long idle animation is triggered.
     *
     * @returns {boolean} True if the character has been idle longer than the defined time.
     */
    isLongIdle() {
        let timePassed = new Date().getTime() - this.lastMove; // difference since last move in ms
        timePassed /= 1000; // difference in sec
        return timePassed > this.longIdleStart;
    }

    // #endregion
}
