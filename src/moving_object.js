
class MovingObject {

  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    offsetX = this.vel[0] * velocityScale;
    offsetY = this.vel[1] * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  }


}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
