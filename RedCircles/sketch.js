let nCircles = 100;
let canvasX = 1400;
let canvasY = 600;
let radius;
let randomNumber;
function setup() {
    createCanvas(canvasX, canvasY);
    frameRate(30);
}

function draw() {
    for (let i=0; i < nCircles; i++){
        randomNumber =  Math.random()
        if (i%4!=0) {
            randomNumber /= 2;
        }
        radius = randomNumber*50+10;
        c = color(255*(1-randomNumber), 0, 0);
        fill(c);
        ellipse(Math.random()*canvasX, Math.random()*canvasY, radius, radius);
        }
}