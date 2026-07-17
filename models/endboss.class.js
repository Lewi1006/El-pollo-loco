import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

/**
 * Represents the end boss enemy of the level.
 *
 * Endboss extends MovableObject and uses inherited movement, collision,
 * health, and animation functionality. It features multiple animation states,
 * including alert, walking, attacking, hurt, and death.
 *
 * The end boss begins moving once the character enters its activation range
 * and can attack the player while managing its own sound effects.
 *
 * @class
 */
export class Endboss extends MovableObject {
    // #region properties
    /**
     * @property {number} height - Height of the end boss image.
     * @property {number} width - Width of the end boss image.
     * @property {number} y - Vertical position of the end boss.
     * @property {string[]} imagesAlert - Image paths used for the alert animation.
     * @property {string[]} imagesWalk - Image paths used for the walking animation.
     * @property {string[]} imagesAttack - Image paths used for the attack animation.
     * @property {string[]} imagesHurt - Image paths used for the hurt animation.
     * @property {string[]} imagesDead - Image paths used for the death animation.
     * @property {number} energy - Current health of the end boss.
     * @property {Object} offset - Collision box adjustments for the end boss.
     * @property {number} offset.top - Top offset of the collision box.
     * @property {number} offset.left - Left offset of the collision box.
     * @property {number} offset.right - Right offset of the collision box.
     * @property {number} offset.bottom - Bottom offset of the collision box.
     * @property {boolean} hasStartedWalking - Indicates whether the end boss has been activated.
     * @property {boolean} isAttacking - Indicates whether the end boss is currently attacking.
     * @property {number} hurtTime - Duration of the hurt state in seconds.
     * @property {number} damage - Damage dealt to the character per hit.
     * @property {boolean} isApproachSoundPlaying - Tracks whether the approach sound is currently playing.
     * @property {boolean} isAttackSoundPlaying - Tracks whether the attack sound is currently playing.
     */
    height = 400;
    width = 250;
    y = 55;
    imagesAlert = ImageHelper.ENDBOSS.alert;
    imagesWalk = ImageHelper.ENDBOSS.walk;
    imagesAttack = ImageHelper.ENDBOSS.attack;
    imagesHurt = ImageHelper.ENDBOSS.hurt;
    imagesDead = ImageHelper.ENDBOSS.dead;
    energy = 100;
    offset = {
        top: 80,
        left: 10,
        right: 5,
        bottom: 20,
    };
    hasStartedWalking = false;
    isAttacking = false;
    hurtTime = 1;
    damage = 20;
    isApproachSoundPlaying = false;
    isAttackSoundPlaying = false;
    // #endregion

    /**
     * Creates a new Endboss instance.
     *
     * The constructor loads all animation image sets, places the end boss at its
     * starting position near the end of the level, and starts the movement and
     * animation update loops.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 3900;
        this.speed = 1;
        this.animate();
        IntervalHub.startInterval(this.updateAnimation, 200);
        IntervalHub.startInterval(this.updateMovement, 1000 / 60);
    }

    // #region methods

    /**
     * Starts the end boss movement and animation updates.
     *
     * Calls the methods responsible for updating the current animation state and
     * movement behavior. Continuous updates are handled through intervals started
     * in the constructor.
     *
     * @returns {void}
     */
    animate() {
        this.updateAnimation();
        this.updateMovement();
    }

    /**
     * Reduces the end boss energy when hit by a throwable object.
     *
     * Decreases the boss energy, plays the hit sound, and checks whether the boss
     * has been defeated. If energy reaches zero, the death state is triggered.
     * Otherwise, the last hit timestamp is updated for the hurt animation logic.
     *
     * @returns {void}
     */
    hit() {
        this.energy -= 20;
        SoundHub.playOne(SoundHub.endbossHit, 0.2);
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Updates the end boss movement and attack state.
     *
     * The end boss only becomes active once the world exists and the game has
     * started. The distance to the character is checked to determine when the
     * boss starts walking and when it enters the attack state.
     *
     * The hasStartedWalking flag is used to trigger the walking behavior only
     * once when the character gets close enough. While the boss is not attacking,
     * it moves towards the character.
     *
     * The method also manages the approach and attack sounds depending on the
     * current boss state.
     *
     * @returns {void}
     */
    updateMovement = () => {
        if (!this.world || !this.world.gameStarted) return;

        const distance = this.getDistance();

        if (distance <= 450 && !this.hasStartedWalking) {
            this.hasStartedWalking = true;
        }

        if (distance <= 130) {
            this.isAttacking = true;
        } else {
            this.isAttacking = false;
        }

        if (this.hasStartedWalking && !this.isAttacking) {
            this.moveLeft();
        }

        this.manageApproachSound();
        this.manageAttackSound();
    };

    /**
     * Updates the end boss animation depending on its current state.
     *
     * Waits until the world exists and the game has started before updating the
     * animation. This guard clause prevents animation logic from running before
     * the boss is connected to the game world.
     *
     * @returns {void}
     */
    updateAnimat;
    updateAnimation = () => {
        if (!this.world || !this.world.gameStarted) return;

        if (this.isDead()) {
            this.playAnimation(this.imagesDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isAttacking) {
            this.playAnimation(this.imagesAttack);
        } else if (this.hasStartedWalking) {
            this.playAnimation(this.imagesWalk);
        } else {
            this.playAnimation(this.imagesAlert);
        }
    };

    /**
     * Calculates the distance between the end boss and the character.
     *
     * Uses the x and y positions of both objects to calculate the distance between
     * two points. The result is used to determine when the end boss should start
     * walking and when it should begin attacking.
     *
     * @returns {number} Distance between the end boss and the character.
     */
    getDistance() {
        const distanceX = this.world.character.x - this.x;
        const distanceY = this.world.character.y - this.y;
        return Math.hypot(distanceX, distanceY);
    }

    /**
     * Manages the end boss approach sound.
     *
     * Uses the isApproachSoundPlaying flag to ensure the sound is only triggered
     * once. Since updateMovement() runs inside an interval, playing the sound
     * without a flag would repeatedly restart the sound instead of allowing it to
     * finish.
     *
     * @returns {void}
     */
    manageApproachSound() {
        if (this.hasStartedWalking && !this.isApproachSoundPlaying) {
            SoundHub.playOne(SoundHub.endbossApproaching, 0.1);
            this.isApproachSoundPlaying = true;
        }
    }

    /**
     * Manages the end boss attack sound.
     *
     * Uses the isAttackSoundPlaying flag to ensure the attack sound is only
     * triggered once while the end boss is attacking. Since the movement update
     * runs inside an interval, the flag prevents the sound from being restarted
     * continuously.
     *
     * @returns {void}
     */
    manageAttackSound() {
        if (this.isAttacking && !this.isAttackSoundPlaying) {
            SoundHub.playOne(SoundHub.endbossAttack, 0.2);
            this.isAttackSoundPlaying = true;
        }
    }
    // #endregion
}
