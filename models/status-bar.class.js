import { DrawableObject } from "./drawable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";

/**
 * Represents the character health status bar displayed in the game.
 *
 * StatusBarHealth extends DrawableObject and displays the current energy of
 * the character. The displayed image changes depending on the remaining
 * health percentage.
 *
 * @class
 */
export class StatusBarHealth extends DrawableObject {
    // #region properties
    /**
     * @property {string[]} imagesHealth - Image paths used for the different health status bar states.
     * @property {number} percentage - Current character energy represented as a percentage.
     */
    imagesHealth = ImageHelper.STATUSBAR.health;
    percentage = 100;

    // #endregion

    /**
     * Creates a new character health status bar.
     *
     * Loads all health bar images, sets the position and size of the status bar,
     * and initializes the displayed image with the starting health value.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.imagesHealth);
        this.x = 20;
        this.y = 30;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the health status bar percentage and changes the displayed image.
     *
     * Calculates the correct image index based on the given health percentage and
     * loads the matching image from the image cache.
     *
     * @param {number} percentage - Current character energy as a percentage value.
     *
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.imagesHealth[index];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which health status bar image should be displayed.
     *
     * The percentage value is mapped to one of the available status images:
     * 100%, 80%, 60%, 40%, 20%, or 0%.
     *
     * @returns {number} Index of the matching health status bar image.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
