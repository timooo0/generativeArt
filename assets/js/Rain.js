let canvasX;
let canvasY;
let rainDensity = 0.05;
let rain = []; // Start X, Start Y, Length
let rainBaseLength = 10;
let fallDistance = 10; // Fall distance per frame
let rainColor1;
let rainColor2;
let rainWidth = 3;
let blockers = []; // Start X, radius, Y offset, walking speed, walking height

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  frameRate(60);
  rainColor1 = color("rgba(150,0,250,0.3)");
  rainColor2 = color("rgba(150,100,250,0.1)");
  background(20);
  for (let i = 0; i < canvasX * rainDensity; i++) {
    for (let j = 0; j < canvasY * rainDensity; j++) {
      rain.push([
        Math.random() * canvasX, // x position
        Math.random() * canvasY, // y position
        rainBaseLength * (Math.random() - 0.5) * 1.5, // length
      ]); 
    }
  }
}

function drawRain() {
  for (let i = 0; i < rain.length; i++) {
    stroke(rainColor1);
    for (const blocker of blockers) {
      if (rain[i][0] > blocker[0] && rain[i][0] < blocker[0] + 2 * blocker[1]) {
        if (
          rain[i][1] + rain[i][2] >
          -0.5 *
            Math.sqrt(
              blocker[1] ** 2 - (rain[i][0] - blocker[0] - blocker[1]) ** 2
            ) +
            blocker[2]
        ) {
          stroke(rainColor2);
        }
      }
    }

    line(rain[i][0], rain[i][1], rain[i][0], rain[i][1] + rain[i][2]);
  }
}

function updateRain() {
  for (let i = 0; i < rain.length; i++) {
    rain[i][1] += rain[i][2] * 0.1 + fallDistance;
    if (rain[i][1] > canvasY) {
      rain[i][1] = 0;
      rain[i][0] = Math.random() * canvasX;
    }
  }
}

function updateObjects() {
  if (blockers.length < 1) {
    let radius = Math.random() * 50 + 75;
    let speed = 1 + Math.random() * 2;
    if (Math.random() < 100000 / (60 * 3)) {
      blockers.push([-2 * radius, radius, 0, speed, canvasY - 3 * radius]);

      //small
      if (Math.random() < 0.3) {
        let smallRadius = Math.random() * 20 + 50;
        blockers.push([
          -4 * smallRadius - 2 * radius,
          smallRadius,
          0,
          speed,
          canvasY - 3 * smallRadius,
        ]);
      }
    }
  }

  // Update the location
  for (const blocker of blockers) {
    blocker[0] += blocker[3];
    blocker[2] =
      0.5 *
        blocker[1] * (Math.abs(Math.cos((blocker[0] * Math.PI) / (canvasX / ((10 * 75) / blocker[1])))) - 1) + blocker[4];
  }

  // Remove any that are out of frame
  blockers = blockers.filter((blocker) => blocker[0] < canvasX);
}

function drawPerson() {
  for (const blocker of blockers) {
    let c = color("rgb(0,0,30)");
    noStroke();
    fill(c);
    // Umbrella top
    arc(
      blocker[0] + blocker[1],
      blocker[2],
      2 * blocker[1],
      0.5 * 2 * blocker[1],
      PI,
      0
    );

    stroke(c);
    // Connection rod
    line(
      blocker[0] + blocker[1],
      blocker[2],
      blocker[0] + blocker[1],
      blocker[2] + blocker[1]
    );

    noFill();
    strokeWeight(rainWidth * 2);
    // Handle
    line(
      blocker[0] + blocker[1],
      blocker[2] + 0.8 * blocker[1],
      blocker[0] + blocker[1],
      blocker[2] + blocker[1]
    );
    arc(
      blocker[0] + blocker[1] + 0.1 * blocker[1],
      blocker[2] + blocker[1],
      0.2 * blocker[1],
      0.2 * blocker[1],
      0,
      PI
    );

    // Bro
    noStroke();
    fill(c);
    ellipse(
      blocker[0] + 0.75 * blocker[1],
      blocker[2] + 0.25 * blocker[1],
      0.25 * blocker[1],
      0.9 * blocker[1]
    );

    ellipse(
      blocker[0] + 0.9 * blocker[1],
      blocker[2] + 1.3 * blocker[1],
      1.25 * blocker[1],
      1.5 * blocker[1]
    );

    ellipse(
      blocker[0] + 1.3 * blocker[1],
      blocker[2] + 1.15 * blocker[1],
      0.8 * blocker[1],
      0.5 * blocker[1]
    );
    ellipse(
      blocker[0] + blocker[1],
      blocker[2] + 2 * blocker[1],
      2 * blocker[1],
      2 * blocker[1]
    );
  }
}

function draw() {
  clear();
  background("rgba(0,0,40,1)");
  strokeWeight(rainWidth);
  drawRain();
  drawPerson();
  updateRain();
  updateObjects();
}
