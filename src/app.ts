/// <reference path="../lib/phaser.d.ts"/>

import Configuration from "./Configuration";
import {Hero} from "./Hero";
import {Snake} from "./Snake";

class SimpleGame {
    private game: Phaser.Game;
    private configuration: Configuration;
    private hero: Hero;
    private snakes: Array<Snake>;
    private map;
    private layer;
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
    }

    public preload()
    {
        this.game.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'assets/forrest/tiles.png');
        this.game.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
        this.game.load.spritesheet('king', 'assets/forrest/king.png', 32, 32);
        this.game.load.spritesheet('dude', 'assets/forrest/lutin.png', 32, 32);
        this.game.load.spritesheet('snake', 'assets/forrest/snake.png', 32, 32);
        this.game.load.image('background-day', 'assets/forrest/background-day.png');
        this.game.load.image('background-night', 'assets/forrest/background-night.png');
    }

    public create()
    {
        this.createWorld();
    }

    public update()
    {
        this.game.physics.arcade.collide(this.hero, this.layer);
        this.hero.update();
        for (let i = 0; i < this.snakes.length; i++) {
            this.game.physics.arcade.collide(this.snakes[i], this.layer);
            this.snakes[i].update();
        }
    }

    public render()
    {
        /*
        this.game.debug.text(
            "FPS: "  + this.game.time.fps + " "
            + " Player PV " + this.hero.health + " ",
            2,
            14,
            "#00ff00"
        );*/
    }

    private createWorld()
    {
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
        //this.layer.debug = true;

        this.layer.resizeWorld();

        this.game.physics.arcade.gravity.y = 350;

        this.hero = new Hero(this.game, 50, 370, 'king', 0, this.game.input.keyboard);
        this.game.camera.follow(this.hero);

        this.snakes = new Array();
        this.snakes[0] = new Snake(this.game, 330, 370, 'snake', 0);
        this.snakes[1] = new Snake(this.game, 750, 250, 'snake', 0);
        this.snakes[2] = new Snake(this.game, 1050, 250, 'snake', 0);
    }
}

window.onload = () => {
    let configuration = new Configuration();
    new SimpleGame(configuration);
};
