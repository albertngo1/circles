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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = __webpack_require__(2);
var Util = __webpack_require__(4);
var UserCircle = __webpack_require__(7);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.circles = [];
    this.userCircle = [new UserCircle({ game: this })];
    this.addCircles();
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
      return [].concat(this.circles, this.userCircle);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      var allObjects = this.allObjects();
      allObjects.forEach(function (el) {
        el.draw(ctx);
      });
    }
  }, {
    key: 'step',
    value: function step() {
      this.moveObjects();
      this.checkCollisions();
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects() {
      var allObjects = this.allObjects();
      allObjects.forEach(function (el) {
        el.move();
      });
    }
  }, {
    key: 'remove',
    value: function remove(object) {
      if (object instanceof Circle) {
        this.circles.splice(this.circles.indexOf(object), 1);
      } else if (object instanceof UserCircle) {
        this.userCircle.splice(this.userCircle.indexOf(object), 1);
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
          } else {
            if (allObjects[i].isCollidedWith(allObjects[j])) {
              allObjects[i].collideWith(allObjects[j]);
            }
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
Game.NUM_CIRCLES = 100;

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(0);
var GameView = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  var game = new Game();
  new GameView(game, ctx).start();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(3);

var randomColor = function randomColor() {
  return 'rgb(' + Math.floor(Math.random() * 255) + ',\n   ' + Math.floor(Math.random() * 255) + ',\n    ' + Math.floor(Math.random() * 255) + ')';
};

var randomRadius = function randomRadius() {
  return Math.floor(Math.random() * (30 - 3) + 3);
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
/* 3 */
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
      var velocityScale = 100 / NORMAL_FRAME_TIME_DELTA;
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
      bigCircle.vel = [bigCircle.vel[0] * .85, bigCircle.vel[1] * .85];
      bigCircle.radius = Math.sqrt(Math.pow(smallCircle.radius, 2) + Math.pow(bigCircle.radius, 2));
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserCircle = __webpack_require__(5);

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.bindKeyHandlers();
      window.setInterval(function () {
        return _this.game.step();
      }, 20);
      window.setInterval(function () {
        return _this.game.draw(_this.ctx);
      }, 20);
    }
  }, {
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var userCircle = this.game.userCircle;

      Object.keys(GameView.KEYS).forEach(function (el) {
        debugger;
        key(el, function () {
          userCircle.power(GameView.KEYS[el]);
        });
      });
    }
  }]);

  return GameView;
}();

GameView.KEYS = {
  "w": [0, 1],
  "a": [-1, 0],
  "s": [0, -1],
  "d": [1, 0]
};

module.exports = GameView;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(3);

var randomColor = function randomColor() {
  return 'rgb(' + Math.floor(Math.random() * 255) + ',\n   ' + Math.floor(Math.random() * 255) + ',\n    ' + Math.floor(Math.random() * 255) + ')';
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
    key: 'power',
    value: function power(impulse) {
      this.pos[0] += impulse[0];
      this.pos[1] += impulse[1];
    }
  }]);

  return UserCircle;
}(MovingObject);

UserCircle.RADIUS = 10;

module.exports = UserCircle;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map