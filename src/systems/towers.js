import { System, Not } from 'ecsy';
import { Tile, Tower, CheckTower, Path, Enemy, Location } from '../components';

export default class TowerSystem extends System {
  dealWithNewTowers() {
    this.queries.newTowers.added.forEach(t => {
        let tower = t.getComponent(Tower);
        let matchingTileEntity = this.queries.emptyTiles.results.find(et => {
            let { x, y } = et.getComponent(Tile);
            return x === tower.x && y === tower.y;
        });

        if (matchingTileEntity) {
            matchingTileEntity.addComponent(Tower, tower);
            matchingTileEntity.addComponent(CheckTower);
            matchingTileEntity.getMutableComponent(Tile).isOccupied = true;
            matchingTileEntity.addComponent(Path, { from: [0, 0], to: [11,3]});
            
            console.log("Try to add tower at (", tower.x, ", ", tower.y, ")");
        } else {                
            console.log("Tile is occupied at (", tower.x, ", ", tower.y, ")");
        }

        t.removeComponent(Tower);
    });
  }

  //once working we deal with cooldown/ROF
  makeTheTowersDoTheShootyThing() {
    this.queries.legitTowers.results.forEach(tEnt => {
        const tower = tEnt.getMutableComponent(Tower);
        if (tower.cooldown === 0) {
            this.queries.enemies.results.forEach(eEnt => {
                const enemyLoc = eEnt.getComponent(Location);
                //check cooldown again or do something "fancy"
                if (tower.cooldown === 0 && Math.hypot(tower.x - enemyLoc.x, tower.y - enemyLoc.y) <= tower.range) {
                    eEnt.getMutableComponent(Enemy).health -= tower.damage;
                    tower.cooldown = tower.rateOfFire;
                    console.log("tower at (", tower.x, tower.y,") hit enemy at (", enemyLoc.x,enemyLoc.y, ")");
                }
            });
        } else {
            tower.cooldown--;
        }
    });
  }

  execute(delta) {
    this.dealWithNewTowers();
    this.makeTheTowersDoTheShootyThing();
  }
}

TowerSystem.queries = {
  newTowers: { components: [Tower], listen: { added: true} },
  legitTowers: { components: [Tower, Not(CheckTower)]},
  emptyTiles: { components: [Tile, Not(Tower)]},
  enemies: { components: [Enemy, Location]},
}