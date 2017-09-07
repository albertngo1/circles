const UserCircle = require('./game_view.js');
const global = require('./global.js');



class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.bindKeyHandlers();


    window.setInterval(() => {
      this.game.userCircles[0].vel[0] *= .95
      this.game.userCircles[0].vel[1] *= .95
    }, 20);
    window.setInterval(() => this.game.step(), 20);
    window.setInterval(() => this.game.draw(this.ctx), 20);
  }






  bindKeyHandlers() {
    const userCircle = this.game.userCircles[0];
    Object.keys(GameView.KEYS).forEach( k => {
      let move = GameView.KEYS[k]
      key(k, () => { userCircle.power(move);});
    });

  }


}

GameView.KEYS = {
  "w": [0, -.9],
  "a": [-.9, 0],
  "s": [0, .9],
  "d": [.9, 0]
}

module.exports = GameView;
