import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class ThrowableObject extends MovableObject{

    throwable = true;

    constructor(x,y){
        super();
        this.loadImage(ImageHelper.BOTTLE.rotation[0]);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        IntervalHub.startInterval(()=>{
            this.x += 10;
        },25);
    }
}
