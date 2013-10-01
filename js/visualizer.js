var CenterIcon = (function() {
   var radius;
   var xPos;
   var yPos;

   function CenterIcon(x, y, rad) {
      xPos = x;
      yPos = y;
      radius = rad;
   }

   CenterIcon.prototype.draw = function() {
      context.beginPath();
      context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
   }

   CenterIcon.prototype.getRadius = function() {
        return radius;
   };

   return CenterIcon;
})();

var VisualizerDot = (function() {
   var radius;
   var xPos; var yPos; var color;
   var minXPos; var minYPos;

   function VisualizerDot(x, y, c) {
      xPos = x; yPos = y; 
      color = c; radius = 5;
   }

   VisualizerDot.prototype.setMinX = function(x) {
      minXPos = x;
   }

   VisualizerDot.prototype.setMinY = function(y) {
      minYPos = y;
   }

   VisualizerDot.prototype.updateX = function() {
      xPos = xPos + 1;
   }

   VisualizerDot.prototype.updateY = function() {
      yPos = yPos + 1;
   }

   VisualizerDot.prototype.draw = function() {
      context.beginPath();
      this.updateX(); this.updateY();
      context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
   }

   return VisualizerDot;
})();

function initializeDotsAboutRadius(radius, offset, dots) {
   for(var i = 1; i <= 45; i++) {
      angle = 2 * Math.PI * i/45;
      dots.push(new VisualizerDot(Math.cos(angle) * (radius + offset + 5) + centerX, Math.sin(angle) * (radius + offset + 5) + centerY, "#FFFFFF"));
      dots[i-1].setMinX(Math.cos(angle) * (radius + 5) + centerX);
      dots[i-1].setMinY(Math.sin(angle) * (radius + 5) + centerX);
      dots[i-1].draw(context);
   }
}

function draw() {

}

var canvas = document.getElementById("visualizer");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

var artist = new CenterIcon(centerX, centerY, radius);
artist.draw(context);

var dots = new Array();
initializeDotsAboutRadius(radius, 70, dots);

setInterval(draw,10);

