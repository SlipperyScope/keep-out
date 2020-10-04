import { System } from 'ecsy';
import { Phaser,Tile } from '../components';

export default class GridRenderSystem extends System {
  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];

    //Add things to the active scene outside the switch to add to all scenes.
    activeScene.add.image(500, 500, "brownRock");

    // Add UI elements to particular scenes
    switch (activeScene.scene.key){
      case "menu":
        activeScene.add.text(700,700,"menu")
        break;
      case "prep":
        activeScene.add.text(700,700,"prep")
          break;
      case "play":
        const tileResults = this.queries.tiles.results;
        activeScene.add.text(700,700,"play")
        tileResults.forEach( ent => {
          const tile = ent.getComponent(Tile);
          // add text at tile.x, tile.y except project coordinates of tiles to coordinates of canvas
          const xLocation =tile.x * 100 + 100
          const yLocation = tile.y * 20 + 100
          // activeScene.add.text(xLocation, yLocation, tile.isOccupied ? " " : "X");
          const sprite = activeScene.add.image(xLocation, yLocation, tile.isOccupied? "greenRock": "brownRock")
          sprite.scaleX =.1
          sprite.scaleY = .1
        });
        break;
      default:
        activeScene.add.text(700,700,"bad scene")
        break;
    }
  }
}

GridRenderSystem.queries = {
    phaser: { components: [ Phaser ] },
    tiles: { components: [Tile], listen: { added: true, modified: true } },
};
