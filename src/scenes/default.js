import Phaser from "phaser";
import logoImg from "../assets/logo.png";

export default class DefaultScene extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
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
  }
}
