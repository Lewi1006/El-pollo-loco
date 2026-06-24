import { MovableObject } from "./movable-object.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";

export class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
