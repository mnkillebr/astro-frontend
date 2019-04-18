//IMG repo
let imgRepo = new function() {
  //images
	this.background = new Image();
  this.ship = new Image();
  this.lazer = new Image();
  let nImages = 3;
  let nLoad= 0;
  function imgLoad() {
    nLoad++
    if (nLoad === nImages) {
      window.init();
    }
  }
  this.background.onload = ()=>{imgLoad()};
  this.ship.onload = ()=>{imgLoad()};
  this.lazer.onload = ()=>{imgLoad()};
  //preset images
	this.background.src = "assets/bg.png";
  this.ship.src = "assets/libraSign.jpg";
  this.lazer.src = "assets/greenLazer.png";
}

//drawing background, ship
function Drawable() {
	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
    this.width = width;
    this.heigh = height;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.draw = function() {
	}
}

// drawing ship
// function Drawable() {
//   this.init = function(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.heigh = height;
//   }
// }

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
	this.init = ()=>{
		// Get the canvas element
		this.bgCanvas = document.querySelector('canvas#background');

		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');

			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			this.background = new Background();
			this.background.init(0,0);
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
  game.ship.move();
	game.ship.bulletPool.animate();
}

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
//lazer array function
function Pool(maxSize) {
	const size = maxSize; // Max bullets allowed in the pool
	let lazerPool = [];
	 // lazer array

	this.init = ()=> {
		for (let i = 0; i < size; i++) {
			let lazer = new Lazer();
			lazer.init(0,0, imgRepo.lazer.width,
			            imgRepo.lazer.height);
			lazerPool[i] = lazer;
		}
	};

	this.get = (x, y, speed)=> {
		if(!lazerPool[size - 1].alive) {
			lazerPool[size - 1].spawn(x, y, speed);
			lazerPool.unshift(lazerPool.pop());
		}
	};
	//second lazer
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
		if(!lazerPool[size - 1].alive &&
		   !lazerPool[size - 2].alive) {
				this.get(x1, y1, speed1);
				this.get(x2, y2, speed2);
			 }
	};

	this.animate = ()=> {
		for (let i = 0; i < size; i++) {
			if (lazerPool[i].alive) {
				if (lazerPool[i].draw()) {
					lazerPool[i].clear();
					lazerPool.push((lazerPool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}
//lazer function
function Lazer() {
	this.alive = false;

	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	this.draw = ()=> {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.y -= this.speed;
		if (this.y <= 0 - this.height) {
			return true;
		}
		else {
			this.context.drawImage(imgRepo.lazer, this.x, this.y);
		}
	};

	this.clear = ()=> {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
Lazer.prototype = new Drawable();

//ship function
function Ship() {
	this.speed = 3;
	this.bulletPool = new Pool(30);
	this.bulletPool.init();
	var fireRate = 15;
	var counter = 0;
	this.draw = ()=> {
		this.context.drawImage(imgRepo.ship, this.x, this.y);
	};
	this.move = ()=> {
		counter++;

		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up) {

			this.context.clearRect(this.x, this.y, this.width, this.height);

			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
			// Finish by redrawing the ship
			this.draw();
		}
		if (KEY_STATUS.space && counter >= fireRate) {
			this.fire();
			counter = 0;
		}
	};
	/*
	 * Fires two bullets
	 */
	this.fire = ()=>{
		this.bulletPool.getTwo(this.x+6, this.y, 3,
		                       this.x+33, this.y, 3);
	};
}
Ship.prototype = new Drawable();

KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[ KEY_CODES[ code ]] = false;
}

document.onkeydown = function(e) {

  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}

document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}

function Game() {

	this.init = ()=> {
		// Get the canvas elements
		this.bgCanvas = document.querySelector('canvas#background2');
		this.shipCanvas = document.querySelector('canvas#ship2');
		this.mainCanvas = document.querySelector('canvas#main2');
		// Test to see if canvas is supported. Only need to
		// check one canvas
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;
			Lazer.prototype.context = this.mainContext;
			Lazer.prototype.canvasWidth = this.mainCanvas.width;
			Lazer.prototype.canvasHeight = this.mainCanvas.height;
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			// Initialize the ship object
			this.ship = new Ship();
			// Set the ship to start near the bottom middle of the canvas
			var shipStartX = this.shipCanvas.width/2 - imgRepo.ship.width;
			var shipStartY = this.shipCanvas.height/4*3 + imgRepo.ship.height*2;
			this.ship.init(shipStartX, shipStartY, imgRepo.ship.width,
			               imgRepo.ship.height);
			return true;
		} else {
			return false;
		}
	};
	// Start the animation loop
	this.start = ()=> {
		this.ship.draw();
		animate();
	};
}

let game = new Game();
function init() {
	if(game.init())
		game.start();
}
