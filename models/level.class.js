import { World } from "./world.class.js";

export class Level {
    // #region properties
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    level_end_x = 2200;
    // #endregion

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}
