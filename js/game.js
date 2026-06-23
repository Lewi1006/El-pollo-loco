let canvas;
let ctx;
let world = new World();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2D");

  console.log(world.character);
  
  
//   character.src = "../assets/img/2_character_pepe/2_walk/W-21.png";
//   ctx.drawImage(character, 20, 20, 25, 150);
}
