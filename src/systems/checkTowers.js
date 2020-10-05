import { System, Not } from 'ecsy';
import { Tile, Tower, CheckTower, TowerHover, TowerHoverEnd, ShowRange, Path, Stats, Sprite } from '../components';

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

        this.checkHovers();
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

    checkHovers() {
        if (this.queries.hoverEnds.results.length) {
            this.queries.hoverTiles.results.slice().forEach(ent => {
                ent.removeComponent(ShowRange);
            });
        }
        this.queries.hoverEnds.results.forEach(ent => {
            ent.removeComponent(TowerHoverEnd);
        });

        this.queries.hovers.results.forEach(ent => {
            const towerHover = ent.getComponent(TowerHover);
            let matchingTileEntity = this.queries.emptyTiles.results.find(et => {
                let { x, y } = et.getComponent(Tile);
                return x === towerHover.x && y === towerHover.y;
            });
            if (matchingTileEntity) {
                const tile = matchingTileEntity.getComponent(Tile);
                this.queries.tiles.results.forEach(tEnt => {
                    const t = tEnt.getComponent(Tile);
                    if (Math.hypot(t.x - tile.x, t.y - tile.y) <= 1) {
                        tEnt.addComponent(ShowRange);
                    }
                });
            }
            ent.removeComponent(TowerHover);
        });
    }
}
CheckTowerSystem.queries = { 
  toCheck: { components: [Tower, CheckTower, Tile, Path] },
  tiles: { components: [Tile] },
  emptyTiles: { components: [Tile, Not(Tower)] },
  hoverTiles: { components: [Tile, ShowRange] },
  hovers: { components: [TowerHover] },
  hoverEnds: { components: [TowerHoverEnd] },
  stats: { components: [Stats] },
}