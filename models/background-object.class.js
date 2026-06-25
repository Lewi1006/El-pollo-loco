import { ImageHelper } from "../helper_classes/image-helper.js";
import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;

    constructor(indexLayers, x){
        super();
        this.loadImage(ImageHelper.BACKGROUND.layers[indexLayers]);
        this.x = x;
        this.y = 480 - this.height;
    }
}
