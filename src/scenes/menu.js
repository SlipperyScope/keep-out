import Phaser from "phaser";
import logoImg from "../assets/logo.png";

export default class Menu extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
    this.game.world.execute();
  }

  create() {
    const logo = this.add.image(640, 150, "logo");

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 1000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
