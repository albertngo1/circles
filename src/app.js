const Game = require('./game');
const GameView = require('./game_view');
const Camera = require('./viewport/camera.js');


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  let game;

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  // const camera = new Camera(0, 0,
  //   100, 100, canvas.width, canvas.height);
  game = new Game();

  new GameView(game, ctx).start();

  $('.restart').click(() => {
    window.location.reload();
  })
})
