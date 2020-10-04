import { System, Not } from 'ecsy';
import { Tile, Tower } from '../components';

export default class TowerSystem extends System {
  execute(delta) {
    this.queries.newTowers.results.forEach(t => {           
        let tower = t.getComponent(Tower);
        let matchingTileEntity = this.queries.emptyTiles.results.find(et => {
            let { x, y } = et.getComponent(Tile);
            return x === tower.x && y === tower.y;
        });

        if (matchingTileEntity) {
            const towerData = {x: tower.x, y: tower.y, damage: tower.damage};
            matchingTileEntity.addComponent(Tower, towerData);
            matchingTileEntity.getMutableComponent(Tile).isOccupied = true;
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
}