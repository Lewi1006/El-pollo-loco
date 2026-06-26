import { World } from "./world.class.js";

export class Level {
    // #region properties
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    // #endregion

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
