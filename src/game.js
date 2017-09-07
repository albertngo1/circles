const Circle = require('./circle');
const Util = require('./util');

class Game {

  constructor() {
    this.circles = [];
    this.addCircles();
  }

  addCircles() {

    for (let i = 1; i <= Game.NUM_CIRCLES; i++) {
      this.circles.push(new Circle({pos: this.randomPosition(), game: this, vel: Util.randomVec(0.1)}));
    }
  }

  randomPosition() {
    let x = Game.DIM_X * Math.random();
    let y = Game.DIM_Y * Math.random();
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.circles.forEach( el => {
      el.draw(ctx);
    })
  }

  moveObjects() {
    this.circles.forEach( el => {
      el.move();
    });
  }

  wrap(pos) {
    if (pos[0] > Game.DIM_X + 15) {
      pos[0] = 0;
    } else if (pos[0] < -15) {
      pos[0] = Game.DIM_X;
    }

    if (pos[1] > Game.DIM_Y + 15) {
      pos[1] = 0;
    } else if (pos[1] < -15) {
      pos[1] = Game.DIM_Y;
    }

    return pos;
  }

}


Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_CIRCLES = 100;



module.exports = Game;
