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
   var radius = 5; var mass=2;
   var xPos; var yPos; var color;

   function VisualizerDot(x,y,c) {
      xPos = x; yPos = y; color = c;
   }

   VisualizerDot.prototype.draw = function(context) {
      context.beginPath();
      context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
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


