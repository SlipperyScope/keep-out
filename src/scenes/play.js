import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";

export default class Play extends Phaser.Scene {
  create() {

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}