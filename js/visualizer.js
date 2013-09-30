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
   return CenterIcon;
})();

var VisualizerDot = (function() {
   var radius = 5;
   var color;
   var xPos; var yPos; var mass=2;

   function VisualizerDot(x,y,c) {
      xPos = x; yPos = y; color = c;
   }
})();

var canvas = document.getElementById("visualizer");
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

var artist = new CenterIcon(centerX, centerY, radius);
artist.draw(context);


