import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 80;

    constructor() {
        super();
        this.loadImage(
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        );
        this.x = 200 + Math.random() * 500;
    }
}
