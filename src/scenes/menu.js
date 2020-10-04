import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import BrownRock from "../assets/Sprites/brownRock.png"
import GreenRock from "../assets/Sprites/greenRock.png"

export default class Menu extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
    this.load.image("brownRock",BrownRock);
    this.load.image("greenRock",GreenRock)
  }

  create() {

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
