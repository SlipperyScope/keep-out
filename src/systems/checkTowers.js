import { System } from 'ecsy';
import { Tile, Tower, CheckTower, Path, Stats, Sprite } from '../components';

export default class CheckTowerSystem extends System {
    execute(delta) {
        this.queries.toCheck.results.forEach(ent => {
            let stats = this.queries.stats.results[0].getMutableComponent(Stats);
            const tower = ent.getComponent(Tower);
            if (this.checkPath(ent.getComponent(Path).path) && this.checkMoney(stats, tower)) {
                stats.money -= tower.price;
                ent.removeComponent(Sprite);
                console.log("Tower successfully added at (", tower.x, tower.y, "). You have $",stats.money);
            } else {
                ent.removeComponent(Tower);
                ent.getMutableComponent(Tile).isOccupied = false;
            }
            ent.removeComponent(Path);
            ent.removeComponent(CheckTower);
        });
    }

    checkPath(path) {
        const goodPath = path.length;
        if (!goodPath) {
            console.log("Tower would block path");
        }
        return goodPath;
    }

    checkMoney(stats, tower) {
        const canAfford = tower.price <= stats.money;
        if (!canAfford) {
            console.log("Not enough money for tower at (", tower.x, tower.y, "). You have $",stats.money);
        }
        return canAfford;
    }

}
CheckTowerSystem.queries = { 
  toCheck: { components: [Tower, CheckTower, Tile, Path] },
  stats: { components: [Stats]},
}