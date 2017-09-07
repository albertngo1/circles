const Game = require('./game')

class MovingObject {

  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(Math.floor(this.pos[0]), Math.floor(this.pos[1]), this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  move() {
    const velocityScale = 400 / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;
    this.pos = this.game.wrap([this.pos[0] + offsetX, this.pos[1] + offsetY]);

  }


}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
