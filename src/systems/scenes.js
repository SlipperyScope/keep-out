import { System } from 'ecsy';
import { Phaser } from '../components';

export default class GridSystem extends System {
  constructor() {
    super(...arguments);
  }

  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];

    if (activeScene) {
      activeScene.add.text(Math.random() * game.config.width, Math.random() * game.config.height, 'Job is finished');
    }
  }
}

GridSystem.queries = {
  phaser: { components: [ Phaser ] },
};
