import Phaser from "phaser";
import { EnemyEmitter } from "../components";

export default class Play extends Phaser.Scene {
  create() {
    this.game.world.createEntity().addComponent(EnemyEmitter, { isRunning: true, remaining: 1, releaseRate: 10 });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
