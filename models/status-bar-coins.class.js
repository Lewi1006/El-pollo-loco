import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the coin status bar displayed in the game.
 *
 * CoinStatus extends DrawableObject and displays the player's collected coins.
 * The displayed image changes depending on the current coin percentage.
 *
 * @class
 */
export class CoinStatus extends DrawableObject {
    /**
     * @property {string[]} imagesStatusCoins - Image paths used for the different coin status bar states.
     * @property {number} percentage - Current coin amount represented as a percentage.
     */
    imagesStatusCoins = ImageHelper.STATUSBAR.coin;
    percentage = 0;

    /**
     * Creates a new coin status bar.
     *
     * Loads all status bar images, sets the position and size of the status bar,
     * and initializes the displayed image based on the starting percentage.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.imagesStatusCoins);
        this.x = 500;
        this.y = 30;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }

    /**
     * Updates the coin status bar percentage and changes the displayed image.
     *
     * Calculates the correct image index based on the given percentage and loads
     * the matching image from the image cache.
     *
     * @param {number} percentage - Current coin amount as a percentage value.
     *
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex(percentage);
        let path = this.imagesStatusCoins[index];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which status bar image should be displayed.
     *
     * The percentage value is mapped to one of the available status images:
     * 100%, 80%, 60%, 40%, 20%, or 0%.
     *
     * @param {number} percentage - Current coin amount as a percentage value.
     *
     * @returns {number} Index of the matching status bar image.
     */
    resolveImageIndex(percentage) {
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
