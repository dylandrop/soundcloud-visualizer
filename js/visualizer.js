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

   function VisualizerDot(x, y, c, rad) {
      this.xPos = x; this.yPos = y; 
      this.color = c; this.radius = rad;
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
         this.vel = -1 * this.vel * ((13-this.radius) / 10);//bouncefactor
      }
   }

   VisualizerDot.prototype.setImpulse = function(size) {
      this.vel += size;
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

// See http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initializeDotsAboutRadius(radius, offset, dots) {
   var numDots = 85;
   var possibleColors = new Array("#E6E6E6", "#EEEEEE", "#aaaaaa", "#F6F6F6")
   for(var i = 1; i <= numDots; i++) {
      angle = 2 * Math.PI * i/numDots;
      var rad = getRandomInt(5, 8);
      dots.push(new VisualizerDot(Math.cos(angle) * (radius + offset + rad) + centerX, Math.sin(angle) * (radius + offset + rad) + centerY, possibleColors[rad-5], rad));
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

function determineIfBounceOccurred() {
   var freqByteData = new Uint8Array(analyser.frequencyBinCount);
   analyser.getByteFrequencyData(freqByteData);
   var sumOfLowFreqs = 0;
   for(var i = 150; i < 200; i++) {
      sumOfLowFreqs += freqByteData[i];
   }
   if(sumOfLowFreqs / 50 > 200) {
      console.log("IT'S HAPPENING!");
   }
}

function impulse() {
   size = 4;
   for(var i = 0; i < dots.length; i++) {
      dots[i].setImpulse(size);
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

//http://stackoverflow.com/questions/13455956/setup-web-audio-api-source-node-from-soundcloud
var ctx = new webkitAudioContext(),
    audio = new Audio(),
    source,
    url = 'http://api.soundcloud.com/tracks/111453161/stream' +
          '?client_id=9dbc638d0d3dc69a9500c85a6097e786';

audio.src = url;
source = ctx.createMediaElementSource(audio);
var analyser = ctx.createAnalyser();
source.connect(analyser);
analyser.connect(ctx.destination);
source.mediaElement.play();

setInterval(draw,1000/60);
setInterval(determineIfBounceOccurred, 10);
