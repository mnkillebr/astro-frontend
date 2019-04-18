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

//drawing ship
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
	this.init = function() {
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

function Lazer() {
	this.alive = false; // Is true if the bullet is currently in use
	/*
	 * Sets the bullet values
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};
	/*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
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
	/*
	 * Resets the bullet values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
Lazer.prototype = new Drawable();

let game = new Game();
function init() {
	if(game.init())
		game.start();
}
