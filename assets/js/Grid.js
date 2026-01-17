function lineSquigle(x1, y1, x2, y2) {
  let line_length = sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  if (x1 > x2) {
    line_length *= -1;
  }
  
  let angle = atan((y2 - y1) / (x2 - x1));
  const n_segments = 100;
  let offset = 0;
  const noise_start = random(5000);
  const noise_zero = noise(noise_start);
  
  for (let idx = 0; idx < n_segments; idx++) {
    const offset_previous = offset;
    offset = (noise(noise_start + idx / 300) - noise_zero) * line_length / 20;
    const stroke_weight = noise(noise_start + idx / 10) * 5;
    strokeWeight(stroke_weight);
    
    if (stroke_weight > 0.7) {
      const t0 = idx / n_segments;
      const t1 = (idx + 1) / n_segments;
      
      const xA = x1 + cos(angle) * line_length * t0 + sin(angle) * offset_previous;
      const yA = y1 + sin(angle) * line_length * t0 + cos(angle) * offset_previous;
      const xB = x1 + cos(angle) * line_length * t1 + sin(angle) * offset;
      const yB = y1 + sin(angle) * line_length * t1 + cos(angle) * offset;
      
      line(xA, yA, xB, yB);
    }
  }
}

function setup() {
  const n_nodes = 20;
  const canvasDiv = document.getElementById("scriptDiv");
  const canvasX = canvasDiv.offsetWidth;
  const canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");
  noStroke();
  background("rgba(242, 48, 0, 1)");
  fill("rgba(0, 0, 0, 0.85)")
  frameRate(15);
  for (let idx = 0; idx<n_nodes;idx++){
    let x = random()*canvasX;
    let y = random()*canvasY;
    let r = 2+random()**6*20;
    beginShape()
    const noise_start = random(2 * PI);
    for (let theta = 0; theta < 2 * PI; theta += 0.01 * PI) {
      const noise_offset = sin(theta) * (noise(noise_start + theta) - 0.5) * r * 2;
      vertex(x + cos(theta) * (r + noise_offset), y + sin(theta) * (r + noise_offset));
    }
    endShape(CLOSE);
  }
  stroke("rgba(0, 0, 0, 1)");
  fill("rgba(0, 0, 0, 1)")
  for (let offset = 0; offset < canvasX; offset+=20) {
    lineSquigle(0, offset, canvasX, offset);
    lineSquigle(offset, 0, offset, canvasY);
  }
}