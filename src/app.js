const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const game = new Game();
  new GameView(game, ctx).start();
})
