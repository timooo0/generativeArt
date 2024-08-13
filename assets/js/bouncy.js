let nCircles = 75;
let canvasX = 1400;
let canvasY = 600;
let radius = 10;
let posX = Math.random()*canvasX;
let posY = Math.random()*canvasY;
let distance2;
let sortedArray;
const positions = [];
const velocity = [];
const neighbours = [];
function setup() {
    createCanvas(canvasX, canvasY);
    frameRate(30);
    for (let i=0; i< nCircles;i++) {
        positions.push([radius+Math.random()*(canvasX-2*radius), radius+Math.random()*(canvasY-2*radius)]);
        velocity.push([(Math.random()-0.5)*25, (Math.random()-0.5)*25]);
        neighbours.push([])

    }
}

function draw() {
    clear();
    background(10);
    for (let i=0; i < nCircles;i++) {
        neighbours[i] = []
    }
    for (let i=0; i < nCircles;i++) {
        for (let j=i; j < nCircles;j++) {
            if (i!=j) {
                // Radius around particle
                if ((positions[i][0]-positions[j][0])**2 + (positions[i][1]-positions[j][1])**2 < 10000){
                    if (!neighbours[i].includes(j)){
                        stroke(340);
                        line(positions[i][0],positions[i][1], positions[j][0], positions[j][1]);
                        neighbours[i].push(j);
                        neighbours[j].push(i);
                    }
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

        drawingContext.shadowBlur = 10+Math.min(neighbours[i].length, 10)*10;
        drawingContext.shadowColor = color(50+Math.min(neighbours[i].length, 5)*40);
        fill(50+Math.min(neighbours[i].length, 10)*20);
        noStroke();
        ellipse(positions[i][0], positions[i][1], radius, radius);
        positions[i][0] += velocity[i][0]/(1+2*Math.sqrt(neighbours[i].length));
        positions[i][1] += velocity[i][1]/(1+2*Math.sqrt(neighbours[i].length));
        if (positions[i][0] + radius > canvasX || positions[i][0] - radius < 0) {
            velocity[i][0] *= -1
        }
        if (positions[i][1] + radius > canvasY || positions[i][1] - radius < 0) {
            velocity[i][1] *= -1
        }
    }
}