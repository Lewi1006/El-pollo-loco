// game.js is main.js file
// It initializes canvas, creates World and Keyboard objects
// init() is called on window load
// canvas is selected from HTML
// canvas and keyboard variables are passed into World object
// eventListener makes keyboard globally accesible

import { World } from "../models/world.class.js";
import { Keyboard } from "../helper_classes/keyboard-manager.js";
import { SoundHub } from "../helper_classes/sound-helper.js";


// #region variables
let canvas;
let world;
let keyboard = new Keyboard();

const startScreenRef = document.querySelector(".start-screen");
const winScreenRef = document.querySelector(".win-screen");
const gameOverScreenRef = document.querySelector(".game-over-screen");

const startButtonRef = document.getElementById("start-button");
const restartButtonRef = document.getElementById("restart-button");
const restartButtonWonRef = document.getElementById(`restart-button-won`);

const instructionsButtonRef = document.getElementById(`instructions-button`);
const soundButtonRef = document.getElementById(`sound-button`);
const homeButtonRef = document.getElementById("home-button");
const closeDialogRef = document.getElementById(`close-dialog`);

// #endregion

// #region initialization

SoundHub.getSoundFromLocalStorage();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard, showGameOverScreen, showGameWonScreen);
}

// #endregion

// #region game controls
startButtonRef.addEventListener("click", startGame);
restartButtonRef.addEventListener("click", restartGame);
restartButtonWonRef.addEventListener(`click`, restartGame);
homeButtonRef.addEventListener("click", goToHomeScreen);

function startGame() {
    showGameUI();
    showGameControls();
    init();
    
    world.gameStarted = true;
    SoundHub.playOne(SoundHub.start, 0.4);
    SoundHub.playBackground();
}

function restartGame() {
    hideEndScreen();
    showGameUI();
    showGameControls();
    
    init();
    world.gameStarted = true;
}

function goToHomeScreen() {
    hideGameControls();
    world.stopGame();
    showHomeUI();
}
// #endregion

// #region screen management

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


function hideEndScreen(){
    gameOverScreenRef.classList.add("d-none");
    winScreenRef.classList.add("d-none");
    
}

function showGameControls() {
    document.querySelector(".game-controls").classList.remove("d-none");
}

function hideGameControls() {
    document.querySelector(".game-controls").classList.add("d-none");
}

// #endregion

// #region sound
soundButtonRef.addEventListener("click", toggleSound);

function toggleSound(){
    SoundHub.toggleSound();
    SoundHub.toggleSoundIcon();
    
    // https://www.w3schools.com/JSREF/met_html_blur.asp
    soundButtonRef.blur();
}
// #endregion

// #region dialog
instructionsButtonRef.addEventListener(`click`, openDialog);
closeDialogRef.addEventListener("click", closeDialog);

function openDialog() {
    let dialogRef = document.getElementById(`dialog`);
    dialogRef.showModal();
    document.body.classList.add("no-scroll");
}

function closeDialog() {
    let dialogRef = document.getElementById(`dialog`);
    dialogRef.close();
    document.body.classList.remove("no-scroll");
}

// #endregion
