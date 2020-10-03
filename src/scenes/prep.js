import Phaser from "phaser";
import logoImg from "../assets/logo.png";

export default class Prep extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    const logo = this.add.image(100, 800, "logo");

    this.tweens.add({
      targets: logo,
      x: 250,
      duration: 1000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    spaceKey.on("down", () => {
      this.scene.start("play");
    });
  }
}
