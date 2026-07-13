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
        new Chicken(),
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

        new Coin(900, 180),
        new Coin(970, 150),
        new Coin(1040, 120),
        new Coin(1110, 150),
        new Coin(1180, 180),

        new Coin(1450, 250),
        new Coin(1520, 220),
        new Coin(1590, 190),
        new Coin(1660, 160),
        new Coin(1730, 130),

        new Coin(1950, 130),
        new Coin(2020, 160),
        new Coin(2090, 190),
        new Coin(2160, 220),
        new Coin(2230, 250),

        new Coin(2450, 160),
        new Coin(2520, 160),
        new Coin(2590, 160),
        new Coin(2660, 160),
        new Coin(2730, 160),

        new Coin(3320, 200),
        new Coin(3390, 170),
        new Coin(3460, 140),
        new Coin(3530, 170),
        new Coin(3600, 200),
    ],
    [
        new Bottle(450, 340),
        new Bottle(900, 340),
        new Bottle(1250, 340),
        new Bottle(1700, 340),
        new Bottle(2150, 340),
        new Bottle(2650, 340),
        new Bottle(3150, 340),
        new Bottle(3550, 340),
    ],
);
