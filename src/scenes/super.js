import Phaser from "phaser";

export default class SuperScene extends Phaser.Scene {
    create() {
        const background = this.add.image(640,360,"Background");
        background.displayWidth = this.game.config.width;
        background.displayHeight = this.game.config.height;
        background.depth = -100;
    }
}
