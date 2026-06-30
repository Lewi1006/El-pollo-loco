import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Coin extends DrawableObject {
    height = 130;
    width = 130;
    imagesCoin = ImageHelper.COINS.bigCoin;
    offset = {
        top: 45,
        left: 45,
        right: 45,
        bottom: 45,
    };

    constructor(x,y) {
        super();
        this.loadImage(this.imagesCoin);
        this.x = x;
        this.y = y;
    }
}


// generateCoins(){}