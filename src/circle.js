const MovingObject = require('./moving_object.js');


const randomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255)},
   ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)})`;
}

const randomRadius = () => {
  return Math.floor(Math.random() * (15  - 3) + 3);
}




class Circle extends MovingObject {
  constructor(options = {}) {
    super(options);
    this.color = randomColor();
    options.radius = options.radius || randomRadius();
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(0.1);;

  }


}


module.exports = Circle;
