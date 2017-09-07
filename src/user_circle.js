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

  power(impulse) {
    this.pos[0] += impulse[0];
    this.pos[1] += impulse[1];
  }
}

UserCircle.RADIUS = 10;

module.exports = UserCircle;
