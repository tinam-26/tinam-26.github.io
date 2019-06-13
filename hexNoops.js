//how do javascript


let canvas;
let ctx;
let appWidth;
let appHeight;

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  //let speed = 300; // how often screen refreshes, in milliseconds.
  //let ticker = NOOPBOT_TICK_SETUP(draw, speed);
  
  //fire a draw event.
  draw();
  
  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
  
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#a6a6a6'});
}

function draw() {
  //get the data!
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBackground();
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: 7,
    width: appWidth,
    height: appHeight,
  }, avgColors);
}

function drawBackground(){
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#000000"
  ctx.textAlign = 'center';
  ctx.fillText("Hexbot: Averages", appWidth/2, 100);
  ctx.font = "20px Verdana";
  ctx.fillText("Averaged Color", appWidth/2, 200);
  ctx.fillText("Colors Averaged: ", appWidth/2, appHeight/2 + 100);
}
function avgColors(responseJson) {
  let { colors } = responseJson;
  var r = 1,g = 1,b = 1;
  var c;
  var rl,gl,bl; //red local, green local, blue local
  for(c in colors){
    
    //convert to rgb
    rl = hexToRgb(colors[c].value).r;
    gl = hexToRgb(colors[c].value).g;
    bl = hexToRgb(colors[c].value).b;
    //draws points that are averaged
    drawPoint(ctx, colors[c].value, appWidth/4 - (c*150) + 60, 200,rl,gl,bl);
    //average (square and then total)
    rl = rl * rl; gl = gl *gl; bl = bl * bl; 
    r = ((r + rl)); g = ((g + gl)); b = ((b + bl)); 
  }


  r = Math.sqrt(r/7); g = Math.sqrt(g/7); b = Math.sqrt(b/7);

  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  var avgHex = rgbToHex(r,g,b);
  console.log(avgHex);
  drawPoint(ctx,avgHex,0,-100,r,g,b);
  //finalColor = new Color(avgHex,r,g,b);
  }


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  
function drawPoint(ctx, hex, xPos, yPos,r,g,b) {
  ctx.fillStyle = hex;
  var pointSize = 60;
  ctx.beginPath();
  ctx.arc(window.innerWidth/2 + xPos, window.innerHeight/2 + yPos, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.font = "15px Veranda";
  ctx.fillStyle = "#000000"
  ctx.fillText('hex: ' + hex.toString(), window.innerWidth/2 + xPos + 30, window.innerHeight/2 + yPos + 60); 
  ctx.fillText("red: " + r.toString(), window.innerWidth/2 + xPos + 30, window.innerHeight/2 + yPos + 90);
  ctx.fillText(' green: ' + g.toString(), window.innerWidth/2 + xPos + 30, window.innerHeight/2 + yPos + 120);
  ctx.fillText(' blue: ' + b.toString(), window.innerWidth/2 + xPos + 30, window.innerHeight/2 + yPos + 150);
}


// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};


