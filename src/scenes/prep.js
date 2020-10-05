import Phaser from "phaser";
import {Tower} from "../components";
import SuperScene from "./super";

export default class Prep extends SuperScene {
  create() {
    super.create();
    this.input.on("gameobjectdown", (p, g) => this.onObjectClicked(g));

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("play");
    });
  }

  onObjectClicked(gameObject) {
    const coords = gameObject.getData("coords");
    console.log("clicked: ", coords);
    this.game.world.createEntity().addComponent(Tower, {x: coords[0], y: coords[1]});
  }
}
