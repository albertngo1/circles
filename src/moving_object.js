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

  move(timeDelta = 1) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;
    this.pos = this.game.wrap([this.pos[0] + offsetX, this.pos[1] + offsetY]);

  }

  collideWith(otherObject) {
    let smallCircle = this.radius >= otherObject.radius ? otherObject : this;
    let bigCircle = this.radius >= otherObject.radius ? this : otherObject;

    this.game.remove(smallCircle);
    bigCircle.vel = [bigCircle.vel[0] * .9, bigCircle.vel[1] * .9];
    bigCircle.radius = Math.sqrt(Math.pow(smallCircle.radius, 2) + Math.pow(bigCircle.radius, 2));




    return true;
  }

  isCollidedWith(otherObject) {
    const dist = Math.sqrt(Math.pow(otherObject.pos[1] - this.pos[1], 2)
     + Math.pow(otherObject.pos[0] - this.pos[0], 2));

     if (dist < this.radius + otherObject.radius) {
       return true;
     }  else {
       return false;
     }
  }

  relocate() {
    this.pos = this.game.randomPosition();
  }


}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
