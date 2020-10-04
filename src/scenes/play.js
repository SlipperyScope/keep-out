import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import { EnemyEmitter } from "../components";

export default class Play extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    this.game.world.createEntity().addComponent(EnemyEmitter, { isRunning: true, remaining: 30, releaseRate: 10 });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
