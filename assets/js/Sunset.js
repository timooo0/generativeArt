// Sunset
// Inspired by: https://www.reddit.com/r/generative/comments/17wof22/some_calm_and_boring_backgrounds_for_a/

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  let canvasX = canvasDiv.offsetWidth;
  let canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  let squareSize = 5;
  let offset = -150;
  let numWaves = 24;
  let waveOffset = (1.2 * canvasY) / numWaves;
  let waveWidth = 3.5 / canvasX;
  let numRays = 150;
  background("rgba(0,255,0,0.5)");
  noStroke();

  for (let waveId = 0; waveId < numWaves; waveId++) {
    let sineShift = Math.random() * 2 * Math.PI;
    let c1;
    let c2;

    if (waveId < (2 * numWaves) / 3) {
      c1 = color(0, 130 + waveId * 8, 255);
      c2 = color(0, 125 + waveId * 8, 255);
    } else {
      c1 = color(255, 230 - (waveId - numWaves / 2) * 10, 0);
      c2 = color(255, 225 - (waveId - numWaves / 2) * 10, 0);
    }

    if (waveId == (2 * numWaves) / 3) {
      // Draw the sun
      let sunColor = color(255, 220, 0);
      let sunColor2 = color(255, 210, 0);
      let sunX = canvasX / 2;
      let sunY = canvasY / 2;
      let sunR = canvasY / 5;

      // Draw the rays
      noFill();
      strokeWeight(3);
      stroke(sunColor2);
      for (let i = 0; i < numRays; i++) {
        let startX = sunX;
        let endX = 0;
        let startY = sunY;
        let endY = 0;
        let gap = 4;
        let iter = 0;
        let lineLength = 0;
        while ((sunX - endX) ** 2 + (sunY - endY) ** 2 < canvasX ** 2) {
          lineLength += 5 * gap * Math.random() + gap;
          endX = sunX + lineLength * Math.cos((i / numRays) * 2 * Math.PI);
          endY = sunY + lineLength * Math.sin((i / numRays) * 2 * Math.PI);
          line(startX, startY, endX, endY);
          startX = endX + gap * Math.cos((i / numRays) * 2 * Math.PI);
          startY = endY + gap * Math.sin((i / numRays) * 2 * Math.PI);
          iter++;
        }
      }
      noFill();
      stroke(sunColor);
      strokeWeight(squareSize + 1);
      circle(sunX, sunY, 2 * sunR);
      // fill the sun
      noStroke();
      for (
        let i = sunX - sunR;
        i < sunX + sunR - squareSize;
        i = i + squareSize - 1
      ) {
        for (
          let j = sunY - sunR;
          j < sunY + sunR - squareSize;
          j = j + squareSize - 1
        ) {
          if (
            (sunX - i - 0.5 * squareSize) ** 2 +
              (sunY - j - 0.5 * squareSize) ** 2 <
            sunR ** 2
          ) {
            Math.random() > 0.8 ? fill(sunColor) : fill(sunColor2);
            square(i, j, squareSize);
          }
        }
      }
    }

    // Draw the edge of the wave
    stroke(c2);
    strokeWeight(squareSize + 2);
    noFill();
    beginShape();
    for (let i = 0; i < canvasX; i++) {
      vertex(
        i,
        (canvasY / 10) * Math.sin(i * waveWidth + sineShift) +
          offset +
          waveOffset * waveId +
          squareSize / 2
      );
    }
    endShape();
    noStroke();

    // Fill the waves
    for (let i = 0; i < canvasX; i += squareSize) {
      for (let j = 0; j < canvasY; j += squareSize) {
        let waveHeight =
          (canvasY / 10) * Math.sin(i * waveWidth + sineShift) +
          offset +
          waveOffset * waveId;
        if (j < offset + waveOffset * waveId + canvasY / 6 && j > waveHeight) {
          Math.random() > 0.3 ? fill(c1) : fill(c2);
          square(i, j, squareSize);
        }
      }
    }
  }
}
