const Circle = require('./circle');
const Util = require('./util');
const UserCircle = require('./user_circle');


const randomRadius = () => {
  return Math.floor(Math.random() * (15  - 3) + 3);
}

class Game {

  constructor() {
    this.circles = [];
    this.start = false;
    this.userCircles = [new UserCircle({game: this})];
    this.radMult = 1;
    this.velMult = 1;
    this.addCircles();

    this.score = 0;
  }

  addCircles() {

    for (let i = 1; i <= Game.NUM_CIRCLES; i++) {
      this.circles.push(new Circle({pos: this.randomPosition(), game: this, radius: randomRadius(),  vel: Util.randomVec(0.1)}));
    }
  }

  addMoreCircles() {
    const allObjects = this.allObjects();
    this.radMult *= 1.05;
    this.velMult *= 1.5;
    while (this.circles.length <= Game.NUM_CIRCLES *.8) {
      this.circles.push(new Circle({pos: this.randomPosition(), game: this, radius: randomRadius()*this.radMult, vel: Util.randomVec(0.1, this.velMult)}));
    }
  }

  randomPosition() {
    let x = Game.DIM_X * Math.random();
    let y = Game.DIM_Y * Math.random();

    while ((x > Game.DIM_X / 2 - Game.BUFFER_ZONE && x < Game.DIM_X / 2 + Game.BUFFER_ZONE) &&
    (y > Game.DIM_Y / 2 - Game.BUFFER_ZONE && y < Game.DIM_Y / 2 + Game.BUFFER_ZONE)  ) {
      x = Game.DIM_X * Math.random();
      y = Game.DIM_Y * Math.random();
    }

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
    if (this.userCircles[0].radius > Game.BUFFER_ZONE * .8) {
      this.drawWarning(ctx);
    }
    this.drawScore(ctx);
  }

  drawWarning(ctx) {
    const colors = ['rgb(224, 20, 20)', 'rgb(235, 255, 1)','#f7ad06'];
    const userCircle = this.userCircles[0];
    ctx.font = "20px Impact";
    ctx.fillStyle = `${colors[Math.floor(Math.random()*colors.length)]}`;
    ctx.textBaseline = "top"
    ctx.font = `${this.radius * .7}px Calibri`;
    ctx.textBaseline = "middle"
    ctx.textAlign = "center";
    ctx.fillText(`W A R N I N G.. ${Math.floor(50-userCircle.radius+1)}`, userCircle.pos[0], userCircle.pos[1] - userCircle.radius*1.2);
  }

  drawScore(ctx) {
    ctx.font = "20px Impact";
    ctx.fillStyle = "rgb(17, 17, 17)";
    ctx.textBaseline = "top"
    ctx.fillText("Score: "+this.score, 1200, 0);
  }


  step(delta) {
    const allObjects = this.allObjects();
    this.moveObjects(delta);
    this.checkCollisions();
    if (this.circles.length === 0) {
      window.location.reload();
    }

    if (this.userCircles.length === 0) {
      window.location.reload();
    }
    if (this.userCircles[0].radius > Game.RESET_RADIUS) {
      this.userCircles[0].radius = 10;
    }

    if (allObjects.length < Game.NUM_CIRCLES * .4) {
      this.addMoreCircles();
    }
  }





  moveObjects(timeDelta) {
    const allObjects = this.allObjects();
    allObjects.forEach( el => {
      el.move(timeDelta);
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
          if (this.userCircles.includes(allObjects[i]) ||
        this.userCircles.includes(allObjects[j])) {
            this.score += Game.SCORE;
          }
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
Game.SCORE = 100;
Game.RESET_RADIUS = 50;
Game.BUFFER_ZONE = 50;



module.exports = Game;
