import Phaser from "phaser";
import Default from './scenes/default.js'

export default class LudumGame extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 1280,
      height: 720,
    });

    this.scene.add('intro', new Default());
  }
}
