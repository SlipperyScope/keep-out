import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import {Tower} from "../components";

export default class Prep extends Phaser.Scene {
  create() {
    const logo = this.add.image(100, 400, "logo").setInteractive().setData("coords", [5, 9]);
    this.input.on("gameobjectdown", (p, g) => this.onObjectClicked(g));

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

  onObjectClicked(gameObject) {
    const coords = gameObject.getData("coords");
    console.log("clicked: ", coords);
    this.game.world.createEntity().addComponent(Tower, {x: coords[0], y: coords[1]});
  }
}
