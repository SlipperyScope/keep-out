import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import {Tower} from "../components";

export default class Prep extends Phaser.Scene {
  create() {
    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("play");
    });

    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    tKey.on("down", () => {
      console.log("add tower");
      this.game.world.createEntity().addComponent(Tower, {x: 0, y: 4});
    });
  }
}
