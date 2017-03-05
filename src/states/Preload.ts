
export default class Preload extends Phaser.State {

    public preload ()
    {
        this.load.tilemap('level1', 'assets/forrest/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles-1', 'assets/forrest/tiles.png');
        this.load.spritesheet('nude', 'assets/forrest/nude.png', 32, 32);
        this.load.spritesheet('king', 'assets/forrest/king.png', 32, 32);
        this.load.spritesheet('gnome', 'assets/forrest/gnome.png', 32, 32);
        this.load.spritesheet('snake', 'assets/forrest/snake.png', 32, 32);
        this.load.image('background-day', 'assets/forrest/background-day.png');
        this.load.image('background-night', 'assets/forrest/background-night.png');
    }

    public create ()
    {
        this.game.state.start('Play');
    }
}
