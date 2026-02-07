
let canvasX;
let canvasY;
let start = [];
let color_array = [];
let selected_colors = [];
let n_colors = 120;
let selected_mode;
let framecount_offset = 0;
function setup() {
  canvasDiv = document.getElementById("scriptDiv");
  canvasX = canvasDiv.offsetWidth;
  canvasY = window.innerHeight * 0.8;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");
  selected_mode = document.getElementById("mode-name");

  for (let idx = 0; idx < n_colors; idx++) {
    start.push(canvasX*(idx+1)/n_colors);
  }
  select_colors();
  document.addEventListener('dropdown:change', (e) => {
    clear();
    framecount_offset = frameCount;
    select_colors();
  });
}

function select_colors(){
  color_array = [];
    switch(selected_mode.textContent){
    case 'opal':
      color_array.push(`rgba(255, 222, 77, 0.05)`);
      color_array.push(`rgba(126, 255, 46, 0.05)`);
      color_array.push(`rgba(46, 255, 238, 0.05)`);
      color_array.push(`rgba(46, 255, 161, 0.05)`);
      color_array.push(`rgba(247, 67, 250, 0.05)`);
    break;
    case 'warm':
      color_array.push(`rgba(252, 171, 29, 0.05)`);
      color_array.push(`rgba(252, 197, 115, 0.05)`);
      color_array.push(`rgba(255, 90, 29, 0.05)`);
      color_array.push(`rgba(250, 76, 63, 0.05)`);
      color_array.push(`rgba(255, 16, 16, 0.05)`);
      break;
    case 'toxic':
      color_array.push(`rgba(252, 226, 29, 0.05)`);
      color_array.push(`rgba(198, 183, 67, 0.05)`);
      color_array.push(`rgba(139, 143, 39, 0.05)`);
      color_array.push(`rgba(90, 86, 24, 0.05)`);
      color_array.push(`rgba(54, 53, 14, 0.05)`);
      break;
    case 'soft':
      color_array.push(`rgba(255, 228, 106, 0.05)`);
      color_array.push(`rgba(252, 197, 115, 0.05)`);
      color_array.push(`rgba(250, 191, 154, 0.05)`);
      color_array.push(`rgba(254, 188, 176, 0.05)`);
      color_array.push(`rgba(253, 203, 203, 0.05)`);
    break;
  }
  selected_colors = [];
  for (let idx = 0; idx < n_colors; idx++) {
    let random_value = floor(random()*color_array.length);
    selected_colors.push(color_array[random_value]);
  }
}
function draw() {
  const base_color = "rgba(255, 217, 46, 1)";
  noStroke();
  blendMode(BLEND);
  let width = 0;
  let n_lines = 8;
  let maxWidth = canvasX;
  let time_counter = frameCount - framecount_offset
  if (time_counter-n_lines*n_colors<=canvasY){
    for (let color_idx = 0; color_idx < n_colors; color_idx++) {
      for (let idx = 0; idx < n_lines; idx++) {
        fill(selected_colors[color_idx]);
        start_change = 1.5*maxWidth*(0.5-noise((time_counter-idx*2)/100+color_idx*10000));
        width = 0.4*maxWidth*noise(3000)+(0.3-0.2*((1-idx/n_lines)))*maxWidth*noise((frameCount)/10+color_idx*10000);
            rect(start[color_idx]+start_change-0.5*width,
                  time_counter - color_idx*n_lines,
                  width,
                  1);
      }
    }
  }
}
