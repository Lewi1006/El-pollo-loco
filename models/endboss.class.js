import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Endboss extends MovableObject {
    // #region properties
    height= 400;
    width = 250;
    y = 55;
    imagesAlert = ImageHelper.ENDBOSS.alert;
    energy = 100;
    // #endregion

    constructor() {
        super();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.x = 2500;
        this.animate();
    }

    // #region methods
    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.imagesAlert);
        }, 200);
    }


    hit(){
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } 
        // else {
        //     this.lastHit = new Date().getTime();
        // }
    }
    // #endregion
}
