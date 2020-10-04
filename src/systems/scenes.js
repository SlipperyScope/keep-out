import { System } from 'ecsy';
import { Phaser } from '../components';

export default class ScenesSystem extends System {
  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];

    if (activeScene) {
      activeScene.add.text(Math.random() * game.config.width, Math.random() * game.config.height, 'Job is finished');
    }
  }
}

ScenesSystem.queries = {
  phaser: { components: [ Phaser ] },
};
