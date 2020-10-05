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

    const menuHeight = 700;
    this.menuBg = this.add.image(this.game.config.width, this.game.config.height - menuHeight, 'MenuBackground');
    this.menuBg.displayHeight = menuHeight;
    this.menuBg.scaleX = this.menuBg.scaleY;
    this.menuBg.setOrigin(0, 0);
    this.menuBg.depth = 9999;

    // These don't actually work. I think it's because of the menu switching and I don't care
    // enough fix it yet.
    this.events.on('sleep', () => {
      this.menuOut();
    });

    this.events.on('wake', () => {
      this.menuIn();
    });

    this.menuIn();
  }

  menuIn() {
    this.tweens.add({
      targets: this.menuBg,
      ease: 'Quad.easeIn',
      x: this.game.config.width - this.menuBg.displayWidth,
      duration: 300
    });
  }

  menuOut() {
    this.tweens.add({
      targets: this.menuBg,
      ease: 'Quad.easeOut',
      x: this.game.config.width,
      duration: 300
    });
  }

  onObjectClicked(gameObject) {
    const coords = gameObject.getData("coords");
    console.log("clicked: ", coords);
    this.game.world.createEntity().addComponent(Tower, {x: coords[0], y: coords[1]});
  }
}
