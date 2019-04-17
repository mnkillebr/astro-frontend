//IMG repo
let imgRepo = new function() {
	this.background = new Image();
	this.background.src = "assets/bg.png";
}

function Drawable() {
	this.init = function(x, y) {
		this.x = x;
		this.y = y;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.draw = function() {
	};
}

function Background() {
	this.speed = 1;
	this.draw = function() {
		this.y += this.speed;
		this.context.drawImage(imgRepo.background, this.x, this.y);
		this.context.drawImage(imgRepo.background, this.x, this.y - this.canvasHeight);
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
Background.prototype = new Drawable();

function Game() {
	this.init = function() {
		// Get the canvas element
		this.bgCanvas = document.querySelector('canvas#background');
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			return true;
		} else {
			return false;
		}
	};
	this.start = function() {
		animate();
	};
}

function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

let game = new Game();
function init() {
	if(game.init())
		game.start();
}
