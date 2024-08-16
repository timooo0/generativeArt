let nCircles;
let canvasX;
let canvasY;
let radius = 10;
let posX = Math.random()*canvasX;
let posY = Math.random()*canvasY;
let distance2;
let sortedArray;
let invNorm = -1;
const positions = [];
const velocity = [];
const neighbours = [];
function setup() {
    let canvasDiv = document.getElementById('scriptDiv');
    canvasX = canvasDiv.offsetWidth;
    canvasY = window.innerHeight*0.8;
    let sketchCanvas = createCanvas(canvasX,canvasY);
    sketchCanvas.parent("scriptDiv");
    nCircles = Math.floor(canvasX*canvasY/7000);
    console.log("nCircles", nCircles);
    frameRate(30);
    for (let i=0; i< nCircles;i++) {
        positions.push([radius+Math.random()*(canvasX-2*radius), radius+Math.random()*(canvasY-2*radius)]);
        velocity.push([(Math.random()-0.5)*25, (Math.random()-0.5)*25]);
        neighbours.push(0)

    }
}

function draw() {
    clear();
    background(10);
    for (let i=0; i < nCircles;i++) {
        neighbours[i] = 0
    }
    for (let i=0; i < nCircles;i++) {
        stroke(340);
        for (let j=i; j < nCircles;j++) {
            if (i!=j) {
                // Radius around particle
                if ((positions[i][0]-positions[j][0])**2 + (positions[i][1]-positions[j][1])**2 < 10000){
                    // if (!neighbours[i].includes(j)){
                        line(positions[i][0],positions[i][1], positions[j][0], positions[j][1]);
                        neighbours[i] += 1;
                        neighbours[j] += 1;
                    // }
                }
                        
                // n nearest neighbours
                // if (!neighbours[i].includes(j)){
                //     distance2 = (positions[i][0]-positions[j][0])**2 + (positions[i][1]-positions[j][1])**2
                //     neighbours[i].push([j, distance2]);
                //     neighbours[j].push([i, distance2]);
                // }
            }
        }
        // sortedArray = neighbours[i].sort(function(a,b){return a[1]-b[1]})
        // console.log(sortedArray[0][0])
        // for (let j=0; j < 3;j++) {
        //     if (sortedArray[j][0] >= i){
        //         stroke(340);
        //         line(positions[i][0],positions[i][1], positions[sortedArray[j][0]][0], positions[sortedArray[j][0]][1]);
        //     }
        // } 

        // drawingContext.shadowBlur = 10+Math.min(neighbours[i], 10)*10;
        // drawingContext.shadowBlur = 80;
        // drawingContext.shadowColor = color(250);
        // drawingContext.filter = 'blur(1px)'
        noFill();
        strokeWeight(1);
        let opacity = 1;
        let brightness = 50+Math.min(neighbours[i], 10)*20;
        for(let z = 0; z<(brightness-50)/20; z++){
            stroke('rgba('+brightness+','+brightness+','+brightness+', '+opacity + ')');
            ellipse(positions[i][0], positions[i][1], radius+2*(z+0), radius+2*(z+0));
            opacity /= 1.5;
        }
        strokeWeight(1.5);
        noStroke();
        fill(brightness);
        ellipse(positions[i][0], positions[i][1], radius, radius);


        invNorm = 1/(1+2*Math.sqrt(neighbours[i]))
        positions[i][0] += velocity[i][0]*invNorm;
        positions[i][1] += velocity[i][1]*invNorm;
        if (positions[i][0] + radius > canvasX || positions[i][0] - radius < 0) {
            velocity[i][0] *= -1
        }
        if (positions[i][1] + radius > canvasY || positions[i][1] - radius < 0) {
            velocity[i][1] *= -1
        }
    }
}