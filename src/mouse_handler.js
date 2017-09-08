
class MouseHandler {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.mouseIn = false;
    this.init();

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  };

  init() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseout', this.onMouseOut);
    document.addEventListener('mouseover', this.onMouseOver);
  };

  onMouseOut() {
    this.mouseIn = false;
  };

  onMouseOver() {
    this.mouseIn = true;
  };

  onMouseMove(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  };
}

// handleInput() {
//   const userCircle = this.game.userCircles[0];
//   console.log(this.x)
//   console.log(this.y)
//   console.log(this.loggedIn)
//   if (this.mouseIn === false) {
//     userCircle.vel = [0, 0];
//     return;
//   }
//   let dX = this.x - userCircle.pos[0];
//   let dY = this.y - userCircle.pos[1];
//
//   let vLength = Math.sqrt( (dX*dX) + (dY*dY) );
//
//   let normX = dX / vLength;
//   let normY = dY / vLength;
//
//   userCircle.vel = [normX * vLength / 50, normY * vLength / 50];
//
// }

module.exports = MouseHandler;
