import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

export class Endboss extends MovableObject {
    // #region properties
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
    // world;
    hasStartedWalking = false;
    isAttacking = false;
    hurtTime = 1;
    damage = 20;
    isApproachSoundPlaying = false;
    isAttackSoundPlaying = false;
    // #endregion

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
    animate() {
        this.updateAnimation();
        this.updateMovement();
    }

    // endboss energy
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

    // flag hasstartedwalking cause we wanna trigger walking once
    // wait till world exists and also check if game has started
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

    updateAnimation = () => {
        // wait till world is loaded/exists before animation starts
        // https://stackoverflow.com/questions/5339121/how-do-you-implement-a-guard-clause-in-javascript
        if (!this.world || !this.world.gameStarted) return;

        if (this.isDead()) {
            this.playAnimation(this.imagesDead);
            // this.playDeadAnimation();
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

    // https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
    getDistance() {
        const distanceX = this.world.character.x - this.x;
        const distanceY = this.world.character.y - this.y;
        return Math.hypot(distanceX, distanceY);
    }


    // manage sound with flags and true and false because in update movement it 
    // plays in an interval so my sound would continously be triggered and never plays in one
    manageApproachSound(){
        if(this.hasStartedWalking && !this.isApproachSoundPlaying){
            SoundHub.playOne(SoundHub.endbossApproaching, 0.1);
            this.isApproachSoundPlaying = true;

        }
    }


    manageAttackSound(){
        if(this.isAttacking && !this.isAttackSoundPlaying){
            SoundHub.playOne(SoundHub.endbossAttack, 0.2);
            this.isAttackSoundPlaying = true;
        }
    }
    // #endregion
}
