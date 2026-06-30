import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Coin extends DrawableObject {
    height = 130;
    width = 130;
    imagesCoin = ImageHelper.COINS.bigCoin;

    constructor() {
        super();
        console.log(this.imagesCoin);
        this.loadImage(this.imagesCoin);
        this.x = 300;
        this.y = 200;
    }
}
