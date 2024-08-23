let res = 10;
let heightDelta = 0.06;
let noiseGradient = 4.5e-3;

// prettier-ignore
const lookupTable = {
    0  : [[],[[0,0],[0,res],[res,res],[res,0]]], //
    1  : [[[0,0],[0.5*res,0],[0,0.5*res]],[[0.5*res,0],[res,0],[res,res],[0,res],[0,0.5*res]],],  //
    2  : [[[0.5*res,0],[res,0],[res,0.5*res]], [[0,0],[0.5*res,0],[res,0.5*res],[res,res],[0,res]]], //
    3  : [[[0,0],[res,0], [res,0.5*res],[0,0.5*res]], [[0,0.5*res],[res,0.5*res], [res,res],[0,res]]], //
    4  : [[[res,0.5*res],[res,res],[0.5*res,res]],[[0,0],[res,0],[res,0.5*res],[0.5*res,res],[0,res]]], //
    5  : [[[0,0],[0.5*res,0],[res,0.5*res],[res,res],[0.5*res,res],[0,0.5*res]],[[0.5*res,0],[res,0],[res,0.5*res]],[[0, 0.5*res],[0.5*res,res],[0,res]]],
    6  : [[[0.5*res,0],[res,0],[res,res],[0.5*res,res]], [[0,0],[0.5*res,0],[0.5*res,res],[0,res]]], //
    7  : [[[0,0],[res,0],[res,res],[0.5*res,res],[0,0.5*res]],[[0,0.5*res],[0.5*res,res],[0,res]]], //
    8  : [[[0,0.5*res],[0,0.5*res],[0.5*res,res],[0,res]], [[0,0],[res,0],[res,res],[0.5*res,res],[0,0.5*res]]], //
    9  : [[[0,0],[0.5*res,0],[0.5*res,res],[0,res]],[[0.5*res,0],[res,0],[res,res],[0.5*res,res]]], //
    10 : [[[0.5*res,0],[res,0],[res,0.5*res]],[[0,0],[0.5*res,0],[res,0.5*res],[res,res],[0.5*res,res],[0,0.5*res]], [[0, 0.5*res],[0.5*res,res],[0,res]]],
    11 : [[[0,0],[res,0],[res,0.5*res],[0.5*res,res],[0,res]],[[res,0.5*res],[res,res],[0.5*res,res]]], //
    12 : [[[0,0.5*res],[res,0.5*res], [res,res],[0,res]], [[0,0],[res,0], [res,0.5*res],[0,0.5*res]]], //
    13 : [[[0,0],[0.5*res,0],[res,0.5*res],[res,res],[0,res]], [[0.5*res,0],[res,0],[res,0.5*res]]], //
    14 : [[[0.5*res,0],[res,0],[res,res],[0,res],[0,0.5*res]],[[0,0],[0.5*res,0],[0,0.5*res]]],
    15 : [[[0,0],[0,res],[res,res],[res,0]], []] //
};

function setup() {
  let canvasDiv = document.getElementById("scriptDiv");
  let canvasX = Math.floor(canvasDiv.offsetWidth / res) * res;
  let canvasY = Math.floor(window.innerHeight * 0.8 / res) * res;
  let sketchCanvas = createCanvas(canvasX, canvasY);
  sketchCanvas.parent("scriptDiv");

  let heightMap = [];
  for (let i = 0; i <= canvasX; i += res) {
    let arr = [];
    for (let j = 0; j <= canvasY; j += res) {
      noiseDetail(5, 0.5);
      arr.push(noise(i * noiseGradient, j * noiseGradient));
    }
    heightMap.push(arr);
  }
  background(0, 0, 0);

  for (let height = heightDelta; height < 1; height += heightDelta) {
    console.log(heightMap[0][0]);
    let localHeightMap = heightMap.map((arr) =>
      arr.map((x) => (x > height ? 0 : 1))
    );
    for (let i = 0; i <= canvasX / res - 1; i++) {
      for (let j = 0; j <= canvasY / res - 1; j++) {
        let number =
          localHeightMap[i][j] * 1 +
          localHeightMap[i + 1][j] * 2 +
          localHeightMap[i + 1][j + 1] * 4 +
          localHeightMap[i][j + 1] * 8;
        let line_data = lookupTable[number];
        for (let colorIndex = 0; colorIndex < line_data.length; colorIndex++) {
          let c;
          if (!(colorIndex == 0 || (colorIndex == 2 && number == 10))) {
            if (height <= 0.5) {
              c = color(0, 100 * height, 255 * height);
            } else {
              c = color(0, 255 * height, 100 * (1 - height));
            }
            fill(c);
            noStroke();
            beginShape();
            for (
              let vertexIndex = 0;
              vertexIndex < line_data[colorIndex].length;
              vertexIndex++
            ) {
              vertex(
                line_data[colorIndex][vertexIndex][0] + i * res,
                line_data[colorIndex][vertexIndex][1] + j * res
              );
            }
            endShape(CLOSE);
          }
        }
      }
    }
  }
}
