/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = __webpack_require__(5);
var Util = __webpack_require__(6);
var UserCircle = __webpack_require__(7);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.circles = [];
    this.start = false;
    this.userCircles = [new UserCircle({ game: this })];
    this.addCircles();

    this.score = 0;
  }

  _createClass(Game, [{
    key: 'addCircles',
    value: function addCircles() {

      for (var i = 1; i <= Game.NUM_CIRCLES; i++) {
        this.circles.push(new Circle({ pos: this.randomPosition(), game: this, vel: Util.randomVec(0.1) }));
      }
    }
  }, {
    key: 'randomPosition',
    value: function randomPosition() {
      var x = Game.DIM_X * Math.random();
      var y = Game.DIM_Y * Math.random();
      return [x, y];
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      return [].concat(this.circles, this.userCircles);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      var allObjects = this.allObjects();
      allObjects.forEach(function (el) {
        el.draw(ctx);
      });
      this.drawScore(ctx);
    }
  }, {
    key: 'drawScore',
    value: function drawScore(ctx) {
      ctx.font = "20px Impact";
      ctx.fillStyle = "rgb(17, 17, 17)";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + this.score, 1200, 0);
    }
  }, {
    key: 'step',
    value: function step(delta) {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects(timeDelta) {
      var allObjects = this.allObjects();
      allObjects.forEach(function (el) {
        el.move(timeDelta);
      });
    }
  }, {
    key: 'remove',
    value: function remove(object) {
      if (object instanceof Circle) {
        this.circles.splice(this.circles.indexOf(object), 1);
      } else if (object instanceof UserCircle) {
        this.userCircles.splice(this.userCircles.indexOf(object), 1);
      }
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      var allObjects = this.allObjects();
      for (var i = 0; i < allObjects.length; i++) {
        for (var j = 0; j < allObjects.length; j++) {
          if (i === j) {
            continue;
          }

          if (allObjects[i].isCollidedWith(allObjects[j])) {
            var collision = allObjects[i].collideWith(allObjects[j]);
            if (this.userCircles.includes(allObjects[i]) || this.userCircles.includes(allObjects[j])) {
              this.score += 100;
            }
            if (collision) return;
          }
        }
      }
    }
  }, {
    key: 'wrap',
    value: function wrap(pos) {
      if (pos[0] > Game.DIM_X + 15) {
        pos[0] = 0;
      } else if (pos[0] < -15) {
        pos[0] = Game.DIM_X;
      }

      if (pos[1] > Game.DIM_Y + 15) {
        pos[1] = 0;
      } else if (pos[1] < -15) {
        pos[1] = Game.DIM_Y;
      }

      return pos;
    }
  }]);

  return Game;
}();

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_CIRCLES = 200;

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = __webpack_require__(0);

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  _createClass(MovingObject, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(Math.floor(this.pos[0]), Math.floor(this.pos[1]), this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }, {
    key: 'move',
    value: function move() {
      var timeDelta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      var offsetX = this.vel[0] * velocityScale;
      var offsetY = this.vel[1] * velocityScale;
      this.pos = this.game.wrap([this.pos[0] + offsetX, this.pos[1] + offsetY]);
    }
  }, {
    key: 'collideWith',
    value: function collideWith(otherObject) {
      var smallCircle = this.radius >= otherObject.radius ? otherObject : this;
      var bigCircle = this.radius >= otherObject.radius ? this : otherObject;

      this.game.remove(smallCircle);
      bigCircle.vel = [bigCircle.vel[0] * .9, bigCircle.vel[1] * .9];
      bigCircle.radius = Math.sqrt(Math.pow(smallCircle.radius, 2) + Math.pow(bigCircle.radius, 2));

      return true;
    }
  }, {
    key: 'isCollidedWith',
    value: function isCollidedWith(otherObject) {
      var dist = Math.sqrt(Math.pow(otherObject.pos[1] - this.pos[1], 2) + Math.pow(otherObject.pos[0] - this.pos[0], 2));

      if (dist < this.radius + otherObject.radius) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return MovingObject;
}();

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserCircle = __webpack_require__(2);
var Camera = __webpack_require__(3);

var GLOBAL = {
  KEY_ESC: 27,
  KEY_ENTER: 13,
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_A: 65,
  KEY_W: 87,
  KEY_D: 68,
  KEY_S: 83,
  KEY_P: 80
};
var KEYS = {
  up: false,
  left: false,
  right: false,
  down: false,
  w: false,
  a: false,
  s: false,
  d: false,
  enter: false
};

window.onkeydown = function (e) {
  var keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_A) KEYS.a = true;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = true;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = true;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = true;
};

window.onkeypress = function (e) {
  var keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_ENTER) GameView.togglePause();
};

window.onkeyup = function (e) {
  var keyPress = e.keyCode;
  e.preventDefault();

  if (keyPress === GLOBAL.KEY_A) KEYS.a = false;
  if (keyPress === GLOBAL.KEY_S) KEYS.s = false;
  if (keyPress === GLOBAL.KEY_W) KEYS.w = false;
  if (keyPress === GLOBAL.KEY_D) KEYS.d = false;
};

