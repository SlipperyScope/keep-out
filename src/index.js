import Game from './game.js';
import World from './world.js';

const game = new Game();
game.scene.start('menu');

const world = new World();
world.execute();
