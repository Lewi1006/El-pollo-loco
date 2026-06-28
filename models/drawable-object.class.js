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

    // #endregion

    // #region methods
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


    // #endregion
}
