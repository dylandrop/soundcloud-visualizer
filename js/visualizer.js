var CenterIcon = (function() {
   var radius;
   var xPos;
   var yPos;

   function CenterIcon(x, y, rad) {
      xPos = x;
      yPos = y;
      radius = rad;
   }

   CenterIcon.prototype.draw = function(context) {
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
      minXPos = xPos = x; minYPos = yPos = y; 
      color = c; radius = 5;
   }

   VisualizerDot.prototype.draw = function(context) {
      context.beginPath();
      context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
   }

   return VisualizerDot;
})();

function initializeDotsAboutRadius(radius, dots) {

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
for(var i = 1; i <= 45; i++) {
   angle = 2 * Math.PI * i/45;
   dots.push(new VisualizerDot(Math.cos(angle) * (radius + 5) + centerX, Math.sin(angle) * (radius + 5) + centerY, "#FFFFFF"));
   dots[i-1].draw(context);
}


