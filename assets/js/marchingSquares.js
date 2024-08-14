let res = 10;
let radius = 10;
const lookupTable = {
    0  : [[]],
    1  : [[0  , 0.5, 0.5, 0  ]],
    2  : [[0.5, 0  , 1  , 0.5]],
    3  : [[0  , 0.5, 1  , 0.5]],
    4  : [[0.5, 1  , 1  , 0.5]],
    5  : [[0  , 0.5, 0.5, 0  ], [0.5, 1  , 1  , 0.5]],
    6  : [[0.5, 0  , 0.5, 1  ]],
    7  : [[0  , 0.5, 0.5, 1  ]],
    8  : [[0  , 0.5, 0.5, 1  ]],
    9  : [[0.5, 0  , 0.5, 1  ]],
    10 : [[0  , 0.5, 0.5, 0  ], [0.5, 1  , 1  , 0.5]],
    11 : [[0.5, 1  , 1  , 0.5]],
    12 : [[0  , 0.5, 1  , 0.5]],
    13 : [[0.5, 0  , 1  , 0.5]],
    14 : [[0  , 0.5, 0.5, 0  ]],
    15 : [[]]
};


function setup() {
    let canvasDiv = document.getElementById('scriptDiv');
    let canvasX = canvasDiv.offsetWidth;
    let canvasY = window.innerHeight*0.8;
    let sketchCanvas = createCanvas(canvasX,canvasY);
    sketchCanvas.parent("scriptDiv");   
    
    let map = []
    for (let i=0; i <= canvasX; i+=res){
        let arr = [];
        for (let j=0; j <= canvasY; j+=res){
            arr.push(Math.random() < 0.5 ? 0 : 1);
        }
        map.push(arr);
    }
    
    for (let i=0; i < canvasX/res-1; i++){
        for (let j=0; j < canvasY/res-1; j++){       
            let number = map[i][j]*1 + map[i+1][j]*2 + map[i+1][j+1]*4 + map[i][j+1]*8;
            let line_data = lookupTable[number];
            console.log(number);
            console.log(line_data);
            console.log("?");
            line_data.forEach(function(data){
                console.log((i+data[0])*res,(j+data[1])*res,(i+data[2])*res,(j+data[3])*res)
                line((i+data[0])*res,(j+data[1])*res,(i+data[2])*res,(j+data[3])*res);
            });
            // c = color(255*map[i][j], 0, 0);
            // fill(c);
            // ellipse(i*res, j*res, radius, radius);
        }
    }
}
