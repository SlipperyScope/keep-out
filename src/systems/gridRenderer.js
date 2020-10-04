import { System } from 'ecsy';
import { Phaser,Tile } from '../components';
import BrownRock from '../assets/Sprites/brown_rock.png';
import logoImg from "../assets/Sprites/logo.png";

export default class GridRenderSystem extends System {
  preload() {
    console.log("in preload this should load")

  }

  constructor() {
    super(...arguments);

  }


  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const tiles = this.queries.tiles.added;

    const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];

    if (activeScene) {
      tiles.forEach(ent => {
        const tile = ent.getComponent(Tile);
        // add text at tile.x, tile.y except project coordinates of tiles to coordinates of canvas
        const xLocation =tile.x * 100 + 100
        const yLocation = tile.y * 20 + 100
        // activeScene.add.text(xLocation, yLocation, tile.isOccupied ? " " : "X");
        activeScene.add.image(100, 800, "rock");
        activeScene.add.image(xLocation,yLocation,logoImg);
      });
      // activeScene.add.text(Math.random() * game.config.width, Math.random() * game.config.height, 'get fucked again');
    }
  }
}

GridRenderSystem.queries = {
    phaser: { components: [ Phaser ] },
    tiles: { components: [Tile], listen: { added: true, modified: true } },
};
