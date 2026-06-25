import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";

export const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken()],
    [new Cloud()],
    [
        new BackgroundObject(4, -719),
        new BackgroundObject(5, -719),
        new BackgroundObject(6, -719),
        new BackgroundObject(7, -719),

        new BackgroundObject(0, 0),
        new BackgroundObject(1, 0),
        new BackgroundObject(2, 0),
        new BackgroundObject(3, 0),
        new BackgroundObject(4, 719),
        new BackgroundObject(5, 719),
        new BackgroundObject(6, 719),
        new BackgroundObject(7, 719),

        new BackgroundObject(0, 719 * 2),
        new BackgroundObject(1, 719 * 2),
        new BackgroundObject(2, 719 * 2),
        new BackgroundObject(3, 719 * 2),
        new BackgroundObject(4, 719 * 3),
        new BackgroundObject(5, 719 * 3),
        new BackgroundObject(6, 719 * 3),
        new BackgroundObject(7, 719 * 3),
    ],
);
