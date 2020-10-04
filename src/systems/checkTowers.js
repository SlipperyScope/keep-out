import { System } from 'ecsy';
import { Tile, Tower, CheckTower, Path } from '../components';

export default class CheckTowerSystem extends System {
    execute(delta) {
        this.queries.toCheck.results.forEach(ent => {
            if (ent.getComponent(Path).path.length) {
                console.log("Tower successfully added at (", ent.getComponent(Tower).x, ent.getComponent(Tower).y, ")");
            } else {
                console.log("Tower would block path at (", ent.getComponent(Tower).x, ent.getComponent(Tower).y, ")");
                ent.removeComponent(Tower);
                ent.getMutableComponent(Tile).isOccupied = false;
            }
            ent.removeComponent(Path);
            ent.removeComponent(CheckTower);
        });

    }

}
CheckTowerSystem.queries = { 
  toCheck: { components: [Tower, CheckTower, Tile, Path] },
}