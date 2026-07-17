import { IntervalHub } from "../helper_classes/interval-helper.js";

/**
 * Base class for all objects that can be drawn on the canvas.
 *
 * DrawableObject provides the basic properties and functionality required
 * for rendering game objects, including position, dimensions, image handling,
 * animation support, and collision offset configuration.
 *
 * Classes that extend DrawableObject inherit these properties and use them
 * as the foundation for displaying sprites and handling their position in
 * the game world.
 *
 * @class 
 */
export class DrawableObject {
    // #region properties
    /**
     * @property {number} x - Horizontal position of the object on the canvas.
     * @property {number} y - Vertical position of the object on the canvas.
     * @property {number} height - Height of the object image.
     * @property {number} width - Width of the object image.
     * @property {HTMLImageElement} img - Currently displayed image of the object.
     * @property {Object.<string, HTMLImageElement>} imageCache - Stores loaded images for animations.
     * @property {number} currentImage - Index of the currently displayed animation image.
     * @property {Object} offset - Collision offset values used to adjust hitboxes.
     * @property {number} offset.top - Top collision offset.
     * @property {number} offset.left - Left collision offset.
     * @property {number} offset.right - Right collision offset.
     * @property {number} offset.bottom - Bottom collision offset.
     */
    x = 120;
    y = 280;
    height = 150;
    width = 140;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    // #endregion

    // #region methods
    /**
     * Loads a single image for the object.
     *
     * Creates a new Image instance and assigns the provided image path as the
     * source. (new Image() is predefined like <img src="...">)
     * The loaded image is stored in the img property and can then be
     * drawn onto the canvas.
     *
     * @param {string} path - File path or URL of the image to load.
     *
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images - multiple images and stores them in the image cache.
     *
     * Creates Image instances for all provided image paths and saves them in
     * imageCache. The cache allows animations to switch between already loaded
     * images without creating new Image objects repeatedly.
     *
     * @param {string[]} arr - Array of image paths to load.
     *
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object onto the canvas.
     *
     * This method uses the canvas predefined drawImage() function to render the current
     * image at the object's position and dimensions. It receives the canvas
     * rendering context from the World class, which controls when and where
     * objects are drawn.
     *
     * This method is different from World.draw(), which manages the overall
     * rendering loop. DrawableObject.draw() only handles drawing a single object.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context used for drawing.
     *
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the collision frame of the object for debugging purposes.
     *
     * The collision frame visualizes the object's active hitbox instead of its
     * full image dimensions. The offset values are used to adjust the rectangle
     * so that collisions can ignore transparent or unnecessary parts of the sprite.
     *
     * This method is mainly used during development to check and fine-tune
     * collision boundaries.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context used for drawing.
     *
     * @returns {void}
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom,
        );
        ctx.stroke();
    }

    /**
     * Checks whether this object is colliding with another game object.
     *
     * The collision check compares the adjusted hitboxes of both objects rather
     * than their full image dimensions. Offset values are used to ignore parts of
     * the sprite that should not count for collisions, such as transparent areas.
     *
     * This method is used for interactions between game objects such as the
     * character, enemies, coins, and bottles.
     *
     * @param {DrawableObject} mo - The object to check for collision with.
     *
     * @returns {boolean} True if the two objects overlap, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    // #endregion
}
