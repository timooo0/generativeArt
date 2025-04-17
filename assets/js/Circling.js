let EPSILON = 0.001;
let canvasX;
let canvasY;
let currentPos;
let currentAngle = 0;
let lineSize = 100;
let clockWise = false;
let prevClockWise = false;
let counter = 0;

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  currentPos = [0.5 * canvasX, 0.5 * canvasY];
  frameRate(60);
}

function draw(){
  if (
    currentPos[0] > 0 &&
    currentPos[1] > 0 &&
    currentPos[0] < canvasX &&
    currentPos[1] < canvasY
  ) {
    prevClockWise = clockWise;

    if (counter > 3){
      if (Math.random() >= 0.5) {
        clockWise = true;
      } else {
        clockWise = false;
      }
      counter = 0;
    }
    
    let deltaAngle = 0.1*Math.PI;
    if (clockWise != prevClockWise) {
      currentPos[0] += Math.cos(currentAngle) * 0.5 * lineSize;
      currentPos[1] += Math.sin(currentAngle) * 0.5 * lineSize;
      currentAngle += Math.PI;
    }

    if (clockWise) {
      drawArc(
        currentPos[0],
        currentPos[1],
        lineSize,
        currentAngle,
        currentAngle + deltaAngle
      );
      currentAngle += deltaAngle;
    } else {
      drawArc(
        currentPos[0],
        currentPos[1],
        lineSize,
        currentAngle - deltaAngle,
        currentAngle
      );
      currentAngle -= deltaAngle;
    }
    counter += 1;
  } else {
    currentPos = [0.5 * canvasX, 0.5 * canvasY];
    currentAngle = Math.random() * (Math.PI * 2);
    lineSize = 100;
    clockWise = false;
    prevClockWise = false;
    counter = 0;
  }
}

function drawArc(posX, posY, lineSize, start, stop) {
  for (let i = lineSize; i > 0; i -= 20) {
    strokeWeight(5);
    arc(posX, posY, i, i, start, stop);
  }
}
