// init variables
let rectArray = [];
let newrect1 = [0,0,0,0];
let newrect2 = [0,0,0,0];
let color1 = 'rgba(255,150,0,0.8)';
let color2 = 'rgba(255,150,0,0.8)';
let rectIndex = 0;
let splitRatio = 0;
let finalSplitRatio = 0;
let splitVertically = true;
let animationFinished = true;
let frameCounter = 0


let offset = 5; //The line width separating two rectangles
let minArea = 100*offset*offset; // The minimum size of a rectangle that can be split
let maxTries = 40; //The number of tries before the program gives up finding a new rectangle to split
let epsilon = 0.001; //An epsilon to make sure that if the sine of the drawspeed does not quite match the animation is still stopped
let maxColorDelta = 40; //The maximum one of the rbg values can change in the positive or negative direction

// Animation speed
let framesPerAnimation = 30; //number of frames to complete one animation (the framerate should always be divisible by this number due to how the speed function works)
let animationSpeedUp = 10; //number to decrease the frames per animation with (take care to make sure the assumption above holds)
let speedUpDuration = 20 //Number of animation completed before the next speedup happens


function setup() {
    let canvasDiv = document.getElementById('scriptDiv');
    let canvasX = canvasDiv.offsetWidth;
    let canvasY = window.innerHeight*0.8;
    let sketchCanvas = createCanvas(canvasX,canvasY);
    sketchCanvas.parent("scriptDiv");

    frameRate(60);
    background('rgba(255,150,0,0.5)');
    noStroke();
    
    fill('rgba(255,150,0,0.8)');
    rectArray.push([0,0,canvasX,canvasY,'rgba(255,150,0,0.8)'])
    rect(rectArray[0][0], rectArray[0][1], rectArray[0][2], rectArray[0][3]);
}

function drawSpeed(x){
    return Math.sin(x/framesPerAnimation)**2
}

function splitStringAt(input, index) {
    let first = input.substring(0, index+1);
    let second = input.substring(index+1)
    return [first, second]
}

function changeColor(originalColor){
    let indexArray = ["(", ",",",",",",")"];
    let newColor = []
    let temp;
    for (const index of indexArray){
        [temp, originalColor] = splitStringAt(originalColor, originalColor.indexOf(index));
        newColor.push(temp);
    }
    let rgbIndex = Math.floor(Math.random()*3+1);
    let orignalValue = Number(newColor[rgbIndex].substring(0,newColor[rgbIndex].indexOf(",")));
    let colorDelta = Math.floor((Math.random()-0.5)*2*maxColorDelta);
    if (orignalValue + colorDelta < 0 || orignalValue + colorDelta > 255) {
        // If the new value would go out of range 0, 255 flip the change direction
        colorDelta *= -1;
    }

    // Apply the change
    newColor[rgbIndex] = (orignalValue+colorDelta).toString()+","
    return newColor.join("");
}

function splitrectVert(startrect, splitRatio){
    let newrect1 = [startrect[0], startrect[1], startrect[2]*splitRatio, startrect[3]];
    let newrect2 = [startrect[0]+startrect[2]*splitRatio+offset, startrect[1], startrect[2]*(1-splitRatio)-offset, startrect[3]];
    return [newrect1, newrect2];
}

function splitrectHor(startrect, splitRatio){
    let newrect1 = [startrect[0], startrect[1], startrect[2], startrect[3]*splitRatio];
    let newrect2 = [startrect[0], startrect[1]+startrect[3]*splitRatio+offset, startrect[2], startrect[3]*(1-splitRatio)-offset];
    return [newrect1, newrect2];
}

function draw() {
    clear();
    background('rgba(255,200,0,0.5)');
    noStroke();

    // if the animation is finsished a new rect will be selected
    if (animationFinished){
        // Select random rect in the array but must of minimum size
        let area = 0;
        let numberOfTries = 0;
        while (area < minArea){
            rectIndex = Math.floor(Math.random() * rectArray.length);
            area = rectArray[rectIndex][2] * rectArray[rectIndex][3];
            numberOfTries += 1;
            if (numberOfTries >= maxTries){
                frameRate(0);
                console.log("Animation finished");
                break;
            }
        }
        splitVertically = rectArray[rectIndex][2] > rectArray[rectIndex][3];
        finalSplitRatio = 0.2+Math.random()*0.6;
        
        // Only change the color of the "incoming" rectangle
        if (finalSplitRatio<0.5) {
            color1 = changeColor(rectArray[rectIndex][4]);
            color2 = rectArray[rectIndex][4];
        } else {
            color1 = rectArray[rectIndex][4];
            color2 = changeColor(rectArray[rectIndex][4]);

        }
        
    }
 
    if (finalSplitRatio<0.5) {
        splitRatio = finalSplitRatio*drawSpeed(frameCounter);
    } else {
        splitRatio = 1-(1-finalSplitRatio)*drawSpeed(frameCounter);
    }
    if ((finalSplitRatio<0.5 && splitRatio <= finalSplitRatio-epsilon) || (finalSplitRatio>=0.5 && splitRatio >= finalSplitRatio+epsilon)) {
        // animate the two new rects
        if (splitVertically){
            [newrect1, newrect2] = splitrectVert(rectArray[rectIndex], splitRatio)
        } else {
            [newrect1, newrect2] = splitrectHor(rectArray[rectIndex], splitRatio)
        }
        fill(color1);
        rect(newrect1[0], newrect1[1], newrect1[2], newrect1[3]);
        fill(color2);
        rect(newrect2[0], newrect2[1], newrect2[2], newrect2[3]);
        animationFinished = false;
    } else {
        // When the animation is finished add the two rect to the array
        animationFinished = true;
        newrect1.push(color1);
        newrect2.push(color2);
        rectArray.splice(rectIndex, 1, newrect1, newrect2)
    }
    
    // Draw all rectangles except the two new ones
    for(let i=0;i<rectArray.length;i++) {
        if (!(!animationFinished && i==rectIndex)){
            fill(rectArray[i][4]);
            rect(rectArray[i][0], rectArray[i][1], rectArray[i][2], rectArray[i][3]);
        }
    }
    
    frameCounter += 1
    if (animationFinished){
        if (rectArray.length % speedUpDuration == 0) {
            if (framesPerAnimation > 10) {
                framesPerAnimation -= animationSpeedUp;
            }
        }
        frameCounter = 0;
    }
}

