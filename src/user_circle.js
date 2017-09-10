const MovingObject = require('./moving_object.js');


const randomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255)},
   ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)})`;
}


class UserCircle extends MovingObject {

  constructor(options = {}) {
    super(options);
    this.color = randomColor();
    this.radius = UserCircle.RADIUS;
    this.pos = [window.innerWidth / 2, window.innerHeight / 2];
    this.vel = [0, 0];
    this.name = "Player 1";

  }

  power(move) {
    this.vel[0] += move[0];
    this.vel[1] += move[1];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(Math.floor(this.pos[0]), Math.floor(this.pos[1]), this.radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = `${this.radius * .7}px Arial`;
    ctx.textBaseline = "middle"
    ctx.textAlign = "center";
    ctx.fillText(`${this.name}`, this.pos[0], this.pos[1]);
  }
}

UserCircle.RADIUS = 10;

module.exports = UserCircle;
