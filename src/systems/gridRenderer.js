import { System } from 'ecsy';
import { Phaser,Tile } from '../components';

export default class GridRenderSystem extends System {

  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const tiles = this.queries.tiles.added;

    const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];

    if (activeScene) {

      activeScene.add.text(Math.random() * game.config.width, Math.random() * game.config.height, 'get fucked again');
    }
    console.log("tile print",tiles, activeScene);
  }
}

GridRenderSystem.queries = {
    phaser: { components: [ Phaser ] },
    tiles: { components: [Tile], listen: { added: true } },
};
