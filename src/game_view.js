const UserCircle = require('./game_view.js');


class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.bindKeyHandlers();
    window.setInterval(() => this.game.step(), 20);
    window.setInterval(() => this.game.draw(this.ctx), 20);
  }






  bindKeyHandlers() {
    const userCircle = this.game.userCircle;

    Object.keys(GameView.KEYS).forEach( el =>{
      debugger;
      key(el, () => {
        userCircle.power(GameView.KEYS[el]);
      });
    });

  }


}

GameView.KEYS = {
  "w": [0, 1],
  "a": [-1, 0],
  "s": [0, -1],
  "d": [1, 0]
}

module.exports = GameView;
