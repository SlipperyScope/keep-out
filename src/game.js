import Phaser from "phaser";
import Menu from './scenes/menu.js'
import Prep from './scenes/prep.js'
import Play from './scenes/play.js'
import { Phaser as PhaserComponent } from './components.js';

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

  startOurWonderfulGame() {
    // Create Phaser singleton entity so ECSY systems can interact with the scene and the renderer and stuff
    this.world.world.createEntity().addComponent(PhaserComponent, { game: this });
    this.scene.start('menu');

    // Run the ECS systems every frame
    this.events.on('step', (time, delta) => {
      this.world.execute(delta, time);
    });
  }
}
