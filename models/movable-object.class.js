import { IntervalHub } from "../helper_classes/interval-helper.js";

export class MovableObject {
    // #region properties
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 140;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    // #endregion

    // #region methods

    applyGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 140;
    }

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
        this.x += this.speed;
        
    }

    moveLeft() {
        this.x -= this.speed;
   
    }

    jump() {
        this.speedY = 30;
    }

    playAnimation(images) {
        // loop array with modulo operator / Walk animation or for endboss alert animation?
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // #endregion
}
