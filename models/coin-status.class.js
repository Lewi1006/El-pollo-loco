import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class CoinStatus extends DrawableObject {
    height = 60;
    width = 60;
    imagesCoinIcon = ImageHelper.ICONS.coin;

    constructor() {
        super();
        this.x = 600;
        this.y = 8;
        this.loadImage(this.imagesCoinIcon);
    }

    draw(ctx) {
        ctx.font = "24px zabras";
        ctx.fillText("x 1", 10, 80);
    }
}
