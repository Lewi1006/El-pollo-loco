import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

/**
 * Represents a cloud in the background.
 *
 * Cloud extends MovableObject and is used as part of the level background.
 * Each cloud is placed at a random horizontal position.
 *
 * @class
 */
export class Cloud extends MovableObject {
    // #region properties
    /**
     * @property {number} y - Vertical position of the cloud.
     * @property {number} height - Height of the cloud image.
     * @property {number} width - Width of the cloud image.
     */
    y = 20;
    height = 250;
    width = 500;
    // #endregion

    /**
     * Creates a new cloud.
     *
     * Loads the cloud image, assigns a random horizontal position, and initializes
     * its movement.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }
    // #region methods

    /**
     * Moves the cloud to the left.
     *
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }
    // #endregion
}
