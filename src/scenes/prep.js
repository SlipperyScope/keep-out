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
    this.menu = this.storeMenu(this.game.config.width, this.game.config.height - menuHeight, menuHeight);

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
    console.log(this.menu.displayWidth);
    this.tweens.add({
      targets: this.menu,
      ease: 'Quad.easeIn',
      x: this.game.config.width - 360, // Game jam
      duration: 300
    });
  }

  menuOut() {
    this.tweens.add({
      targets: this.menu,
      ease: 'Quad.easeOut',
      x: this.game.config.width,
      duration: 300
    });
  }

  storeMenu(x, y, menuHeight) {
    const container = this.add.container(x, y);
    container.depth = 9999;

    const bg = this.add.image(0, 50, 'MenuBackground');
    bg.displayHeight = menuHeight;
    bg.scaleX = bg.scaleY;
    bg.setOrigin(0, 0);

    container.add(bg);
    return container;
  }

  onObjectClicked(gameObject) {
    const coords = gameObject.getData("coords");
    console.log("clicked: ", coords);
    this.game.world.createEntity().addComponent(Tower, {x: coords[0], y: coords[1]});
  }
}
