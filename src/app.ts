/// <reference path="../lib/phaser.d.ts"/>

import Configuration from "./Configuration";
import {MapChunkRegistry, MapChunk} from "./MapGenerator";
import {Ship} from "./Ship";
import {ShipBuilder} from "./ShipBuilder";
import {KeyboardControlEngine, GamePadControlEngine, DummyControlEngine} from "./ControlEngine";

class SimpleGame {
    private game: Phaser.Game;
    private configuration: Configuration;

    /*
    private chunkRegistry: MapChunkRegistry;
    private currentChunk: MapChunk;
    private player: Ship = null;
    private map: Phaser.Tilemap = null;
    private layer: Phaser.TilemapLayer = null;
    private generating: boolean = false;
    private enemy: Ship = null;
    */

    private map;
    private layer;
    private player;
    private facing = 'right';
    private jumpTimer = 0;
    private cursors;
    private jumpButton;
    private bg;

    constructor(config: Configuration) {
        this.configuration = config;
        this.game = new Phaser.Game(
            this.configuration.getGameWidth(),
            this.configuration.getGameHeight(),
            Phaser.CANVAS,
            "content",
            this
        );
        //this.chunkRegistry = new MapChunkRegistry(this.game.rnd, this.configuration);
    }

    public preload() {

        this.game.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'assets/forrest/tiles.png');
        this.game.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
        this.game.load.spritesheet('king', 'assets/forrest/king.png', 32, 32);
        this.game.load.spritesheet('dude', 'assets/forrest/lutin.png', 32, 32);
        this.game.load.spritesheet('snake', 'assets/forrest/snake.png', 32, 32);
        this.game.load.image('background-day', 'assets/forrest/background-day.png');
        this.game.load.image('background-night', 'assets/forrest/background-night.png');
    }

    public create() {
        this.createWorld();
    }

    public update() {

        this.game.physics.arcade.collide(this.player, this.layer);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -150;

            if (this.facing != 'left')
            {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 150;

            if (this.facing != 'right')
            {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else
        {
            if (this.facing == 'right' && this.facing != 'idle')
            {
                this.player.animations.play('idle-right');
                this.facing = 'idle';
            }
            else if (this.facing == 'left' && this.facing != 'idle')
            {
                this.player.animations.play('idle-left');
                this.facing = 'idle';
            }
        }

        if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -150;
            this.jumpTimer = this.game.time.now + 750;
        }

        /*
        // TODO: reset bullets positions when changing chunk
        // TODO: reset enemy does not work properly, only works when enemy is following the player
        if (this.generating === false && this.player.getX() > this.configuration.getRightBorder()) {
            this.generating = true;
            this.currentChunk = this.chunkRegistry.getRight(this.currentChunk);
            this.repaintCurrentChunk();
            let playerX = this.configuration.getLeftBorder();
            let enemyX = playerX + (Math.abs(this.enemy.getX()) - Math.abs(this.player.getX()));
            this.player.resetPosition(playerX, this.player.getY());
            this.enemy.resetPosition(enemyX, this.enemy.getY());
            this.generating = false;

        } else if (this.generating === false && this.player.getX() < this.configuration.getLeftBorder()) {
            this.generating = true;
            this.currentChunk = this.chunkRegistry.getLeft(this.currentChunk);
            this.repaintCurrentChunk();
            let playerX = this.configuration.getRightBorder();
            let enemyX = playerX + (Math.abs(this.enemy.getX()) - Math.abs(this.player.getX()));
            this.player.resetPosition(playerX, this.player.getY());
            this.enemy.resetPosition(enemyX, this.enemy.getY());
            this.generating = false;

        } else if (this.generating === false && this.player.getY() > this.configuration.getBottomBorder()) {
            this.generating = true;
            this.currentChunk = this.chunkRegistry.getBottom(this.currentChunk);
            this.repaintCurrentChunk();
            let playerY = this.configuration.getTopBorder();
            let enemyY = playerY + (Math.abs(this.enemy.getY()) - Math.abs(this.player.getY()));
            this.player.resetPosition(this.player.getX(), playerY);
            this.enemy.resetPosition(this.enemy.getX(), enemyY);
            this.generating = false;

        } else if (this.generating === false && this.player.getY() < this.configuration.getTopBorder()) {
            this.generating = true;
            this.currentChunk = this.chunkRegistry.getTop(this.currentChunk);
            this.repaintCurrentChunk();
            let playerY = this.configuration.getBottomBorder();
            let enemyY = playerY + (Math.abs(this.enemy.getY()) - Math.abs(this.player.getY()));
            this.player.resetPosition(this.player.getX(), playerY);
            this.enemy.resetPosition(this.enemy.getX(), enemyY);
            this.generating = false;
        }
        */

        // TODO: set a timer to pre-generate upcoming chunks to reduce the lag effect (only repaint)
    }

    public render() {
        this.game.debug.text(
            "FPS: "  + this.game.time.fps + " "
            + " Player PV " + this.player.health + " ",
            2,
            14,
            "#00ff00"
        );
    }

    private createWorld() {

        /*
        this.game.time.advancedTiming = true;
        this.game.world.setBounds(0, 0, this.configuration.getMapChunkWidth(), this.configuration.getMapChunkHeight());
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.restitution = 0.8;

        this.map = this.game.add.tilemap();
        this.map.addTilesetImage(
            "tileset",
            "tileset",
            this.configuration.getTileWidth(),
            this.configuration.getTileHeight()
        );

        this.currentChunk = this.chunkRegistry.getInitial();
        this.repaintCurrentChunk();

        this.buildPlayer();
        this.buildEnemy();
        */

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.stage.backgroundColor = '#000000';

        this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'background-night');
        this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'background-day');

        //this.bg.loadTexture('background-night');
        this.bg.loadTexture('background-day');


        this.bg.fixedToCamera = true;

        this.map = this.game.add.tilemap('level1');

        this.map.addTilesetImage('tiles-1');

        this.map.setCollisionByExclusion([
            8, 9, 10,
            18, 19, 20,
            28, 29, 30, 31, 35,
            37, 38, 39,
            40, 41, 42, 43, 44,
            50, 57, 58, 59,
            60, 67, 68, 69, 70,

            11, 14, 15, 16
        ]);

        this.layer = this.map.createLayer('Tile Layer 1');

        //  Un-comment this on to see the collision tiles
        this.layer.debug = true;

        this.layer.resizeWorld();

        this.game.physics.arcade.gravity.y = 350;

        this.player = this.game.add.sprite(50, 370, 'king');
        this.player.anchor.setTo(.5,.5);

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        //this.player.body.setSize(16, 16, 0, 0); // TODO ????
        //this.player.body.setCircle(14); // TODO ????

        this.player.animations.add('idle-left', [23], 10, true);
        this.player.animations.add('left', [23, 24, 25, 26], 10, true);
        this.player.animations.add('idle-right', [0], 10, true);
        this.player.animations.add('right', [0, 1, 2, 3], 10, true);
        //this.player.animations.add('turn', [4], 20, true);

        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }
