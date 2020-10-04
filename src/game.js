import Phaser from "phaser";
import Menu from './scenes/menu.js'
import Prep from './scenes/prep.js'
import Play from './scenes/play.js'

export default class LudumGame extends Phaser.Game {
  constructor(world) {
    super({
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: 1280,
      height: 720,
    });

    // Add the ECSY world to the game so it's available everywhere
    this.world = world;

    this.scene.add('menu', new Menu());
    this.scene.add('prep', new Prep());
    this.scene.add('play', new Play());
  }
}
