
class Rectangle {

  constructor(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;

  }

  set(left, top, width, height) {
    this.left = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  within(r) {
    return (
      r.left <= this.left && r.top <= this.top &&
      r.right >= this.right && r.bottom >= this.bottom
    )
  }

  overlaps(r) {
    return (
      this.left < r.right &&
      r.left < this.right &&
      r.bottom > this.top &&
      r.top < this.bottom
    );
  }
}















module.exports = Rectangle;
