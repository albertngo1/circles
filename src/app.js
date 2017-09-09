const Game = require('./game');
const GameView = require('./game_view');
const Camera = require('./viewport/camera.js');


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const game = new Game();

  const camera = new Camera(0, 0,
    100, 100, canvas.width, canvas.height);


  new GameView(game, ctx, camera).start();
})
