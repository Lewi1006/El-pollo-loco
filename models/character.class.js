import { MovableObject } from "./movable-object.class.js";


export class Character extends MovableObject {


    constructor(){
        super();
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        // this.loadImage("./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png")
    }

    jump(){

    }
}
