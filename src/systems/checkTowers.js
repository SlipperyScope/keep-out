import { System } from 'ecsy';
import { Tile, Tower, CheckTower, Phaser, Path } from '../components';

export default class CheckTowerSystem extends System {
    execute(delta) {
        const game = this.queries.phaser.results[0].getComponent(Phaser).game;
        const activeScene = game.scene.scenes.filter(s => game.scene.isVisible(s.scene.key))[0];
        this.queries.toCheck.results.forEach(ent => {
            if (ent.getComponent(Path).path.length) {
                activeScene.add.image(0, 0, "logo").setInteractive().setData("coords", [0, 1]);
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
  phaser: { components: [ Phaser ] }
}