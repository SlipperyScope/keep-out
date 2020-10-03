import { World } from 'ecsy';
import * as components from './components.js';
import Grid from './systems/grid.js';

export default class LudumWorld {
  constructor() {
    this.world = new World();
    Object.values(components)
      .forEach(component => this.world.registerComponent(component));

    this.world.registerSystem(Grid);

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        this.world.createEntity().addComponent(components.Tile, { x, y });
      }
    }
  }

  execute(delta, time) {
    this.world.execute(delta, time);
  }
}
