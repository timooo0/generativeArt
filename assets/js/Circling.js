let EPSILON = 0.001;

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  let canvasX = canvasDiv.offsetWidth;
  let canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  let currentPos = [0.5 * canvasX, 0.5 * canvasY];
  let currentAngle = 0;
  let lineSize = 100;
  let clockWise = false;
  let prevClockWise = false;
  let counter = 0;
  while (
    currentPos[0] > 0 &&
    currentPos[1] > 0 &&
    currentPos[0] < canvasX &&
    currentPos[1] < canvasY
  ) {
    prevClockWise = clockWise;

    if (Math.random() >= 0.2 || counter < 4) {
      clockWise = true;
    } else {
      clockWise = false;
    }

    if (clockWise != prevClockWise) {
      if (Math.abs(currentAngle) >= Math.PI * 1.5 - EPSILON) {
        currentPos[1] -= 0.5 * lineSize;
        console.log("> 1.5 Pi");
      } else if (Math.abs(currentAngle) >= Math.PI - EPSILON) {
        currentPos[0] -= 0.5 * lineSize;
        console.log("> 1 Pi");
      } else if (Math.abs(currentAngle) >= Math.PI * 0.5 - EPSILON) {
        currentPos[1] += 0.5 * lineSize;
        console.log("> 0.5 Pi");
      } else {
        currentPos[0] += 0.5 * lineSize;
        console.log("> 0 Pi");
      }
      currentAngle += Math.PI;
    }

    if (clockWise) {
      drawQuarter(
        currentPos[0],
        currentPos[1],
        lineSize,
        currentAngle,
        currentAngle + Math.PI * 0.5
      );
      currentAngle += Math.PI * 0.5;
    } else {
      drawQuarter(
        currentPos[0],
        currentPos[1],
        lineSize,
        currentAngle - Math.PI * 0.5,
        currentAngle
      );
      currentAngle -= Math.PI * 0.5;
    }

    if (currentAngle < 0) {
      currentAngle = 2 * Math.PI + currentAngle;
    }
    currentAngle = currentAngle % (2 * Math.PI);
    counter += 1;
  }
}

function drawQuarter(posX, posY, lineSize, start, stop) {
  for (let i = lineSize; i > 0; i -= 20) {
    strokeWeight(5);
    arc(posX, posY, i, i, start, stop);
  }
}
