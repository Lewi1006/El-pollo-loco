import { IntervalHub } from "../helper_classes/interval-helper.js";
// import { Chicken } from "./chicken.class.js";
// import { Character } from "./character.class.js";

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        // #rectangles for collision

        // if (this instanceof Character || this instanceof Chicken) --> doesn't work here cause mO does not know chicken or character
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    // character.isColliding(Chicken);
    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
        );
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
