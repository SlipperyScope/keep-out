import Game from './game.js';
import World from './world.js';
import { Phaser } from './components.js';

const world = new World();
const game = new Game(world);
game.scene.start('menu');

// Create Phaser singleton entity so ECSY systems can interact with the scene and the renderer and stuff
world.world.createEntity().addComponent(Phaser, { game });

world.execute();
