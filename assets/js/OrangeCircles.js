function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  let canvasX = canvasDiv.offsetWidth;
  let canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  let nInnerCircles = 15;
  let nWidth = 4;
  let nHeight = 5;
  let diameter = canvasX / (nWidth + 1);
  let nCircles = nWidth * nHeight;
  let offsetX = 0;
  let offsetY = 0;

  background("rgba(255,200,0,0.5)");

  for (let i = 0; i < nCircles; i++) {
    offsetX = 0;
    offsetY = 0;
    nInnerCircles = Math.floor(Math.random() * 25 + 5);
    for (let j = 0; j < nInnerCircles; j++) {
      let c = color(255, Math.random() * 255, 0);
      // offsetX += 2*(Math.random()-0.5)*10;
      // offsetY += 2*(Math.random()-0.5)*10;
      fill(c);
      noStroke();
      ellipse(
        ((canvasX + diameter) / (nWidth + 1)) * ((i % nWidth) + 1) +
          offsetX -
          0.5 * diameter,
        ((canvasY + diameter) / (nHeight + 1)) * (Math.floor(i / nWidth) + 1) +
          offsetY -
          0.5 * diameter,
        diameter - (diameter / nInnerCircles) * j
      );
      let angle = Math.random() * 2 * Math.PI;
      offsetX += (diameter / nInnerCircles / 2) * Math.cos(angle);
      offsetY += (diameter / nInnerCircles / 2) * Math.sin(angle);
    }
  }
}
