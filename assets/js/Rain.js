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
let windowFrame = {
  "xMin": 0,
  "xMax": 0,
  "yMin": 0,
  "yMax": 0,
};

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  frameRate(60);
  rainColor1 = color("rgba(150,0,250,0.25)");
  rainColor2 = color("rgba(150,100,250,0.1)");
  background(20);
  windowFrame = {
    "xMin": 0.1*canvasX,
    "xMax": 0.9*canvasX,
    "yMin": 0,
    "yMax": 0.8*canvasY,
  };
  for (let i = 0; i < canvasX * rainDensity; i++) {
    for (let j = 0; j < canvasY * rainDensity; j++) {
      rain.push({
        "x": windowFrame.xMin+Math.random() * (windowFrame.xMax-windowFrame.xMin),
        "y": Math.random() * windowFrame.yMax,
        "length": rainBaseLength * (Math.random() - 0.5) * 1.5
    }); 
    }
  }


}

function drawRain() {
  strokeWeight(rainWidth);
  for (let i = 0; i < rain.length; i++) {
    stroke(rainColor1);
    for (const blocker of blockers) {
      if (rain[i].x > blocker.x && rain[i].x < blocker.x + 2 * blocker.radius) {
        if (
          rain[i].y + rain[i].length >
          -0.5 *
            Math.sqrt(
              blocker.radius ** 2 - (rain[i].x - blocker.x - blocker.radius) ** 2
            ) +
            blocker.y
        ) {
          stroke(rainColor2);
        }
      }
    }

    line(rain[i].x, rain[i].y, rain[i].x, rain[i].y + rain[i].length);
  }
}

function updateRain() {
  for (let i = 0; i < rain.length; i++) {
    rain[i].y += rain[i].length * 0.1 + fallDistance;
    if (rain[i].y > windowFrame.yMax) {
      rain[i].x = windowFrame.xMin+Math.random() * (windowFrame.xMax-windowFrame.xMin);
      rain[i].y = 0;
    }
  }
}

function updateObjects() {
  if (blockers.length < 1) {
    let radius = Math.random() * 50 + 75;
    let speed = 1 + Math.random() * 2;
    if (Math.random() < 100000 / (60 * 3)) {
      blockers.push({
        "x": -2 * radius, 
        "radius": radius,
        "y": 0,
        "speed": speed,
        "walkHeight": canvasY - 3 * radius
      });

      //small
      if (Math.random() < 0.3) {
        let smallRadius = Math.random() * 20 + 50;
        blockers.push({
          "x": -4 * smallRadius - 2 * radius,
          "radius": smallRadius,
          "y": 0,
          "speed": speed,
          "walkHeight": canvasY - 3 * smallRadius,
        });
      }
    }
  }

  // Update the location
  for (const blocker of blockers) {
  blocker.x += blocker.speed;
  blocker.y =
    0.5 *
    blocker.radius * (Math.abs(Math.cos((blocker.x * Math.PI) / (canvasX / ((10 * 75) / blocker.radius)))) - 1) + blocker.walkHeight;
  }

  // Remove any that are out of frame
  blockers = blockers.filter((blocker) => blocker.x < canvasX);
}

function drawPerson() {
  for (const blocker of blockers) {
    let c = color("rgb(0,0,30)");
    noStroke();
    fill(c);
    // Umbrella top
    arc(
      blocker.x + blocker.radius,
      blocker.y,
      2 * blocker.radius,
      0.5 * 2 * blocker.radius,
      PI,
      0
    );

    stroke(c);
    // Connection rod
    line(
      blocker.x + blocker.radius,
      blocker.y,
      blocker.x + blocker.radius,
      blocker.y + blocker.radius
    );

    noFill();
    strokeWeight(rainWidth * 2);
    // Handle
    line(
      blocker.x + blocker.radius,
      blocker.y + 0.8 * blocker.radius,
      blocker.x + blocker.radius,
      blocker.y + blocker.radius
    );
    arc(
      blocker.x + blocker.radius + 0.1 * blocker.radius,
      blocker.y + blocker.radius,
      0.2 * blocker.radius,
      0.2 * blocker.radius,
      0,
      PI
    );

    // Bro
    noStroke();
    fill(c);
    ellipse(
      blocker.x + 0.75 * blocker.radius,
      blocker.y + 0.25 * blocker.radius,
      0.25 * blocker.radius,
      0.9 * blocker.radius
    );

    ellipse(
      blocker.x + 0.9 * blocker.radius,
      blocker.y + 1.3 * blocker.radius,
      1.25 * blocker.radius,
      1.5 * blocker.radius
    );

    ellipse(
      blocker.x + 1.3 * blocker.radius,
      blocker.y + 1.15 * blocker.radius,
      0.8 * blocker.radius,
      0.5 * blocker.radius
    );
    ellipse(
      blocker.x + blocker.radius,
      blocker.y + 2 * blocker.radius,
      2 * blocker.radius,
      2 * blocker.radius
    );
  }
}

function drawWindow(){
  //walls
  fill("rgba(10,0,40,1)");
  rect(0,0,windowFrame.xMin,canvasY);
  rect(0,windowFrame.yMax,canvasY,canvasY-windowFrame.yMax);
  rect(windowFrame.xMax,0,windowFrame.xMin,canvasY);

  let width = 8*rainWidth
  noStroke();
  fill("rgba(10,0,20,1)");
  // Frame
  // left
  rect(windowFrame.xMin, windowFrame.yMin, width, windowFrame.yMax+width);
  // right
  rect(windowFrame.xMax, windowFrame.yMin, width, windowFrame.yMax+width);
  // bottom
  rect(windowFrame.xMin, windowFrame.yMax, windowFrame.xMax-windowFrame.xMin+width, width);
  
  // Panels
  // center line
  width = 2*rainWidth;
  let nPanels = 3;
  for (let i=1;i<nPanels;++i){
    rect(windowFrame.xMin+windowFrame.xMax/nPanels*i-4*width, windowFrame.yMin, width, windowFrame.yMax);
  }
  // horizontal lines
  nPanels = 3;
  for (let i=2;i<nPanels;++i){
    rect(windowFrame.xMin, windowFrame.yMax - windowFrame.yMax/(nPanels)*(i), windowFrame.xMax-windowFrame.xMin+width, width);
  }
}

function drawLights(){
  drawLamp(canvasX*0.2,windowFrame.yMax*0.1, 0)
  drawLamp(canvasX*0.8,windowFrame.yMax*0.1, 10000);
}

function drawLamp(x,y, flickerOffset){
  noStroke();
  fill("rgba(255,200,60,"+(0.8+0.05*noise(0.01*frameCount+flickerOffset))+")");
  let width = 50;
  let height = 100;
  rect(x-0.25*width, y, width, height);
  for (let i=1;i<10;++i){
    fill("rgba(255,200,60,"+(0.02+0.05*noise(0.01*frameCount+flickerOffset))+")");
    circle(x+0.25*width,y+width, 3*width+5*i**2);
  }
  stroke(0);
  line(x-0.25*width, y+0.3*height, x+0.75*width, y+0.3*height);
  line(x-0.25*width, y+0.2*height, x+0.75*width, y+0.2*height);
  line(x-0.25*width, y+0.1*height, x+0.75*width, y+0.1*height);
  line(x-0.25*width, y, x+0.75*width, y);
  line(x+0.25*width,y,x+0.25*width,0);
}
function draw() {
  clear();
  background("rgba(0,0,40,1)");
  
  drawRain();
  drawPerson();
  drawWindow();
  drawLights();
  updateRain();
  updateObjects();
}
