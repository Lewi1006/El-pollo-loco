import { World } from "./world.class.js";

/**
 * Represents a game level and its objects.
 *
 * The Level class stores all elements required to build and run a level,
 * including enemies, clouds, background objects, coins, and bottles.
 *
 * @class
 */
export class Level {
    // #region properties
    /**
     * @property {MovableObject[]} enemies - Array containing all enemies in the level.
     * @property {Cloud[]} clouds - Array containing all cloud objects in the level.
     * @property {BackgroundObject[]} backgroundObjects - Array containing all background layers.
     * @property {Coin[]} coins - Array containing all collectible coins.
     * @property {Bottle[]} bottles - Array containing all collectible bottles.
     * @property {number} level_end_x - Maximum x-position of the level.
     */
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    bottles = [];
    level_end_x = 3650;
    // #endregion

    /**
     * Creates a new level instance.
     *
     * Assigns all game objects belonging to the level so they can be accessed
     * by the World class during gameplay.
     *
     * @constructor
     *
     * @param {MovableObject[]} enemies - Enemies contained in the level.
     * @param {Cloud[]} clouds - Clouds contained in the level.
     * @param {BackgroundObject[]} backgroundObjects - Background layers of the level.
     * @param {Coin[]} coins - Collectible coins placed in the level.
     * @param {Bottle[]} bottles - Collectible bottles placed in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
