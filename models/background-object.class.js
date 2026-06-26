import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject{
    // #region properties
    width = 720;
    height = 480;
    // #endregion

    constructor(indexLayers, x){
        super();
        this.loadImage(ImageHelper.BACKGROUND.layers[indexLayers]);
        this.x = x;
        this.y = 480 - this.height;
    }
}
