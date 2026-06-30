// game.js is main.js file 
// It initializes canvas, creates World and Keyboard objects
// init() is called on window load
// canvas is selected from HTML
// canvas and keyboard variables are passed into World object
// eventListener makes keyboard globally accesible

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


// #region Keyboard input
document.addEventListener("keydown", (event) => {
    //  console.log(keyboard);
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

     if (event.code == "Space") {
        keyboard.SPACE = true;
    }

    if(event.code == "KeyD"){
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }

     if (event.code == "ArrowUp") {
        keyboard.UP = false;
    }

    if (event.code == "ArrowDown") {
        keyboard.DOWN = false;
    }

     if (event.code == "Space") {
        keyboard.SPACE = false;
    }

     if(event.code == "KeyD"){
        keyboard.D = false;
    }
});

// #endregion
