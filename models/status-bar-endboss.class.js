import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the end boss health status bar displayed in the game.
 *
 * EndbossStatus extends DrawableObject and displays the remaining energy of
 * the end boss. The displayed image changes depending on the current energy
 * percentage.
 *
 * @class
 */
export class EndbossStatus extends DrawableObject {
    /**
     * @property {string[]} imagesStatusEndboss - Image paths used for the different end boss status bar states.
     * @property {number} percentage - Current end boss energy represented as a percentage.
     */
    imagesStatusEndboss = ImageHelper.STATUSBAR.endboss;
    percentage = 100;

    /**
     * Creates a new end boss status bar.
     *
     * Loads all status bar images, sets the position and size of the status bar,
     * and initializes the displayed image with the end boss starting energy.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.imagesStatusEndboss);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the end boss status bar percentage and changes the displayed image.
     *
     * Calculates the correct image index based on the given energy percentage and
     * loads the matching image from the image cache.
     *
     * @param {number} percentage - Current end boss energy as a percentage value.
     *
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        let path = this.imagesStatusEndboss[index];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which end boss status bar image should be displayed.
     *
     * The percentage value is mapped to one of the available status images:
     * 100%, 80%, 60%, 40%, 20%, or 0%.
     *
     * @returns {number} Index of the matching status bar image.
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
