import { System } from 'ecsy';
import { Phaser, Stats } from '../components';

export default class HudSystem extends System {
  execute() {
    const { health, money } = this.queries.stats.results[0].getComponent(Stats);
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;
    const playScene = game.scene.getScene('play');
    const prepScene = game.scene.getScene('prep');

    playScene.hud && playScene.hud.setHealth(health);
    prepScene.menu && prepScene.menu.setCurrentMoney(money);
  }
}

HudSystem.queries = {
  stats: { components: [ Stats ] },
  phaser: { components: [ Phaser ] },
}
