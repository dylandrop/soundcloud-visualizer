var CenterIcon = (function() {

   function CenterIcon(x, y, rad) {
      this.xPos = x;
      this.yPos = y;
      this.radius = rad;
   }

   CenterIcon.prototype.draw = function() {
      context.beginPath();
      context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
   }

   CenterIcon.prototype.getRadius = function() {
        return this.radius;
   };

   return CenterIcon;
})();

var VisualizerDot = (function() {

   function VisualizerDot(x, y, c) {
      this.xPos = x; this.yPos = y; 
      this.color = c; this.radius = 5;
      this.vel = 3;
   }

   VisualizerDot.prototype.setAngle = function(theta) {
      this.angle = theta;
   }

   VisualizerDot.prototype.updateX = function() {
      this.xPos += this.vel * Math.cos(this.angle);
      this.vel -= 0.2; //gravity
   }

   VisualizerDot.prototype.updateY = function() {
      this.yPos += this.vel * Math.sin(this.angle);
   }

   VisualizerDot.prototype.bounceBack = function(otherObjX, otherObjY, otherObjRad) {
      if( Math.sqrt(Math.pow(otherObjY - this.yPos, 2) + Math.pow(otherObjX - this.xPos,2)) < (otherObjRad+this.radius)) {
         this.vel = -1 * this.vel * 0.8;//bouncefactor == 0.9
      }
   }

   VisualizerDot.prototype.draw = function() {
      context.beginPath();
      this.bounceBack(artist.xPos, artist.yPos, artist.radius);
      this.updateY(); this.updateX();
      context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
   }

   return VisualizerDot;
})();

function initializeDotsAboutRadius(radius, offset, dots) {
   var numDots = 45;
   for(var i = 1; i <= numDots; i++) {
      angle = 2 * Math.PI * i/numDots;
      dots.push(new VisualizerDot(Math.cos(angle) * (radius + offset + 5) + centerX, Math.sin(angle) * (radius + offset + 5) + centerY, "#FFFFFF"));
      dots[i-1].setAngle(angle);
      dots[i-1].draw();
   }
}

function draw() {
   context.clearRect(0,0,canvas.width,canvas.height);
   artist.draw();
   for(var i = 0; i < dots.length; i++) {
      dots[i].draw();
   }
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
initializeDotsAboutRadius(radius, 100, dots);

setInterval(draw,1000/60);

