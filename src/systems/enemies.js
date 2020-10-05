import { System } from 'ecsy';
import { Phaser, Path, EnemyEmitter, Enemy, Location, Stats } from '../components';

export default class EnemiesSystem extends System {
  constructor() {
    super(...arguments);
    this.index = 0;
  }

  execute() {
    this.updateEnemies();
    this.updateEmitter();
  }

  updateEnemies() {
    let stats = this.queries.stats.results[0].getMutableComponent(Stats);
    this.queries.enemies.results.forEach(ent => {
      const location = ent.getMutableComponent(Location);
      const path = ent.getComponent(Path);
      const enemy = ent.getMutableComponent(Enemy);
      if (enemy.health <= 0) {
        console.log(`${enemy.name} has died`);
        stats.money += 10;
        ent.removeAllComponents();
      }
      if(enemy.cooldown === 0) {
        if (path.path.length) {
          const currentIndex = path.path.findIndex(coord => coord[0] === location.x && coord[1] === location.y);
          if (currentIndex === path.path.length - 1) {
            stats.health -= 1;
            console.log(`${enemy.name} made it to the end. You have ${stats.health} hp`);
            ent.removeAllComponents();
          } else {
            const [nextX, nextY] = path.path[currentIndex + 1];
            location.x = nextX;
            location.y = nextY;
            enemy.cooldown = 10 //gamejam, match it to the emitter so they are not on top of each other
          }
        }
      }else{enemy.cooldown--;}
    });
  }

  updateEmitter() {
    const game = this.queries.phaser.results[0].getComponent(Phaser).game;

    this.queries.emitters.results.forEach(ent => {
      const emitter = ent.getMutableComponent(EnemyEmitter);
      if (emitter.isRunning) {
        if (emitter.cooldown === 0) {
          // Add an enemy. Is this an okay thing to do? Idk, it works...
          game.world.createEntity()
            .addComponent(Enemy, { name: `Enemy ${this.index}`, health: 100, speed: .01 })
            .addComponent(Path, { from: [0,0], to: [11,3] })
            .addComponent(Location, { x: 0, y: 0 })

          this.index++;
          emitter.remaining--;
          // console.log(`Spawning an enemy, ${emitter.remaining} to go!`);

          emitter.cooldown = emitter.releaseRate;
          if (emitter.remaining === 0) {
            emitter.isRunning = false;
            console.log('No more enemies');
          }
        } else {
          emitter.cooldown--;
        }
      }
    });
  }
}

EnemiesSystem.queries = {
  emitters: { components: [ EnemyEmitter ] },
  enemies: { components: [ Enemy, Path, Location ] },
  phaser: { components: [ Phaser ] },
  stats: { components: [Stats]},
}
