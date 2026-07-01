import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class BottleStatus extends DrawableObject {
    imagesStatusBottle = ImageHelper.STATUSBAR.bottle;
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.imagesStatusBottle);
        this.x = 480;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex(percentage);
        let path = this.imagesStatusBottle[index];
        this.img = this.imageCache[path];
    }

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
