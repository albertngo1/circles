let canvasPos = getPosition(canvas);
console.log(canvasPos);
let mouseX;
let mouseY;

update();
canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.beginPath();
  ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle =  '#83c726';
  ctx.stroke();

  requestAnimationFrame(update);
}

function getPosition(el) {
  let xPosition = 0;
  let yPosition = 0;

  if (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
  }


  return {
    x: xPosition,
    y: yPosition
  };
}

module.exports = Test;