/*
    private buildPlayer() {
        let controlEngine = null;
        if (this.configuration.playWithGamePad()) {
            let pad = this.game.input.gamepad.pad1;
            this.game.input.gamepad.start();
            controlEngine = new GamePadControlEngine(pad);
        } else {
            controlEngine = new KeyboardControlEngine(this.game.input.keyboard);
        }

        let shipBuilder = new ShipBuilder();
        this.player = shipBuilder.buildSprite(
            this.game,
            "ship1",
            this.configuration.getMapChunkWidth() / 2,
            this.configuration.getMapChunkHeight() / 2,
            this.configuration.getPixelRatio(),
            controlEngine,
            200,
            300
        );

        this.game.camera.follow(this.player);
    }

    private buildEnemy() {
        let controlEngine = new DummyControlEngine();
        let shipBuilder = new ShipBuilder();
        this.enemy = shipBuilder.buildSprite(
            this.game,
            "ship2",
            this.configuration.getMapChunkWidth() / 2 + 100,
            this.configuration.getMapChunkHeight() / 2,
            this.configuration.getPixelRatio(),
            controlEngine,
            800,
            50
        );
        controlEngine.configure(this.player, this.enemy);
    }

    private repaintCurrentChunk() {
        let newLayer = this.getLayer(this.currentChunk);
    }

    private getLayer(chunk: MapChunk) {
        if (this.layer === null) {
            let newLayer = this.map.create(
                this.currentChunk.getRandState(),
                this.configuration.getMapChunkWidthInTiles(),
                this.configuration.getMapChunkHeightInTiles(),
                this.configuration.getTileWidth(),
                this.configuration.getTileHeight()
            );
            newLayer.scale.setTo(this.configuration.getPixelRatio(), this.configuration.getPixelRatio());
            if (this.layer !== null) {
                this.layer.destroy();
            }
            this.layer = newLayer;
        }

        let tiles = this.currentChunk.getFinalTiles();
        let painter = new TilemapPainter();
        painter.paint(this.map, this.layer, tiles);

        return this.layer;
    }*/
}

/**
 * Paints a tile map layer with the given set of tiles, the layer will contains empty tiles around the painted tiles to
 * allow to always keep the player centered in the screen
 *
class TilemapPainter {
    public paint(map: Phaser.Tilemap, layer: Phaser.TilemapLayer, tiles: Array<Array<number>>) {

        let nbColumns = tiles.length;
        let nbRows = tiles[0].length;

        for (let column = 0; column < nbColumns; column++) {
            for (let row = 0; row < nbRows; row++) {
                map.putTile(tiles[column][row], column, row, layer);
            }
        }
    }
}*/

window.onload = () => {
    let configuration = new Configuration();
    new SimpleGame(configuration);
};
