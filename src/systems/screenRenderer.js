import { System } from "ecsy";
import { Enemy, Location, Path, Phaser, Tile, Sprite } from "../components";

export default class GridRenderSystem extends System {
  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const activeScene = game.scene.scenes.filter((s) =>
      game.scene.isVisible(s.scene.key)
    )[0];

    // Add things to the active scene outside the switch to add to all scenes.
    activeScene.add.image(500, 500, "brownRock");

    // Add UI elements to particular scenes
    activeScene.add.text(700, 700, activeScene.scene.key);
    switch (activeScene.scene.key) {
      case "menu":
        break;
      case "prep":
      //  break;
      case "play":
        const activeEnemies = this.queries.enemies.results;
        activeEnemies.forEach((ent) => {
          const enemyLocation = ent.getComponent(Location);
          const xLocation = enemyLocation.x * 100 + 100;
          const yLocation = enemyLocation.y * 20 + 100;

          if (ent.getMutableComponent(Sprite)) {
            const spriteToUpdate = ent.getMutableComponent(Sprite);
            spriteToUpdate.sprite.x = xLocation;
            spriteToUpdate.sprite.y = yLocation;
          } else {
            const enemySprite = activeScene.add.image(
              xLocation,
              yLocation,
              "badRock"
            );
            enemySprite.scaleX = 0.1;
            enemySprite.scaleY = 0.1;
            enemySprite.depth = 1;
            ent.addComponent(Sprite, { sprite: enemySprite });
          }
        });

        const tileResults = this.queries.tiles.results;
        //activeScene.add.text(700,700,"play")
        tileResults.forEach((ent) => {
          const tile = ent.getComponent(Tile);
          // add text at tile.x, tile.y except project coordinates of tiles to coordinates of canvas
          const xLocation = tile.x * 100 + 100;
          const yLocation = tile.y * 20 + 100;
          const sprite = activeScene.add.image(
            xLocation,
            yLocation,
            tile.isOccupied ? "greenRock" : "brownRock"
          );
          sprite.setInteractive().setData("coords", [tile.x, tile.y]);
          sprite.scaleX = 0.1;
          sprite.scaleY = 0.1;
        });
        break;
      default:
        activeScene.add.text(700, 700, "bad scene");
        break;
    }
  this.destroyRemovedSprites()
}

  destroyRemovedSprites() {
    this.queries.sprites.removed.forEach(s => {
      s.getRemovedComponent(Sprite).sprite.destroy();
    });
  }
}

GridRenderSystem.queries = {
  phaser: { components: [Phaser] },
  tiles: { components: [Tile], listen: { added: true, modified: true } },
  enemies: { components: [Enemy, Path, Location] },
  sprites: { components: [Sprite], listen: { removed: true } },
};
