import Phaser from "phaser";
import logoImg from "../assets/Sprites/logo.png";
import BrownRock from "../assets/Sprites/brown_rock.png"
import GreenRock from "../assets/Sprites/green_rock.png"

export default class Menu extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImg);
    this.load.image("brownRock",BrownRock);
    this.load.image("greenRock",GreenRock)
  }

  create() {
    // const logo = this.add.image(640, 150, "logo");

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 1000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1
    // });

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
