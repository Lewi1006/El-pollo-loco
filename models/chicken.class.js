import { MovableObject } from "./movable-object.class.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 80;
    imagesWalk = ImageHelper.CHICKEN.walk;

    constructor() {
        super();
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        );
        this.loadImages(this.imagesWalk)
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

     animate(){

            this.moveLeft();

            IntervalHub.startInterval(()=>{
                let i = this.currentImage % this.imagesWalk.length;
                let path = this.imagesWalk[i];
                this.img = this.imageCache[path];
                this.currentImage++
    
            }, 200);
    
        }
}
