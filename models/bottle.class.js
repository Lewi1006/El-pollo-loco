import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Bottle extends DrawableObject {
    // #region properties
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

    constructor(x, y) {
        super();
        this.loadImage(this.imagesBottleGround);
        this.x = x;
        this.y = y;
    }
}
