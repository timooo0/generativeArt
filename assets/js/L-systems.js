function turtleDraw(sentence, turningAngle, drawLength, startX, startY){
    let stack = [{x: startX, y:startY, angle: Math.PI/2}];
    for(let char of sentence){
    switch (char){
      case "E": 
        line(stack[stack.length-1].x,stack[stack.length-1].y,stack[stack.length-1].x+drawLength*cos(stack[stack.length-1].angle), stack[stack.length-1].y-drawLength*sin(stack[stack.length-1].angle));
        break;
      case "F":
        line(stack[stack.length-1].x,stack[stack.length-1].y,stack[stack.length-1].x+drawLength*cos(stack[stack.length-1].angle), stack[stack.length-1].y-drawLength*sin(stack[stack.length-1].angle));
        stack[stack.length-1].x += drawLength*cos(stack[stack.length-1].angle);
        stack[stack.length-1].y -= drawLength*sin(stack[stack.length-1].angle);
        break;
      case "B":
        stack[stack.length-1].x -= drawLength*cos(stack[stack.length-1].angle);
        stack[stack.length-1].y += drawLength*sin(stack[stack.length-1].angle);
        break;
      case "[":
        stack.push({x: stack[stack.length-1].x,
                    y: stack[stack.length-1].y,
                    angle: stack[stack.length-1].angle})
        break;
      case "]":
        stack.pop();
        break;
      case "L":
        stack[stack.length-1].angle += turningAngle;
        break;
      case "R":
        stack[stack.length-1].angle -= turningAngle;
        break;
      default:
        // console.log("Error character not in drawing set", char)
    }
  }
}

function generateSentence(rules, axiom, iterations){
  let sentence = axiom;
  for (let i = 0; i < iterations; i++) {
    let nextSentence = "";
    for (let char of sentence) {
      if (char in rules) {
        nextSentence += rules[char];
      }
      else {
        nextSentence += char;
      }
    }
    sentence = nextSentence;
  }
  return sentence;
}


