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

function showGameOverScreen() {
    hideGameControls();
    const gameOverScreenRef = document.querySelector(`.game-over-screen`);
    gameOverScreenRef.classList.remove(`d-none`);
}

function showGameWonScreen() {
    hideGameControls();
    const winScreenRef = document.querySelector(`.win-screen`);
    winScreenRef.classList.remove(`d-none`);
}


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, showGameOverScreen, showGameWonScreen);
}


const startScreenRef = document.querySelector(".start-screen");
const gameOverScreenRef = document.querySelector(".game-over-screen");
const winScreenRef = document.querySelector(".win-screen");
const startButtonRef = document.getElementById("start-button");
const restartButtonRef = document.getElementById("restart-button");
const restartButtonWonRef = document.getElementById(`restart-button-won`);
const instructionsButtonRef = document.getElementById(`instructions-button`);
const soundButtonRef = document.getElementById(`sound-button`);
const soundIconRef = document.getElementById(`sound-icon`);
const homeButtonRef = document.getElementById("home-button");

startButtonRef.addEventListener("click", startGame);

function startGame() {
    showGameUI();
    showGameControls();
    init();

    world.gameStarted = true;
    SoundHub.playOne(SoundHub.start, 0.4);
}

restartButtonRef.addEventListener("click", restartGame);
restartButtonWonRef.addEventListener(`click`, restartGame);
function restartGame() {
    gameOverScreenRef.classList.add("d-none");
    winScreenRef.classList.add("d-none");
    showGameUI();
    showGameControls();

    init();
    world.gameStarted = true;
}

homeButtonRef.addEventListener("click", goToHomeScreen);

function goToHomeScreen() {
    hideGameControls();
    world.stopGame();
    showHomeUI();
}

function showHomeUI() {
    // show start screen
    startScreenRef.classList.remove("d-none");

    // hide other screens
    gameOverScreenRef.classList.add("d-none");
    winScreenRef.classList.add("d-none");

    instructionsButtonRef.classList.remove(`d-none`);
    homeButtonRef.classList.add(`d-none`);
}

function showGameUI() {
    startScreenRef.classList.add(`d-none`);

    instructionsButtonRef.classList.add(`d-none`);
    homeButtonRef.classList.remove(`d-none`);
}

function showGameControls() {
    document.querySelector(".game-controls").classList.remove("d-none");
}

function hideGameControls() {
    document.querySelector(".game-controls").classList.add("d-none");
}

soundButtonRef.addEventListener("click", () => {
    SoundHub.toggleSound();

    if (SoundHub.isMuted) {
        soundIconRef.src = "./assets/icons/sound_off.png";
    } else {
        soundIconRef.src = "./assets/icons/sound_on.png";
    }

    // https://www.w3schools.com/JSREF/met_html_blur.asp
    soundButtonRef.blur();
});

// #region dialog
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
