let nCircles = 10;
let canvasX = 600;
let canvasY = 600;
let radius = 10;

const startRadius = 300;
let posX = Math.random()*canvasX;
let posY = Math.random()*canvasY;

const radialForce = 0;
const vertexForce = 15;
const springForce = 0.01;
const nNeighbours = 2;

let positions = [];
let positionsHalf = [];
const velocity = [];
let neighbours = [];

function setup() {
    createCanvas(canvasX, canvasY);
    frameRate(30);
    // Generate the initial positions
    // positions.push([300, 350],[300, 350],[300, 350],[300, 350])
    for (let i=0; i < nCircles; i++) {
        positions.push([(2*Math.random()-1)*startRadius+canvasX/2,(2*Math.random()-1)*startRadius+canvasY/2])
        velocity.push([0, 0])
        positionsHalf.push([0, 0])
    }

    // Move the center of mass to the origin
    updateCenterOfMass();

    // Generate the neighbours
    for (let i=0; i < nCircles;i++) {
        neighbours.push(i+1);
    }
    neighbours[nCircles-1] = 0
}

function draw() {
    clear();
    background(10);

    calculateVelocity();
    positionsHalf = Integrate(positions, velocity, 0.5);
    calculateVelocity();
    positions = Integrate(positionsHalf, velocity, 1);
    // Integrate

    
    updateCenterOfMass();

    // Draw elements
    for (let i = 0; i < nCircles; i++){
        drawingContext.shadowBlur = 40;
        drawingContext.shadowColor = color(200);
        ellipse(positions[i][0], positions[i][1], radius, radius);
        stroke(340);
        // line(positions[i][0], positions[i][1],  positions[(i+1)%nCircles][0],  positions[(i+1)%nCircles][1]);
    }

    let massX = 0;
    let massY = 0;
    for (let i=0; i < nCircles; i++) {
        massX += positions[i][0];
        massY += positions[i][1];
    }
    console.log(massX/nCircles, massY/nCircles)
}

function updateCenterOfMass() {
    let massX = 0;
    let massY = 0;
    for (let i=0; i < nCircles; i++) {
        massX += positions[i][0];
        massY += positions[i][1];
    }
    for (let i=0; i < nCircles; i++) {
        positions[i][0] -= massX/nCircles - canvasX/2;
        positions[i][1] -= massY/nCircles - canvasY/2;
    }
}

function calculateVelocity(){
    for (let i=0; i < nCircles;i++) {
        originDistance = Math.sqrt((positions[i][0]-0.5*canvasX)**2 + (positions[i][1]-0.5*canvasY)**2);
        velocity[i][0] = (positions[i][0]-0.5*canvasX)/originDistance * radialForce - (positions[i][1]-0.5*canvasX)/originDistance*vertexForce;
        velocity[i][1] = (positions[i][1]-0.5*canvasY)/originDistance * radialForce + (positions[i][0]-0.5*canvasY)/originDistance*vertexForce;

    }

    let diffX = 0;
    let diffY = 0;
    for (let i = 0; i < nCircles; i++){
        for (let n = 0; n < nNeighbours; n++){
            diffX = positions[i][0] - positions[(i+1)%nCircles][0];
            diffY = positions[i][1] - positions[(i+1)%nCircles][1];
            distance = Math.sqrt((diffX)**2 + (diffY)**2)
            if (distance > 0){
                velocity[i][0] -= diffX * springForce;
                velocity[i][1] -= diffY * springForce;
                velocity[(i+1)%nCircles][0] += diffX * springForce;
                velocity[(i+1)%nCircles][1] += diffY * springForce;
            }
        }
    }
}

function Integrate(pos, vel, h){
    posCopy = [...pos];
    for (let i=0; i < nCircles;i++) {
        posCopy[i][0] += h*vel[i][0]
        posCopy[i][1] += h*vel[i][1]
    }
    return posCopy;
}