function createDrawing(isSetup=false){
  clear();
  background("rgba(255,200,0,0.5)");

  let axiom;
  let rules;
  let start_x;
  let start_y;

  switch(selected_mode.textContent){
    case "fractal tree":
      axiom = "E";
      rules = {
        "F": "FF",
        "E": "F[LE][LLE][RE][RRE]"
      };
      if (isSetup){
        angle_slider.value = Math.PI/6;
        iteration_slider.value = 6;
        line_length_slider.value = 10;
      }
      start_x = canvasX/2;
      start_y = canvasY*0.95;
    break;
    case 'Koch curve':
      axiom = "F";
      rules = {
        "F": "FLFRFRFLF"
      };
      if (isSetup){
        angle_slider.value = Math.PI/2;
        iteration_slider.value = 6;
        line_length_slider.value = 1;
      }
      start_x = canvasX*0.98;
      start_y = canvasY*0.98;
    break;
    case "Siepinski triangle":
      axiom = "FLGLG";
      rules = {
        "F": "FLGRFRGLF",
        "G":"GG"
      };
      if (isSetup){
        angle_slider.value = 2*Math.PI/3;
        iteration_slider.value = 8;
        line_length_slider.value = 3;
      }
      start_x = canvasX*0.9;
      start_y = canvasY-(canvasY-2**Number(iteration_slider.value)*Number(line_length_slider.value))/2;
    break;
    case "Siepinski arrowhead":
      axiom = "F";
      rules = {
        "F": "GLFLG",
        "G":"FRGRF"
      };
      if (isSetup){
        angle_slider.value = Math.PI/3;
        iteration_slider.value = 8;
        line_length_slider.value = 3;
      }
      start_x = canvasX*0.1;
      start_y = canvasY-(canvasY-2**Number(iteration_slider.value)*Number(line_length_slider.value))/2;
    break;
    case "Dragon curve":
      axiom = "F";
      rules = {
        "F": "FRG",
        "G":"FLG"
      };
      if (isSetup){
        angle_slider.value = Math.PI/2;
        iteration_slider.value = 15;
        line_length_slider.value = 3;
      }
      start_x = canvasX*0.75;
      start_y = canvasY*0.55;
    break;
    case 'Barnsley fern':
      axiom = "LX";
      rules = {
        "X": "FR[[X]LX]LF[LFX]RX",
        "F":"FF"
      };
      if (isSetup){
        angle_slider.value = Math.PI/10;
        iteration_slider.value = 7;
        line_length_slider.value = 3;
      }
      start_x = canvasX*0.9;
      start_y = canvasY*0.95;
    break;
    case "Mandela": //Repeating after 7 iterations??
      axiom = "F";
      rules = {
        "F":"FLFLL"
      };
      if (isSetup){
        angle_slider.value = Math.PI/10;
        iteration_slider.value = 7;
        line_length_slider.value = 60;
      }
      start_x = canvasX*0.5;
      start_y = canvasY*0.5;
    break;
    case "Timo curve":
      axiom = "[LE]E[RE]";
      rules = {
        "E":"F[LE][RE]B"
      };
      if (isSetup){
        angle_slider.value = Math.PI/5;
        iteration_slider.value = 8;
        line_length_slider.value = 50;
      }
      start_x = canvasX*0.5;
      start_y = canvasY*0.5;
    break;
    case "Lianne curve":
      axiom = "E";
      rules = {
        "F": "FF",
        "L": "LLLLLER",
        "E":"F[LE][E]"
      };
      if (isSetup){
        angle_slider.value = Math.PI/26;
        iteration_slider.value = 9;
        line_length_slider.value =1;
      }
      start_x = canvasX*0.5;
      start_y = canvasY*1;
    break;
    case "Martijn curve":
      axiom = "E";
      rules = {
        "E":"FF[LER]F[RRFERF]E"
      };
      if (isSetup){
        angle_slider.value = 0.322;
        iteration_slider.value = 9;
        line_length_slider.value =15.5;
      }
      start_x = canvasX*0.5;
      start_y = canvasY*0.7;
    break;



  }
  sentence = generateSentence(rules, axiom, Number(iteration_slider.value));
  sentence = sentence.replaceAll("G","F");
  turtleDraw(sentence, Number(angle_slider.value), Number(line_length_slider.value), start_x ,start_y);
  console.log(sentence);
}


function setSlider(element_id, slider, precision=0){
  let iteration_text = document.getElementById(element_id);
  if (precision == 0){
    iteration_text.textContent = Number(slider.value);
  } else {
    iteration_text.textContent = Number(slider.value).toPrecision(precision);
  }
  slider.addEventListener("input", (event) => {
    if (precision == 0){
    iteration_text.textContent = Number(event.target.value);
    } else {
      iteration_text.textContent = Number(event.target.value).toPrecision(precision);
    }
    createDrawing();
  });
}

let canvasX;
let canvasY;
let angle_slider;
let iteration_slider;
let line_length_slider;
let selected_mode;
function setup() {
  angle_slider = document.getElementById("slider-angle");
  iteration_slider = document.getElementById("slider-iterations");
  line_length_slider = document.getElementById("slider-line length");
  selected_mode = document.getElementById("mode-name");
  console.log(selected_mode.textContent);
  canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");


  angle_slider.min = 0;
  angle_slider.max = 2*Math.PI;
  iteration_slider.min = 0;
  iteration_slider.max = 20;
  iteration_slider.step = 1;
  line_length_slider.min = 0;
  line_length_slider.max = 20;
  line_length_slider.step = 0.1;
  background("rgba(255,200,0,0.5)");
  stroke("rgba(26, 23, 14, 1)");
  frameRate(1);

  createDrawing(true);

  setSlider("slider-text-angle", angle_slider, 3);
  setSlider("slider-text-iterations", iteration_slider);
  setSlider("slider-text-line length", line_length_slider,3);
  document.addEventListener('dropdown:change', (e) => {
    createDrawing(true);
  });
}