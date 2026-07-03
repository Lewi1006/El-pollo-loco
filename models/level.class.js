import { World } from "./world.class.js";

export class Level {
    // #region properties
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    bottles = [];
    level_end_x = 3650;
    // #endregion

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
