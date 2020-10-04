import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import {Tower} from "../components";

export default class Prep extends Phaser.Scene {
  preload() {
    // this.load.image("logo", logoImg);
  }

  create() {
    // const logo = this.add.image(100, 800, "logo");

    // this.tweens.add({
    //   targets: logo,
    //   x: 250,
    //   duration: 1000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1
    // });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("play");
    });

    const tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    tKey.on("down", () => {
      console.log("add tower");
      this.game.world.world.createEntity().addComponent(Tower, {x: 0, y: 4});
    });
  }
}
