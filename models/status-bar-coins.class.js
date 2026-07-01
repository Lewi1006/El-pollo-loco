import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class CoinStatus extends DrawableObject {
    imagesStatusCoins = ImageHelper.STATUSBAR.coin;
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.imagesStatusCoins);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }
 
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex(percentage);
        let path = this.imagesStatusCoins[index];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage >= 0) {
            return 0;
        } else if (percentage >= 20) {
            return 1;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
