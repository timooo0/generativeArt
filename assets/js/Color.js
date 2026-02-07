
let canvasX;
let canvasY;
function setup() {
  canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");
  noStroke();
  background("rgba(255, 192, 46, 0.9)");
  fill("rgba(247, 212, 131, 0.9)")
  let y_offset = -canvasY/4;
  for (let itr = 0; itr < 10; itr++) {
    const noise_offset = random(100); 
    beginShape()
    vertex(0,canvasY);
    vertex(0,y_offset);
    for (let x_idx = 0; x_idx <= canvasX+1; x_idx+=1) {
      vertex(x_idx, canvasY*noise(noise_offset*2+x_idx/canvasX)+y_offset+itr*10+canvasY*noise(noise_offset+4*x_idx/canvasX+x_idx%3));
    }
    vertex(canvasX,canvasY);
    vertex(0,canvasY);
    endShape(CLOSE);
  }

  fill("rgba(208, 164, 63, 0.9)");
  y_offset = canvasY/3;
  for (let itr = 0; itr < 1; itr++) {
    const noise_offset = random(100); 
    beginShape()
    vertex(0,canvasY);
    vertex(0,y_offset);
    for (let x_idx = 0; x_idx <= canvasX+1; x_idx+=1) {
      vertex(x_idx, canvasY*noise(noise_offset*2+x_idx/canvasX+x_idx%5)+y_offset+itr*10);
    }
    vertex(canvasX,canvasY);
    vertex(0,canvasY);
    endShape(CLOSE);
  }
  fill("rgba(255, 188, 46, 0.75)");
  noStroke();
  for (let idx = 0; idx < canvasX; idx+=2) {
    let xpos = idx
    let ypos = (canvasY*0.05+((xpos-canvasX/2)/150)**5)*random()
    circle(xpos, ypos, 50*random());
    circle(xpos, ypos+50*random(), 25*random());
    
  }
  for (let idx = 0; idx < 15; idx++) {
    drawBird(canvasX*random(), 0.15*canvasY+canvasY*0.15*random());
    
  }
}


function drawBird(center_x, center_y){
  stroke("rgba(67, 52, 21, 0.9)");
  const line_length = 40
  const offset = 1+random()-0.5;
  for (let idx = 1; idx < line_length; idx++) {
    strokeWeight(5-5*idx/line_length);
    line(center_x+idx-1, center_y+wing(idx-1, line_length), center_x+idx, center_y+wing(idx, line_length));
    line(center_x-0.5*offset*(idx-1), center_y+0.5*wing(idx-1, line_length), center_x-0.5*offset*idx, center_y+0.5*wing(idx, line_length));
    
  }
}

function wing(x, width){
  return -10*sin(x*2*PI/(3*width));
}