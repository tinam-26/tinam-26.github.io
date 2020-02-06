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
    API: 'wordbot',
    count: 1,
    width: appWidth,
    height: appHeight,
  }, wordSearch);
}

function drawBackground(){
  ctx.font = "30px Verdana";
  ctx.fillStyle = "#000000"
  ctx.textAlign = 'center';
  ctx.fillText("Is this word in War and Peace?", appWidth/2, 100);
  ctx.font = "20px Verdana";
  
}

function wordSearch(responseJson) {
  let { words } = responseJson;
  ctx.fillText("Word: " + words, appWidth/2, 150);
var text; 
  $(document).ready(function(){
    $.get("warandpeace.txt", function (returnedData) {
        $("#element").text(returnedData);
    }, "text/plain");

text = $("#element").text();
});

    ctx.fillText(text, appWidth/2, 200);
    for(var i = 0; i < text.length; i++) {
        if(text.get(i) == words) {
            ctx.fillText("word found", appWidth/2, 300);
            break;
        }
        if(i == text.length - 1) {
            ctx.fillText("words not found " + words, appWidth/2, 300);
        }
    }
  }

