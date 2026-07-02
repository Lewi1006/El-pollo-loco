import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class EndbossStatus extends DrawableObject {
    imagesStatusEndboss = ImageHelper.STATUSBAR.endboss;
    percentage = 100;

    constructor() {
        super();
        this.loadImage(this.imagesStatusEndboss[0]);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
    }
}
