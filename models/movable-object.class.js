import { IntervalHub } from "../helper_classes/interval-helper.js";

export class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    // new Image() is predefined like <img src="...">
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log("moving right");
    }

      moveLeft() {
        IntervalHub.startInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
