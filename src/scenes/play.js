import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import {Tower} from "../components";

export default class Play extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
    this.game.world.execute();
  }

  create() {
    const logo = this.add.image(0, 0, "logo");

    this.tweens.add({
      targets: logo,
      x: 1280,
      y: 720,
      duration: 1000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });

    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    tKey.on("down", () => {
      console.log("add tower");
      this.game.world.world.createEntity().addComponent(Tower, {x: 4, y: 4});
      this.game.world.execute();
    });
  }
}
