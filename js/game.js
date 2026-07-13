// game.js is main.js file
// It initializes canvas, creates World and Keyboard objects
// init() is called on window load
// canvas is selected from HTML
// canvas and keyboard variables are passed into World object
// eventListener makes keyboard globally accesible

import { World } from "../models/world.class.js";
import { Keyboard } from "../helper_classes/keyboard-manager.js";
import { SoundHub } from "../helper_classes/sound-helper.js";

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
// window.onload = init;

// #region Keyboard input
document.addEventListener("keydown", (event) => {
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

    if (event.code == "KeyD") {
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

    if (event.code == "KeyD") {
        keyboard.D = false;
    }
});

const startButtonRef = document.getElementById("start-button");
startButtonRef.addEventListener("click", startGame);

function startGame() {
    const startScreenRef = document.querySelector(".start-screen");
    startScreenRef.classList.add(`d-none`);
    instructionsButtonRef.classList.add(`d-none`);
    init();

    world.gameStarted = true;
    SoundHub.playOne(SoundHub.start, 0.4);
}

const restartButtonRef = document.getElementById("restart-button");
restartButtonRef.addEventListener("click", restartGame);

const restartButtonWonRef = document.getElementById(`restart-button-won`);
restartButtonWonRef.addEventListener(`click`, restartGame);

// https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
function restartGame() {
    window.location.reload();
}
// #endregion

// #region dialog
const instructionsButtonRef = document.getElementById(`instructions-button`);
instructionsButtonRef.addEventListener(`click`, openDialog);

function openDialog() {
    let dialogRef = document.getElementById(`dialog`);
    dialogRef.showModal();
    document.body.classList.add("no-scroll");
}

const closeDialogRef = document.getElementById(`close-dialog`);
closeDialogRef.addEventListener("click", closeDialog);

function closeDialog() {
    let dialogRef = document.getElementById(`dialog`);
    dialogRef.close();
    document.body.classList.remove("no-scroll");
}

// #endregion

const soundButtonRef = document.getElementById(`sound-button`);
const soundIconRef = document.getElementById(`sound-icon`);

soundButtonRef.addEventListener("click", () => {
    //    https://stackoverflow.com/questions/11604409/how-to-toggle-a-boolean?
    SoundHub.isMuted = !SoundHub.isMuted;

    if (SoundHub.isMuted) {
        SoundHub.pauseAll();
        soundIconRef.src = "./assets/icons/sound_off.png";
    } else {
        soundIconRef.src = "./assets/icons/sound_on.png";
    }
});
