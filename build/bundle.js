/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../lib/phaser.d.ts"/>
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot_1 = __webpack_require__(1);
	var Preload_1 = __webpack_require__(2);
	var Menu_1 = __webpack_require__(3);
	var Play_1 = __webpack_require__(4);
	var SimpleGame = (function (_super) {
	    __extends(SimpleGame, _super);
	    function SimpleGame() {
	        _super.call(this, 800, 512, Phaser.CANVAS, "content", null);
	        this.state.add('Boot', Boot_1.default);
	        this.state.add('Preload', Preload_1.default);
	        this.state.add('Menu', Menu_1.default);
	        this.state.add('Play', Play_1.default);
	        this.state.start('Boot');
	    }
	    return SimpleGame;
	}(Phaser.Game));
	window.onload = function () {
	    new SimpleGame();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot = (function (_super) {
	    __extends(Boot, _super);
	    function Boot() {
	        _super.apply(this, arguments);
	    }
	    Boot.prototype.create = function () {
	        this.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.state.start('Preload');
	    };
	    return Boot;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Boot;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Preload = (function (_super) {
	    __extends(Preload, _super);
	    function Preload() {
	        _super.apply(this, arguments);
	    }
	    Preload.prototype.preload = function () {
	        this.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
	        this.load.image('tiles-1', 'assets/forrest/tiles.png');
	        this.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
	        this.load.spritesheet('king', 'assets/forrest/king.png', 32, 32);
	        this.load.spritesheet('gnome', 'assets/forrest/gnome.png', 32, 32);
	        this.load.spritesheet('snake', 'assets/forrest/snake.png', 32, 32);
	        this.load.spritesheet('coin', 'assets/forrest/coins.png', 16, 16);
	        this.load.image('background-day', 'assets/forrest/background-day.png');
	        this.load.image('background-night', 'assets/forrest/background-night.png');
	        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
	    };
	    Preload.prototype.create = function () {
	        this.game.state.start('Menu');
	    };
	    return Preload;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Preload;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu() {
	        _super.apply(this, arguments);
	    }
	    Menu.prototype.create = function () {
	        this.game.stage.backgroundColor = '#1b1128';
	        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	        spaceKey.onDown.add(this.startGame, this);
	        this.titleText = this.game.add.bitmapText(40, 100, 'carrier-command', 'Underpants Gnomes', 27);
	        this.subtitleText = this.game.add.bitmapText(40, 140, 'carrier-command', 'Akeneo Game Jam #3 by nidup', 10);
	        this.hero = this.game.add.sprite(40, 180, 'king', 0);
	        this.hero.animations.add('dancing', [0, 1, 2, 3, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
	        this.hero.play('dancing');
	        this.gnome = this.game.add.sprite(390, 180, 'gnome', 0);
	        this.gnome.animations.add('dancing', [0, 1, 2, 3, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
	        this.gnome.play('dancing');
	        this.nude = this.game.add.sprite(730, 180, 'nude', 0);
	        this.nude.animations.add('dancing', [0, 1, 2, 3, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
	        this.nude.play('dancing');
	        this.briefingTextLine1 = this.game.add.bitmapText(40, 250, 'carrier-command', 'As the king of gnomes, your plan is,', 15);
	        this.briefingTextLine2 = this.game.add.bitmapText(40, 290, 'carrier-command', 'A) Collect underpants\n\nB) ? \n\nC) Profit', 15);
	        this.commandText = this.game.add.bitmapText(90, 410, 'carrier-command', 'Use left / right keys to move and space bar to jump', 10);
	        this.startText = this.game.add.bitmapText(240, 450, 'carrier-command', 'Press space to start', 10);
	        this.coin1 = this.game.add.sprite(200, 447, 'coin', 0);
	        this.coin1.animations.add('flip', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	        this.coin1.play('flip');
	        this.coin2 = this.game.add.sprite(500, 447, 'coin', 0);
	        this.coin2.animations.add('flip', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	        this.coin2.play('flip');
	    };
	    Menu.prototype.startGame = function () {
	        this.game.state.start('Play');
	    };
	    Menu.prototype.shutdown = function () {
	        this.titleText.destroy();
	        this.subtitleText.destroy();
	        this.briefingTextLine1.destroy();
	        this.briefingTextLine2.destroy();
	        this.startText.destroy();
	        this.commandText.destroy();
	        this.coin1.destroy();
	        this.coin2.destroy();
	        this.hero.destroy();
	        this.gnome.destroy();
	        this.nude.destroy();
	    };
	    return Menu;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Menu;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Hero_1 = __webpack_require__(5);
	var Snake_1 = __webpack_require__(6);
	var Gnome_1 = __webpack_require__(7);
	var LevelProgress_1 = __webpack_require__(8);
	var Play = (function (_super) {
	    __extends(Play, _super);
	    function Play() {
	        _super.apply(this, arguments);
	        this.debug = false;
	        this.seaLevel = 450;
	    }
	    Play.prototype.create = function () {
	        if (this.debug) {
	            this.game.time.advancedTiming = true;
	        }
	        this.game.stage.backgroundColor = '#000000';
	        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background-night');
	        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background-day');
	        this.background.loadTexture('background-night');
	        this.background.fixedToCamera = true;
	        this.briefingText = this.game.add.bitmapText(40, 40, 'carrier-command', 'Night has come, Let\'s collect underpants!', 10);
	        this.briefingText.fixedToCamera = true;
	        this.map = this.game.add.tilemap('level1');
	        this.map.addTilesetImage('tiles-1');
	        this.map.setCollision([
	            1, 2, 3, 4, 5, 6, 7,
	            12, 13,
	            21, 22, 23, 24, 25, 26, 27,
	            32, 33
	        ]);
	        this.layer = this.map.createLayer('Tile Layer 1');
	        if (this.debug) {
	            this.layer.debug = true;
	        }
	        this.layer.resizeWorld();
	        this.game.physics.arcade.gravity.y = 350;
	        this.hero = new Hero_1.Hero(this.game, 50, 370, 'king', 0, this.game.input.keyboard);
	        this.game.camera.follow(this.hero);
	        this.snakes = new Array();
	        this.snakes[0] = new Snake_1.Snake(this.game, 330, 370, 'snake', 0);
	        this.snakes[1] = new Snake_1.Snake(this.game, 750, 250, 'snake', 0);
	        this.snakes[2] = new Snake_1.Snake(this.game, 1050, 250, 'snake', 0);
	        this.gnomes = new Array();
	        this.gnomes[0] = new Gnome_1.Gnome(this.game, 210, 200, 'gnome', 0);
	        this.gnomes[1] = new Gnome_1.Gnome(this.game, 530, 370, 'gnome', 0);
	        this.gnomes[2] = new Gnome_1.Gnome(this.game, 1550, 370, 'gnome', 0);
	        this.gnomes[3] = new Gnome_1.Gnome(this.game, 1750, 370, 'gnome', 0);
	        this.levelProgress = new LevelProgress_1.default(this.gnomes, this.hero);
	        this.coinLeftEmitter = this.game.add.emitter(0, 80, 1000);
	        this.coinLeftEmitter.bounce.setTo(0.5, 0.5);
	        this.coinLeftEmitter.setXSpeed(100, 500);
	        this.coinLeftEmitter.setYSpeed(-50, 50);
	        this.coinLeftEmitter.makeParticles('coin', [0, 1, 2, 3, 4, 5, 6, 7]);
	        this.coinRightEmitter = this.game.add.emitter(800, 80, 1000);
	        this.coinRightEmitter.bounce.setTo(0.5, 0.5);
	        this.coinRightEmitter.setXSpeed(-100, -500);
	        this.coinRightEmitter.setYSpeed(-50, 50);
	        this.coinRightEmitter.makeParticles('coin', [0, 1, 2, 3, 4, 5, 6, 7]);
	    };
	    Play.prototype.update = function () {
	        this.game.physics.arcade.collide(this.hero, this.layer);
	        this.hero.update();
	        if (this.hero.y > this.seaLevel) {
	            this.briefingText.text = 'Argh! I\'m drowing!!';
	            this.hero.drown();
	        }
	        if (this.levelProgress.isFinished()) {
	            this.briefingText.text = 'Yeahhhh!! Profit!!!! You finished the game :D';
	            this.coinLeftEmitter.start(false, 5000, 20);
	            this.coinRightEmitter.start(false, 5000, 20);
	            this.hero.dance();
	            for (var i = 0; i < this.gnomes.length; i++) {
	                this.gnomes[i].dance();
	            }
	        }
	        for (var i = 0; i < this.snakes.length; i++) {
	            this.game.physics.arcade.collide(this.snakes[i], this.layer);
	            this.snakes[i].update();
	            this.game.physics.arcade.overlap(this.hero, this.snakes[i], this.bite, null, this);
	        }
	        for (var i = 0; i < this.gnomes.length; i++) {
	            this.game.physics.arcade.collide(this.gnomes[i], this.layer);
	            this.gnomes[i].update();
	            this.game.physics.arcade.overlap(this.hero, this.gnomes[i], this.steal, null, this);
	        }
	    };
	    Play.prototype.bite = function (hero, snake) {
	        hero.biten();
	        this.briefingText.text = 'Argh! Bitten by a snake!';
	    };
	    Play.prototype.steal = function (hero, gnome) {
	        if (gnome.isNude()) {
	            return;
	        }
	        gnome.stolen();
	        if (this.levelProgress.isDay()) {
	            this.background.loadTexture('background-day');
	            this.hero.changeOriginPosition();
	            this.briefingText.text = 'I have all of them and day is coming, let\'s go back home!';
	        }
	        else {
	            this.briefingText.text = 'Niak, niak, niak, and ' + this.levelProgress.countNudes() + ' collected!';
	        }
	    };
	    Play.prototype.render = function () {
	        if (this.debug) {
	            this.game.debug.body(this.hero);
	            for (var i = 0; i < this.snakes.length; i++) {
	                this.game.debug.body(this.snakes[i]);
	            }
	            this.game.debug.text("FPS: " + this.game.time.fps + " ", 2, 14, "#00ff00");
	        }
	    };
	    return Play;
	}(Phaser.State));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Play;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Hero = (function (_super) {
	    __extends(Hero, _super);
	    function Hero(game, x, y, key, frame, keyboard) {
	        _super.call(this, game, x, y, key, frame);
	        this.jumpTimer = 0;
	        this.facing = 'right';
	        this.dancing = false;
	        this.originX = x;
	        this.originY = y;
	        this.finishX = x;
	        this.anchor.setTo(.5, .5);
	        game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.bounce.y = 0.2;
	        this.body.collideWorldBounds = true;
	        this.body.setCircle(13, 2, 6);
	        this.animations.add('idle-left', [23], 10, true);
	        this.animations.add('left', [23, 24, 25, 26], 10, true);
	        this.animations.add('idle-right', [0], 10, true);
	        this.animations.add('right', [0, 1, 2, 3], 10, true);
	        this.animations.add('dancing', [0, 1, 2, 3, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
	        game.add.existing(this);
	        this.cursorKeys = keyboard.createCursorKeys();
	        this.jumpingKey = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	    }
	    Hero.prototype.update = function () {
	        this.body.velocity.x = 0;
	        if (this.dancing) {
	            if (this.facing != 'dancing') {
	                this.animations.play('dancing');
	                this.facing = 'dancing';
	            }
	            return;
	        }
	        if (this.cursorKeys.left.isDown) {
	            this.body.velocity.x = -150;
	            if (this.facing != 'left') {
	                this.animations.play('left');
	                this.facing = 'left';
	            }
	        }
	        else if (this.cursorKeys.right.isDown) {
	            this.body.velocity.x = 150;
	            if (this.facing != 'right') {
	                this.animations.play('right');
	                this.facing = 'right';
	            }
	        }
	        else {
	            if (this.facing == 'right' && this.facing != 'idle') {
	                this.animations.play('idle-right');
	                this.facing = 'idle';
	            }
	            else if (this.facing == 'left' && this.facing != 'idle') {
	                this.animations.play('idle-left');
	                this.facing = 'idle';
	            }
	        }
	        if (this.jumpingKey.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
	            this.body.velocity.y = -150;
	            this.jumpTimer = this.game.time.now + 750;
	        }
	    };
	    Hero.prototype.biten = function () {
	        this.restartLevel();
	    };
	    Hero.prototype.drown = function () {
	        this.restartLevel();
	    };
	    Hero.prototype.changeOriginPosition = function () {
	        this.originX = this.x;
	        this.originY = this.y;
	    };
	    Hero.prototype.isBackHome = function () {
	        return this.x < this.finishX;
	    };
	    Hero.prototype.dance = function () {
	        this.x = this.x + 1; // TODO: dirty hack to raise coins emitter
	        this.dancing = true;
	    };
	    Hero.prototype.restartLevel = function () {
	        this.x = this.originX;
	        this.y = this.originY;
	    };
	    return Hero;
	}(Phaser.Sprite));
	exports.Hero = Hero;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Snake = (function (_super) {
	    __extends(Snake, _super);
	    function Snake(game, x, y, key, frame) {
	        _super.call(this, game, x, y, key, frame);
	        this.distance = 30;
	        this.speed = 30;
	        this.limitLeftX = x - this.distance;
	        this.limitRightX = x + this.distance;
	        this.anchor.setTo(.5, .5);
	        game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.bounce.y = 0.2;
	        this.body.collideWorldBounds = true;
	        this.body.setSize(18, 16, 8, 16);
	        this.animations.add('left', [23, 24, 25, 26], 10, true);
	        this.animations.add('right', [0, 1, 2, 3], 10, true);
	        this.facing = 'left';
	        game.add.existing(this);
	    }
	    Snake.prototype.update = function () {
	        if (this.x < this.limitLeftX) {
	            this.facing = 'right';
	        }
	        else if (this.x > this.limitRightX) {
	            this.facing = 'left';
	        }
	        if (this.facing == 'left') {
	            this.animations.play('left');
	            this.body.velocity.x = -this.speed;
	        }
	        else if (this.facing == 'right') {
	            this.animations.play('right');
	            this.body.velocity.x = this.speed;
	        }
	    };
	    return Snake;
	}(Phaser.Sprite));
	exports.Snake = Snake;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Gnome = (function (_super) {
	    __extends(Gnome, _super);
	    function Gnome(game, x, y, key, frame) {
	        _super.call(this, game, x, y, key, frame);
	        this.distance = 35;
	        this.speed = 30;
	        this.dancing = false;
	        this.nude = false;
	        this.limitLeftX = x - this.distance;
	        this.limitRightX = x + this.distance;
	        this.anchor.setTo(.5, .5);
	        game.physics.enable(this, Phaser.Physics.ARCADE);
	        this.body.bounce.y = 0.2;
	        this.body.collideWorldBounds = true;
	        this.body.setSize(18, 16, 8, 16);
	        this.animations.add('left', [23, 24, 25, 26], 10, true);
	        this.animations.add('right', [0, 1, 2, 3], 10, true);
	        this.animations.add('dancing', [0, 1, 2, 3, 18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
	        this.facing = 'right';
	        game.add.existing(this);
	    }
	    Gnome.prototype.update = function () {
	        this.body.velocity.x = 0;
	        if (this.dancing) {
	            if (this.facing != 'dancing') {
	                this.animations.play('dancing');
	                this.facing = 'dancing';
	            }
	            return;
	        }
	        if (this.x < this.limitLeftX) {
	            this.facing = 'right';
	        }
	        else if (this.x > this.limitRightX) {
	            this.facing = 'left';
	        }
	        if (this.facing == 'left') {
	            this.animations.play('left');
	            this.body.velocity.x = -this.speed;
	        }
	        else if (this.facing == 'right') {
	            this.animations.play('right');
	            this.body.velocity.x = this.speed;
	        }
	    };
	    Gnome.prototype.stolen = function () {
	        this.nude = true;
	        this.loadTexture('nude', 0, false);
	    };
	    Gnome.prototype.isNude = function () {
	        return this.nude;
	    };
	    Gnome.prototype.dance = function () {
	        this.dancing = true;
	    };
	    return Gnome;
	}(Phaser.Sprite));
	exports.Gnome = Gnome;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var LevelProgress = (function () {
	    function LevelProgress(gnomes, hero) {
	        this.gnomes = gnomes;
	        this.hero = hero;
	    }
	    LevelProgress.prototype.isFinished = function () {
	        return (this.isDay() && this.hero.isBackHome());
	    };
	    LevelProgress.prototype.isDay = function () {
	        return this.countNudes() == this.gnomes.length;
	    };
	    LevelProgress.prototype.countNudes = function () {
	        var countNude = 0;
	        for (var i = 0; i < this.gnomes.length; i++) {
	            if (this.gnomes[i].isNude()) {
	                countNude++;
	            }
	        }
	        return countNude;
	    };
	    return LevelProgress;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LevelProgress;


/***/ }
/******/ ]);