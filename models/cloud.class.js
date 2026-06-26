import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

export class Cloud extends MovableObject {
    // #region properties
    y = 20;
    height = 250;
    width = 500;
    // #endregion

    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }
    // #region methods
    animate() {
        this.moveLeft();
    }
    // #endregion
}
