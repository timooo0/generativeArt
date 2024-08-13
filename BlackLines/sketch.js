let canvasX = window.innerWidth;
let canvasY = window.innerHeight;


function setup() {
    createCanvas(canvasX, canvasY);
    let startPos = [0.5*canvasX, 0.5*canvasY]
    let currentPos = [0.5*canvasX, 0.5*canvasY]
    let currentAngle = 0
    let size = 100
    while (startPos[0] != currentPos[0] && startPos[0] != currentPos[0] || (currentPos[0] < 0 || currentPos[1] < 0 || currentPos[0] > canvasX || currentPos[1] > canvasY)) {
        if (Math.random() > 0.5) {
            drawQuarter(0.5*canvasX, 0.5*canvasY, 100, currentAngle, currentAngle + Math.PI*0.5)
            currentAngle += Math.Pi*0.5
            switch (currentAngle){
                case 0:
                    currentPos[0] -= 0.5*size
                    currentPos[1] += 0.5*size
                break;
                
                case Math.Pi*0.5:
                    currentPos[0] -= 0.5*size
                    currentPos[1] -= 0.5*size
                break;
                
                case Math.Pi:
                    currentPos[0] += 0.5*size
                    currentPos[1] -= 0.5*size
                break;
                
                case Math.PI*1.5:
                    currentPos[0] += 0.5*size
                    currentPos[1] += 0.5*size
                break;
            }
        } else {
            drawQuarter(0.5*canvasX, 0.5*canvasY, 100, currentAngle, currentAngle - Math.PI*0.5)
            currentAngle -= Math.Pi*0.5
        }
        currentAngle = currentAngle%(2*Math.PI)
    }

}

function drawQuarter(posX, posY, size, start, stop) {
    for (let i = size; i>0;i-=20){
        strokeWeight(5)
        arc(posX, posY, i, i, start, stop)
    }
}
