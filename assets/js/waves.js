// Sunset
// Inspired by: https://www.reddit.com/r/generative/comments/17wof22/some_calm_and_boring_backgrounds_for_a/

let canvasX = window.innerWidth;
let canvasY = window.innerHeight;
let laneWidth = canvasX / 4;
let squareSize = 5;
let sineShift = Math.random() * 0.5 * Math.PI;
let waveAmount = 7;
let waveSize = canvasY / waveAmount;
let offset = -waveSize;
let deltaBlue = 20;

function setup() {
  createCanvas(canvasX, canvasY);
  background("rgba(100,200,255,1)");
  rect(0, 0, laneWidth, canvasY);
  for (let x = 0; x < canvasX; x += canvasX / 3) {
    createWaves(x, laneWidth, waveAmount);
  }
}

function createWaves(startX, width, numWaves) {
  let waves = [];
  let waveSize = canvasY / waveAmount;
  for (let waveId = 0; waveId <= numWaves; waveId++) {
    let wavefront = [];
    for (let i = 0; i < width; i += 1) {
      if (waveId != numWaves) {
        wavefront.push(
          waveSize * noise((width * waveId + i) / 200) +
            offset +
            waveSize * waveId
        );
      } else {
        wavefront.push(canvasY);
      }
    }
    waveSize += 0.2 * waveSize * (Math.random() - 0.5);
    waves.push(wavefront);
  }
  for (let waveId = 0; waveId < numWaves; waveId++) {
    let c1;
    let c2;
    let baseBlue = 76 + waveId * deltaBlue;
    sineShift += Math.random() * 0.25 * Math.PI;

    // Fill the waves
    noStroke();
    for (let i = 0; i < width; i = i + squareSize) {
      let x = 0;
      for (
        let j = Math.floor(waves[waveId][i]);
        j <= Math.ceil(waves[waveId + 1][i]);
        j = j + squareSize
      ) {
        let bValue =
          baseBlue +
          deltaBlue *
            4 *
            (x / ((waves[waveId + 1][i] - waves[waveId][i]) / squareSize)) ** 2;
        c1 = color(0, bValue, 255);
        c2 = color(0, bValue - 10, 255);
        Math.random() > 0.3 ? fill(c1) : fill(c2);
        square(startX + i, j, squareSize);

        x += 1;
      }
    }

    // Draw the edge of the wave
    stroke(color(255, 255, 255));
    strokeWeight(5);
    noFill();
    beginShape();
    start = Math.random() * 2 * Math.PI;
    for (let i = 0; i < width; i++) {
      let foam = 1.5 * Math.abs(Math.sin(i / (0.3 * width) + start));
      lineWidth = 3 * Math.abs(Math.sin(i / (width * 0.5) + start));
      square(startX + i, waves[waveId][i], lineWidth);
      for (let j = 0; j < 10; j++) {
        if (Math.random() > 0.9) {
          square(startX + i, waves[waveId][i] - foam * j * lineWidth, 0.5);
        }
      }
    }
    endShape();
  }
}
