import { System, Not } from 'ecsy';
import { Tile, Tower, Phaser } from '../components';

export default class TowerSystem extends System {
  execute(delta) {
    this.queries.newTowers.added.forEach(t => {           
        let tower = t.getComponent(Tower);
        let matchingTileEntity = this.queries.emptyTiles.results.find(et => {
            let { x, y } = et.getComponent(Tile);
            return x === tower.x && y === tower.y;
        });

        if (matchingTileEntity) {
            matchingTileEntity.addComponent(Tower, tower);
            matchingTileEntity.getMutableComponent(Tile).isOccupied = true;

            const game = this.queries.phaser.results[0].getComponent(Phaser).game;
            const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];
            activeScene.add.image(0, 0, "logo").setInteractive().setData("coords", [0, 1]);
            
            console.log("Found match for (", tower.x, ", ", tower.y, ")");
        } else {                
            console.log("No match for (", tower.x, ", ", tower.y, ")");
        }

        t.removeComponent(Tower);
    });
  }
}

TowerSystem.queries = {
  newTowers: { components: [Tower], listen: { added: true} },
  emptyTiles: { components: [Tile, Not(Tower)]},
  phaser: { components: [ Phaser ] }
}