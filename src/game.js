const Circle = require('./circle');
const Util = require('./util');
const UserCircle = require('./user_circle');

class Game {

  constructor() {
    this.circles = [];
    this.userCircles = [new UserCircle({game: this})];
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

  allObjects() {
     return [].concat(this.circles, this.userCircles);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    const allObjects = this.allObjects()
    allObjects.forEach( el => {
      el.draw(ctx);
    })
  }


  step() {
    this.moveObjects();
    this.checkCollisions();
  }





  moveObjects() {
    const allObjects = this.allObjects();
    allObjects.forEach( el => {
      el.move();
    });
  }

  remove(object) {
    if (object instanceof Circle) {
      this.circles.splice(this.circles.indexOf(object), 1);
    } else if (object instanceof UserCircle) {
      this.userCircles.splice(this.userCircles.indexOf(object), 1);
    }
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i=0; i < allObjects.length; i++) {
      for (let j=0; j < allObjects.length; j++) {
        if (i === j) {
          continue;
        }

        if (allObjects[i].isCollidedWith(allObjects[j])) {
          let collision = allObjects[i].collideWith(allObjects[j]);
          if (collision) return;
        }
      }
    }
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
