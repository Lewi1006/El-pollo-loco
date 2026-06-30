import { ImageHelper } from "../helper_classes/image-helper.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Bottle extends DrawableObject{
    
    height = 90;
    width = 70;
    imagesBottleGround = ImageHelper.BOTTLE.ground;
    
    constructor(x,y){
        super();
        this.loadImage(this.imagesBottleGround);
        this.x = x;
        this.y = y;

    }
    
}


