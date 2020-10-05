import Phaser from "phaser";
import Background from "../assets/Sprites/background.png"
import Turretbase from "../assets/Sprites/turret-tile-base.png"
import EmptyTile from "../assets/Sprites/empty-tile.png"
import robot from "../assets/Sprites/robot-1.png"
import TurretTile from "../assets/Sprites/turret-tile.png"
import SuperScene from "./super";

export default class Menu extends SuperScene {
  preload() {
    this.load.image("Background",Background);
    this.load.image("Turretbase",Turretbase);
    this.load.image("EmptyTile",EmptyTile);
    this.load.image("robot",robot);
    this.load.image("TurretTile",TurretTile);
  }

  create() {
    super.create();
    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceKey.on("down", () => {
      this.scene.switch("prep");
    });
  }
}
