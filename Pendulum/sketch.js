let posX = 800;
let posY = 200;
let velX = 100;
let velY = 10;
let radius = 30;
function setup() {
  createCanvas(1400, 800)
}

function draw() {
  clear();
  ellipse(700, 200, radius, radius);
  
  let a1 = -1/((posX-700)/(posY-200));
  let a2 = velX/velY;
  let angle = Math.atan((a2-a1)/(1+a1*a2))
  velX = velX*Math.cos(angle) - velY*Math.sin(angle);
  velY = velX*Math.sin(angle) + velY*Math.cos(angle);
  posX += velX;
  posY += velY;
  ellipse(posX, posY, radius, radius);
  line(700, 200, posX, posY);
}