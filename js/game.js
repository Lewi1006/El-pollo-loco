import { World } from "../models/world.class.js";
import { Keyboard } from "../helper_classes/keyboard-manager.js";

let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    // window.world = world;
    // window.keyboard = keyboard;
}

// so that onload works and access to function init is there
// https://stackoverflow.com/questions/8830074/what-is-the-difference-between-window-onload-init-and-window-onload-init
window.onload = init;

document.addEventListener("keydown", (event) => {
     console.log(keyboard);
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }

     if (event.code == "ArrowUp") {
        keyboard.UP = true;
    }

    if (event.code == "ArrowDown") {
        keyboard.DOWN = true;
    }

     if (event.code == " ") {
        keyboard.SPACE = true;
    }

    console.log(event);
});

document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }

     if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }

    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }

     if (event.key == " ") {
        keyboard.SPACE = false;
    }

    console.log(event);
});
