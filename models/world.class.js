import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { IntervalHub } from "../helper_classes/interval-helper.js";
import { ImageHelper } from "../helper_classes/image-helper.js";
import { Level } from "./level.class.js";
import { level1 } from "../levels/level1.js";

export class World {
    // #region properties
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    // #endregion

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    // #region methods
    // hand over world as variable to character so that keyboard can be accessed ???
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        //  mirror image
        if (mo.otherDirection === true) {
            this.flipImage(mo);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection === true) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    // #endregion
}
