import { System, Not } from 'ecsy';
import { Tile, Tower, CheckTower, Phaser, Path } from '../components';

export default class TowerSystem extends System {
  execute(delta) {
    this.queries.newTowers.added.forEach(t => {
        let tower = t.getComponent(Tower);
        let matchingTileEntity = this.queries.emptyTiles.results.find(et => {
            let { x, y } = et.getComponent(Tile);
            return x === tower.x && y === tower.y;
        });

        if (matchingTileEntity) {
            //const game = this.queries.phaser.results[0].getComponent(Phaser).game;
            matchingTileEntity.addComponent(Tower, tower);
            matchingTileEntity.addComponent(CheckTower);
            matchingTileEntity.getMutableComponent(Tile).isOccupied = true;
            matchingTileEntity.addComponent(Path, { from: [0, 0], to: [9,0]});

            //move image to checkTowers
            //const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];
            //activeScene.add.image(0, 0, "logo").setInteractive().setData("coords", [0, 1]);
            
            console.log("Try to add tower at (", tower.x, ", ", tower.y, ")");
        } else {                
            console.log("Tile is occupied at (", tower.x, ", ", tower.y, ")");
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