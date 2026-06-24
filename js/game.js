import { World } from "../models/world.class.js";

let canvas;
let world;

// init();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas); 
    window.world = world; 
    }

// so that onload works and access to function init is there 
// https://stackoverflow.com/questions/8830074/what-is-the-difference-between-window-onload-init-and-window-onload-init
window.onload = init;