import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import BrownRock from "../assets/Sprites/brown_rock.png";
import GreenRock from "../assets/Sprites/green_rock.png";
import BadRock from "../assets/Sprites/bad_rock.png";

export default class Menu extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
    this.load.image("brownRock", BrownRock);
    this.load.image("greenRock", GreenRock);
    this.load.image("badRock", BadRock);
  }

  create() {
    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
