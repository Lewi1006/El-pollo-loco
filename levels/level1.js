import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/background-object.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";
import { BabyChicken } from "../models/baby-chicken.class.js";

export const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new Endboss(),
    ],
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

        new BackgroundObject(0, 719 * 4),
        new BackgroundObject(1, 719 * 4),
        new BackgroundObject(2, 719 * 4),
        new BackgroundObject(3, 719 * 4),
        new BackgroundObject(4, 719 * 5),
        new BackgroundObject(5, 719 * 5),
        new BackgroundObject(6, 719 * 5),
        new BackgroundObject(7, 719 * 5),
    ],
    [
        new Coin(300, 190),
        new Coin(370, 160),
        new Coin(440, 130),
        new Coin(510, 160),
        new Coin(580, 190),

        new Coin(900, 120),
        new Coin(970, 140),
        new Coin(1040, 120),

        new Coin(1400, 150),
        new Coin(1470, 150),
        new Coin(1540, 150),

        new Coin(1900, 180),
        new Coin(1970, 150),
        new Coin(2040, 120),
        new Coin(2110, 150),
        new Coin(2180, 180),
    ],
    [
        new Bottle(550, 340),
        new Bottle(900, 340),
        new Bottle(1020, 340),
        new Bottle(1440, 340),
        new Bottle(1920, 340),
    ],
);
