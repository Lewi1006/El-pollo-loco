import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";


export class Character extends MovableObject {
    height = 280;
    y = 155;
    imagesWalk = ImageHelper.CHARACTER.walk;
    

    constructor(){
        super();
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalk);
        this.animate();
    }

    animate(){
        IntervalHub.startInterval(()=>{
            // loop array with modulo operator 
            let i = this.currentImage % this.imagesWalk.length;
            let path = this.imagesWalk[i];
            this.img = this.imageCache[path];
            this.currentImage++

        }, 100);

    }

    jump(){

    }
}
