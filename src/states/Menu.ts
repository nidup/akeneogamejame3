
export default class Menu extends Phaser.State {

    private titleText : Phaser.BitmapText;
    private subtitleText : Phaser.BitmapText;
    private briefingTextLine1 : Phaser.BitmapText;
    private briefingTextLine2 : Phaser.BitmapText;
    private startText : Phaser.BitmapText;

    public create ()
    {
        this.game.stage.backgroundColor = '#1b1128';

        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        spaceKey.onDown.add(this.startGame, this);

        this.titleText = this.game.add.bitmapText(40, 100, 'carrier-command','Underpants Gnomes', 27);
        this.subtitleText = this.game.add.bitmapText(40, 140, 'carrier-command','Akeneo Game Jam #3 by nidup', 10);
        this.briefingTextLine1 = this.game.add.bitmapText(40, 240, 'carrier-command','As the king of gnomes, your plan is,', 15);
        this.briefingTextLine2 = this.game.add.bitmapText(40, 270, 'carrier-command','A) Steal underpants\n\nB) ? \n\nC) Profit', 15);
        this.startText = this.game.add.bitmapText(240, 370, 'carrier-command','Press Enter to start', 10);
    }

    public startGame ()
    {
        this.game.state.start('Play');
    }

    public shutdown ()
    {
        this.titleText.destroy();
        this.subtitleText.destroy();
        this.briefingTextLine1.destroy();
        this.briefingTextLine2.destroy();
        this.startText.destroy();
    }
}
