class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    window.setInterval(() => this.game.moveObjects(), 20);
    window.setInterval(() => this.game.draw(this.ctx), 20);
  }


}

module.exports = GameView;