var GameView = function () {
  function GameView(game, ctx, camera) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.score = 0;
    this.paused = false;

    this.camera = camera;
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'animate',
    value: function animate(time) {
      var delta = time - this.lastTime;

      this.handleInput();
      // this.camera.update();
      // this.camera.follow(this.game.userCircles[0], 100, 100);
      this.game.step(delta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      if (this.game.circles.length === 0) {
        window.location.reload();
      }

      if (this.game.userCircles.length === 0) {
        window.location.reload();
      }

      if (KEYS.enter) {
        console.log(KEYS.enter);
      } else {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      if (!this.paused) {
        cancelAnimationFrame(this.animate.bind(this));
        console.log(this.paused);
        this.paused = true;
      } else {
        this.animate(time);
        this.paused = false;
      }
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {
      var userCircle = this.game.userCircles[0];
      userCircle.vel[0] *= .9;
      userCircle.vel[1] *= .9;
      if (KEYS.w) {
        userCircle.power([0, -.8]);
      }
      if (KEYS.s) {
        userCircle.power([0, .8]);
      }
      if (KEYS.a) {
        userCircle.power([-.8, 0]);
      }
      if (KEYS.d) {
        userCircle.power([.8, 0]);
      }
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = __webpack_require__(8);

var AXIS = {
  NONE: "none",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  BOTH: "both"
};

var Camera = function () {
  function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
    _classCallCheck(this, Camera);

    this.xView = xView || 0;
    this.yView = yView || 0;
    this.xDeadZone = 0;
    this.yDeadZone = 0;
    this.wView = canvasWidth;
    this.hView = canvasHeight;

    this.axis = AXIS.BOTH;
    this.followed = null;

    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  _createClass(Camera, [{
    key: "follow",
    value: function follow(gameObject, xDeadZone, yDeadZone) {
      this.followed = gameObject;
      this.xDeadZone = xDeadZone;
      this.yDeadZone = yDeadZone;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.followed != null) {
        if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {

          if (this.followed.x - this.xView + this.xDeadZone > this.wView) {
            this.xView = this.followed.x - (this.wView - this.xDeadZone);
          } else if (this.followed.x - this.xDeadZone < this.xView) {
            this.xView = this.followed.x - this.xDeadZone;
          }
        }

        if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
          if (this.followed.y - this.yView + this.yDeadZone > this.hView) {
            this.yView = this.followed.y - (this.hView - this.yDeadZone);
          } else if (this.followed.y - this.yDeadZone < this.yView) {
            this.yView = this.followed.y - this.yDeadZone;
          }
        }
      }

      this.viewportRect.set(this.xView, this.yView);

      if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left) {
          this.xView = this.worldRect.left;
        }
        if (this.viewportRect.top < this.worldRect.top) {
          this.yView = this.worldRect.top;
        }
        if (this.viewportRect.right > this.worldRect.right) {
          this.xView = this.worldRect.right - this.wView;
        }
        if (this.viewportRect.bottom > this.worldRect.bottom) {
          this.yView = this.worldRect.bottom - this.hView;
        }
      }
    }
  }]);

  return Camera;
}();

module.exports = Camera;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(0);
var GameView = __webpack_require__(2);
var Camera = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  var game = new Game();

  var camera = new Camera(0, 0, 100, 100, canvas.width, canvas.height);

  new GameView(game, ctx, camera).start();
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var randomColor = function randomColor() {
  return 'rgb(' + Math.floor(Math.random() * 255) + ',\n   ' + Math.floor(Math.random() * 255) + ',\n    ' + Math.floor(Math.random() * 255) + ')';
};

var randomRadius = function randomRadius() {
  return Math.floor(Math.random() * (15 - 3) + 3);
};

var Circle = function (_MovingObject) {
  _inherits(Circle, _MovingObject);

  function Circle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, options));

    _this.color = randomColor();
    _this.radius = randomRadius();
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(0.1);;

    return _this;
  }

  return Circle;
}(MovingObject);

module.exports = Circle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);

var randomColor = function randomColor() {
  return "rgb(" + Math.floor(Math.random() * 255) + ",\n   " + Math.floor(Math.random() * 255) + ",\n    " + Math.floor(Math.random() * 255) + ")";
};

var UserCircle = function (_MovingObject) {
  _inherits(UserCircle, _MovingObject);

  function UserCircle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserCircle);

    var _this = _possibleConstructorReturn(this, (UserCircle.__proto__ || Object.getPrototypeOf(UserCircle)).call(this, options));

    _this.color = randomColor();
    _this.radius = UserCircle.RADIUS;
    _this.pos = [window.innerWidth / 2, window.innerHeight / 2];
    _this.vel = [0, 0];

    return _this;
  }

  _createClass(UserCircle, [{
    key: "power",
    value: function power(move) {
      this.vel[0] += move[0];
      this.vel[1] += move[1];
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(Math.floor(this.pos[0]), Math.floor(this.pos[1]), this.radius, 0, 2 * Math.PI, false);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = this.radius * .7 + "px Arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("Player 1", this.pos[0], this.pos[1]);
    }
  }]);

  return UserCircle;
}(MovingObject);

UserCircle.RADIUS = 10;

module.exports = UserCircle;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle(left, top, width, height) {
    _classCallCheck(this, Rectangle);

    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  _createClass(Rectangle, [{
    key: "set",
    value: function set(left, top, width, height) {
      this.left = top;
      this.width = width || this.width;
      this.height = height || this.height;
      this.right = this.left + this.width;
      this.bottom = this.top + this.height;
    }
  }, {
    key: "within",
    value: function within(r) {
      return r.left <= this.left && r.top <= this.top && r.right >= this.right && r.bottom >= this.bottom;
    }
  }, {
    key: "overlaps",
    value: function overlaps(r) {
      return this.left < r.right && r.left < this.right && r.bottom > this.top && r.top < this.bottom;
    }
  }]);

  return Rectangle;
}();

module.exports = Rectangle;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map