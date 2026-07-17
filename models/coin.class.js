import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents a collectible coin in the game world.
 *
 * Coin extends DrawableObject and is used as a collectible item that increases
 * the player's coin count when collected.
 *
 * @class
 */
export class Coin extends DrawableObject {
    /**
     * @property {number} height - Height of the coin image.
     * @property {number} width - Width of the coin image.
     * @property {string} imagesCoin - Image path of the coin.
     * @property {Object} offset - Collision box adjustments for the coin.
     * @property {number} offset.top - Top offset of the collision box.
     * @property {number} offset.left - Left offset of the collision box.
     * @property {number} offset.right - Right offset of the collision box.
     * @property {number} offset.bottom - Bottom offset of the collision box.
     */
    height = 130;
    width = 130;
    imagesCoin = ImageHelper.COINS.bigCoin;
    offset = {
        top: 45,
        left: 45,
        right: 45,
        bottom: 45,
    };

    /**
     * Creates a new coin.
     *
     * Loads the coin image and places it at the specified position in the game
     * world.
     *
     * @constructor
     *
     * @param {number} x - Horizontal position of the coin.
     * @param {number} y - Vertical position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.imagesCoin);
        this.x = x;
        this.y = y;
    }
}
