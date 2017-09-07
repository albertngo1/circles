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
    this.vel = [0, 0]

  }

  power(move) {
    this.vel[0] += move[0];
    this.vel[1] += move[1];
  }
}

UserCircle.RADIUS = 10;

module.exports = UserCircle;
