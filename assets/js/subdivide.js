let canvasX = window.innerWidth;
let canvasY = window.innerHeight;
let MAX_WIDTH = canvasX;
let nItems = 1;
let width = 0;
let xScale = 0.7
let yScale = 0.8
let frameCounter = 0;
let widthArray = [MAX_WIDTH, canvasX*xScale];
let heightArray = [canvasY]
let drawXorY = ["X"]

function setup() {
    createCanvas(canvasX, canvasY);
}

function drawSpeed(x){
    return Math.sin(x/30)**2
}
function draw() {
    clear();
    background('rgba(255,200,0,0.5)');
    noStroke();
    
    fill('rgba(255,150,0,0.8)');
    // if (drawXorY.length >2 && frameCounter >0){
    //     return;
    // }
    let xItr = 0;
    let yItr = 0;
    for (let i=1;i<drawXorY.length;i++){ 
        // console.log(drawXorY.length);
        if (drawXorY[i-1] == 'X'){
            console.log("bppm");
            ellipse((widthArray[xItr+1]+widthArray[xItr])/2, (heightArray[xItr])/2, widthArray[xItr]-widthArray[xItr+1], heightArray[xItr]);
            xItr++;
        }
        else if (drawXorY[i-1] == 'Y'){
            ellipse(widthArray[yItr+1]/2, (heightArray[yItr]+heightArray[yItr+1])/2, widthArray[yItr+1], heightArray[yItr]-heightArray[yItr+1]);
            yItr++;
        }
    }

    if (drawXorY[drawXorY.length-1] == 'X'){
        width = Math.min(widthArray[widthArray.length - 1]*drawSpeed(frameCounter), widthArray[widthArray.length - 1]);
        height = heightArray[heightArray.length - 1];
    }
    else if (drawXorY[drawXorY.length-1] == 'Y'){
        width = widthArray[widthArray.length - 1];
        height = Math.min(heightArray[heightArray.length - 1]*drawSpeed(frameCounter), heightArray[heightArray.length - 1]);
    }
    ellipse(width/2, height/2, width, height);
    if (drawXorY[drawXorY.length-1] == 'X'){
        ellipse((widthArray[widthArray.length - 2]+width)/2, height/2, widthArray[widthArray.length - 2]-width, height);
    }
    else if (drawXorY[drawXorY.length-1] == 'Y'){
        ellipse(width/2, (heightArray[heightArray.length-2]+height)/2, width, heightArray[heightArray.length-2]-height);
    }
    

    if (drawXorY[drawXorY.length-1] == 'X' && width >= widthArray[widthArray.length - 1]-6){
        heightArray.push(heightArray[heightArray.length - 1]*yScale);
        drawXorY.push("Y")
        frameCounter = -1
    }
    
    else if (drawXorY[drawXorY.length-1] == 'Y' && height >= heightArray[heightArray.length - 1]-6){
        widthArray.push(widthArray[widthArray.length - 1]*xScale);
        drawXorY.push("X")
        frameCounter = -1
    }
    // if (frameCounter % 100 == 0) {
    //     console.log("hi")
    //     widthArray.push(widthArray[widthArray.length - 1]/2);
    // }

    frameCounter += 1
}

