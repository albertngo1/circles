const UserCircle = require('./user_circle.js');
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
  // e.preventDefault();

  if (keyPress === GLOBAL.KEY_A) KEYS.a = true;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = true;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = true;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = true;

}

window.onkeypress = (e) => {
  const keyPress = e.keyCode;
  // e.preventDefault();

  if (keyPress === GLOBAL.KEY_ENTER) GameView.togglePause();
}

window.onkeyup = (e) => {
  const keyPress = e.keyCode;

  if (keyPress === GLOBAL.KEY_A) KEYS.a = false;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = false;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = false;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = false;

}


class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.score = 0;
    this.paused = false;
    this.startGame = false;
    this.startScreen = true;


  }

  beginGame() {
    this.startScreen = false;
    this.startGame = true;
    $('.instructions-page').css('display', 'none');
    let name = $('.name-textbox').val();
    name = name.length > 0 ? name : "Player 1"
    this.game.userCircles[0].name = name;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));

  }


  animate(time) {
    let delta = time - this.lastTime;
    // this.camera.update();
    // this.camera.follow(this.game.userCircles[0], 100, 100);

    if (this.startScreen) {
      $('.start-game').click(() => {
        this.beginGame();
      })
    } else if (this.startGame) {
      if (this.game.userCircles.length !== 0) {
        this.handleInput();
        this.game.draw(this.ctx);
        this.game.step(delta);
      }
    }


    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));

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
    userCircle.vel[0] *= .8;
    userCircle.vel[1] *= .8;
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
