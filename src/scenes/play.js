import Phaser from "phaser";
import { EnemyEmitter } from "../components";
import SuperScene from "./super";

export default class Play extends SuperScene {
  create() {
    super.create();
    this.game.world.createEntity().addComponent(EnemyEmitter, { isRunning: true, remaining: 30, releaseRate: 10 });

    this.hud = new Hud(this, 40, this.game.config.height - 100);

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}

class Hud extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(...arguments);
    this.depth = 9999;

    this.text = scene.add.text(0, 0, 'XX', {
      fontFamily: 'sans-serif',
      fontSize: 32,
      color: '#F00',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000',
        blur: 1,
        stroke: true,
      },
      stroke: '#FFF',
      strokeThickness: 2,
    });

    this.add(this.text);
    scene.add.existing(this);
  }

  setHealth(health) {
    this.text.text = health;
  }
}
