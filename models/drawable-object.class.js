import { IntervalHub } from "../helper_classes/interval-helper.js";

export class DrawableObject {
    // #region properties
    x = 120;
    y = 280;
    height = 150;
    width = 140;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    // #endregion

    // #region methods
    // new Image() is predefined like <img src="...">
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // loads an array of images
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // calls draw() method (different than in World?) and passes in context variable
    // drawImage is predefined
    // draws img onto canvas
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        // rectangles for collision

        // if (this instanceof Character || this instanceof Chicken) --> doesn't work here cause mO does not know chicken or character
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom,
        );
        ctx.stroke();
    }

      // character.isColliding(Chicken, Coin or Bottle);
       isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }




    // #endregion
}
