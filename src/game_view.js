const UserCircle = require('./game_view.js');
const global = require('./global.js');



class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    let delta = time - this.lastTime;


    this.game.userCircles[0].vel[0] *= .95
    this.game.userCircles[0].vel[1] *= .95

    this.game.step(delta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
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
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
}

module.exports = GameView;
