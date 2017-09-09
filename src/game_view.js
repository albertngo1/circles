const UserCircle = require('./game_view.js');
const Camera = require('./viewport/camera.js');
const Game = require('./game.js');

const GLOBAL = {
  KEY_ESC: 27,
  KEY_ENTER: 13,
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_A: 65,
  KEY_W: 87,
  KEY_D: 68,
  KEY_S: 83,
  KEY_P: 80
}
const KEYS = {
  up: false,
  left: false,
  right: false,
  down: false,
  w: false,
  a: false,
  s: false,
  d: false,
  enter: false
}

window.onkeydown = (e) => {
  const keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_A) KEYS.a = true;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = true;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = true;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = true;

}

window.onkeypress = (e) => {
  const keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_ENTER) GameView.togglePause();
}

window.onkeyup = (e) => {
  const keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_A) KEYS.a = false;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = false;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = false;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = false;

}


class GameView {

  constructor(game, ctx, camera) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.score = 0;
    this.paused = false;
    this.startGame = false;
    this.startScreen = true;

    this.camera = camera;

  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));

  }


  animate(time) {
    let delta = time - this.lastTime;

    this.handleInput();
    // this.camera.update();
    // this.camera.follow(this.game.userCircles[0], 100, 100);
    this.game.step(delta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (KEYS.enter) {
      console.log(KEYS.enter);
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }

  }

  togglePause() {
    if (!this.paused) {
      cancelAnimationFrame(this.animate.bind(this));
      console.log(this.paused);
      this.paused = true;
    } else {
      this.animate(time);
      this.paused = false;
    }
  }



  handleInput() {
    const userCircle = this.game.userCircles[0];
    userCircle.vel[0] *= .9;
    userCircle.vel[1] *= .9;
    if (KEYS.w) {
      userCircle.power([0, -.5]);
    }
    if (KEYS.s) {
      userCircle.power([0, .5]);
    }
    if (KEYS.a) {
      userCircle.power([-.5, 0]);
    }
    if (KEYS.d) {
      userCircle.power([.5, 0]);
    }


  }


}




module.exports = GameView;
