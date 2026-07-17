import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a collectible bottle in the game world.
 *
 * Bottle extends DrawableObject and is used as a collectible item. Collected
 * bottles can later be thrown by the character as throwable objects.
 *
 * @class
 */
export class Bottle extends DrawableObject {
    // #region properties
    /**
     * @property {number} height - Height of the bottle image.
     * @property {number} width - Width of the bottle image.
     * @property {string} imagesBottleGround - Image path of the bottle lying on the ground.
     * @property {Object} offset - Collision box adjustments for the bottle.
     * @property {number} offset.top - Top offset of the collision box.
     * @property {number} offset.left - Left offset of the collision box.
     * @property {number} offset.right - Right offset of the collision box.
     * @property {number} offset.bottom - Bottom offset of the collision box.
     */
    height = 90;
    width = 70;
    imagesBottleGround = ImageHelper.BOTTLE.ground;
    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 10,
    };
    // #endregion

    /**
     * Creates a new bottle.
     *
     * Loads the bottle image and places it at the specified position in the game
     * world.
     *
     * @constructor
     *
     * @param {number} x - Horizontal position of the bottle.
     * @param {number} y - Vertical position of the bottle.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.imagesBottleGround);
        this.x = x;
        this.y = y;
    }
}
