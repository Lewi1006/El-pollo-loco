import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background layer object in the game world.
 *
 * BackgroundObject extends MovableObject and is used to display the different
 * background layers of a level. Each object loads one image layer and places
 * it at the given x-position to create the scrolling background effect.
 *
 * The objects are positioned at the bottom of the canvas by calculating their
 * y-position based on the canvas height and the object's height.
 *
 * @class
 */
export class BackgroundObject extends MovableObject {
    // #region properties
    /**
     * @property {number} width - Width of the background image.
     * @property {number} height - Height of the background image.
     */
    width = 720;
    height = 480;
    // #endregion

    /**
     * Creates a new BackgroundObject instance.
     *
     * Loads the selected background layer image and places it at the given
     * horizontal position. Multiple BackgroundObjects with different layers and
     * positions are used together to create the complete level background.
     *
     * @constructor
     *
     * @param {number} indexLayers - Index of the background layer image to load.
     * @param {number} x - Horizontal position where the background layer is placed.
     */
    constructor(indexLayers, x) {
        super();
        this.loadImage(ImageHelper.BACKGROUND.layers[indexLayers]);
        this.x = x;
        this.y = 480 - this.height;
    }
}
