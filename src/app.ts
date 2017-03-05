/// <reference path="../lib/phaser.d.ts"/>

import Configuration from "./Configuration";
import {Hero} from "./Hero";
import {Snake} from "./Snake";
import {Gnome} from "./Gnome";
import LevelProgress from "./LevelProgress";

class SimpleGame {
    private game: Phaser.Game;
    private configuration: Configuration;
    private hero: Hero;
    private snakes: Array<Snake>;
    private gnomes: Array<Gnome>;
    private levelProgress: LevelProgress;
    private map;
    private layer;
    private background;

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
        this.game.load.spritesheet('gnome', 'assets/forrest/gnome.png', 32, 32);
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

        if (this.hero.y > this.configuration.getSeaLevel()) {
            this.hero.drown();
        }

        for (let i = 0; i < this.snakes.length; i++) {
            this.game.physics.arcade.collide(this.snakes[i], this.layer);
            this.snakes[i].update();
            this.game.physics.arcade.overlap(this.hero, this.snakes[i], this.bite, null, this);
        }

        for (let i = 0; i < this.gnomes.length; i++) {
            this.game.physics.arcade.collide(this.gnomes[i], this.layer);
            this.gnomes[i].update();
            this.game.physics.arcade.overlap(this.hero, this.gnomes[i], this.steal, null, this);
        }
    }

    public bite (hero: Hero, snake: Snake)
    {
        hero.biten();
    }

    public steal (hero: Hero, gnome: Gnome)
    {
        gnome.stolen();
        if (this.levelProgress.isDay()) {
            this.background.loadTexture('background-day');
            this.hero.changeOriginPosition();
        }
    }

    public render()
    {
        if (this.configuration.debug()) {
            this.game.debug.body(this.hero);
            for (let i = 0; i < this.snakes.length; i++) {
                this.game.debug.body(this.snakes[i]);
            }

            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );
        }
    }

    private createWorld()
    {
        if (this.configuration.debug()) {
            this.game.time.advancedTiming = true
        }

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.stage.backgroundColor = '#000000';

        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background-night');
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background-day');
        this.background.loadTexture('background-night');
        this.background.fixedToCamera = true;

        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tiles-1');
        this.map.setCollision(
            [
                1, 2, 3, 4, 5, 6, 7,
                12, 13,
                21, 22, 23, 24, 25, 26, 27,
                32, 33
            ]
        );

        this.layer = this.map.createLayer('Tile Layer 1');
        if (this.configuration.debug()) {
            this.layer.debug = true;
        }
        this.layer.resizeWorld();

        this.game.physics.arcade.gravity.y = 350;

        this.hero = new Hero(this.game, 50, 370, 'king', 0, this.game.input.keyboard);
        this.game.camera.follow(this.hero);

        this.snakes = new Array();
        this.snakes[0] = new Snake(this.game, 330, 370, 'snake', 0);
        this.snakes[1] = new Snake(this.game, 750, 250, 'snake', 0);
        this.snakes[2] = new Snake(this.game, 1050, 250, 'snake', 0);

        this.gnomes = new Array();
        this.gnomes[0] = new Gnome(this.game, 210, 200, 'gnome', 0);
        this.gnomes[1] = new Gnome(this.game, 530, 370, 'gnome', 0);
        this.gnomes[2] = new Gnome(this.game, 1550, 370, 'gnome', 0);
        this.gnomes[3] = new Gnome(this.game, 1750, 370, 'gnome', 0);

        this.levelProgress = new LevelProgress(this.gnomes);
    }
}

window.onload = () => {
    let configuration = new Configuration();
    new SimpleGame(configuration);
};
