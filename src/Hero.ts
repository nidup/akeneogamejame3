
export class Hero extends Phaser.Sprite {

    private originX: number;
    private originY: number;
    private cursorKeys: Phaser.CursorKeys;
    private jumpingKey: Phaser.Key;
    private jumpTimer = 0;
    private facing = 'right';

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number, keyboard: Phaser.Keyboard) {
        super(game, x, y, key, frame);

        this.originX = x;
        this.originY = y;

        this.anchor.setTo(.5,.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.bounce.y = 0.2;
        this.body.collideWorldBounds = true;
        //this.body.setSize(18, 24, 8, 8);
        this.body.setCircle(13, 2, 6);

        this.animations.add('idle-left', [23], 10, true);
        this.animations.add('left', [23, 24, 25, 26], 10, true);
        this.animations.add('idle-right', [0], 10, true);
        this.animations.add('right', [0, 1, 2, 3], 10, true);

        game.add.existing(this);

        this.cursorKeys = keyboard.createCursorKeys();
        this.jumpingKey = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    public update ()
    {
        this.body.velocity.x = 0;

        if (this.cursorKeys.left.isDown) {
            this.body.velocity.x = -150;

            if (this.facing != 'left') {
                this.animations.play('left');
                this.facing = 'left';
            }

        } else if (this.cursorKeys.right.isDown) {
            this.body.velocity.x = 150;

            if (this.facing != 'right') {
                this.animations.play('right');
                this.facing = 'right';
            }

        } else {
            if (this.facing == 'right' && this.facing != 'idle') {
                this.animations.play('idle-right');
                this.facing = 'idle';
            } else if (this.facing == 'left' && this.facing != 'idle') {
                this.animations.play('idle-left');
                this.facing = 'idle';
            }
        }

        if (this.jumpingKey.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
            this.body.velocity.y = -150;
            this.jumpTimer = this.game.time.now + 750;
        }
    }

    public biten () {
        this.restartLevel();
    }

    public drown () {
        this.restartLevel();
    }

    public changeOriginPosition() {
        this.originX = this.x;
        this.originY = this.y;
    }

    private restartLevel() {
        this.x = this.originX;
        this.y = this.originY;
    }
}
