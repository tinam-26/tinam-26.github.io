/* var myHeading = document.querySelector('h1');
//sdocument.getElementById("demo").innerHTML = "Hello JavaScript!"
myHeading.textContent = 'Hello world!';

document.querySelector('h1').onclick = function () {
    alert('text clicked');
} */

var canvas = document.getElementById("testGameCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,30,50,60);
ctx.fillStyle = "#FF0090";
ctx.fill();
ctx.closePath();