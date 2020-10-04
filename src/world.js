import { World } from 'ecsy';
import * as components from './components.js';
import Grid from './systems/grid.js';
import Scenes from './systems/scenes.js';
import TowerSystem from './systems/towers.js';
import CheckTowerSystem from './systems/checkTowers.js';
import Enemies from './systems/enemies.js';
import GridRenderer from './systems/screenRenderer';

export default class LudumWorld {
  constructor() {
    this.world = new World();
    Object.values(components)
      .forEach(component => this.world.registerComponent(component));

    this.world
      .registerSystem(TowerSystem)
      .registerSystem(Grid)
      .registerSystem(CheckTowerSystem)
      .registerSystem(Scenes)
      .registerSystem(Enemies)
      .registerSystem(GridRenderer);

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        this.world.createEntity()
          .addComponent(components.Tile, { x, y, id: `${x},${y}`, isOccupied: x === 6 && y < 9 });
      }
    }

    // This entity should get a path that goes all the way down and back up to avoid the wall
    this.world.createEntity().addComponent(components.Path, { from: [0,0], to: [9,0] });
  }

  execute(delta, time) {
    this.world.execute(delta, time);
  }
}
