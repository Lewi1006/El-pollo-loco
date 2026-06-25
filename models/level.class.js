import { World } from "./world.class.js";

export class Level {
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
