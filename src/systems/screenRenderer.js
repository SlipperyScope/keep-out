import { System } from "ecsy";
import { Enemy, Location, Path, Phaser, Tile, Sprite } from "../components";
import translateToScreen from "../Utils/translateToScreen";

export default class GridRenderSystem extends System {
  execute() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const activeScene = game.scene.scenes.filter((s) =>
      game.scene.isVisible(s.scene.key)
    )[0];

    // Add things to the active scene outside the switch to add to all scenes.
    const background = activeScene.add.image(640,360,"Background")
    background.displayWidth = game.config.width
    background.displayHeight = game.config.height


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

          const screenCords = translateToScreen(enemyLocation.x,enemyLocation.y)
          if (ent.getMutableComponent(Sprite)) {
            const spriteToUpdate = ent.getMutableComponent(Sprite);
            spriteToUpdate.sprite.x = screenCords.x;
            spriteToUpdate.sprite.y = screenCords.y;
          } else {
            const enemySprite = activeScene.add.image(
                screenCords.x,
                screenCords.y,
              "robot"
            );
            enemySprite.displayHeight = enemySprite.displayWidth = 40
            enemySprite.depth = 1;
            ent.addComponent(Sprite, { sprite: enemySprite });
          }
        });

        const tileResults = this.queries.tiles.results;
        //activeScene.add.text(700,700,"play")
        tileResults.forEach((ent) => {
          const tile = ent.getComponent(Tile);
          // add text at tile.x, tile.y except project coordinates of tiles to coordinates of canvas
          const screenCords = translateToScreen(tile.x,tile.y)
          const sprite = activeScene.add.image(
            screenCords.x,
            screenCords.y,
            tile.isOccupied ? "TurretTile" : "EmptyTile"
          );
          sprite.setInteractive().setData("coords", [tile.x, tile.y]);
          sprite.displayHeight = sprite.displayWidth = 80
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
