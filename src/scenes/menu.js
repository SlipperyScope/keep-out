import Phaser from "phaser";
import Background from "../assets/Sprites/background.png"
import Turretbase from "../assets/Sprites/turret-tile-base.png"
import EmptyTile from "../assets/Sprites/empty-tile.png"
import robot from "../assets/Sprites/robot-1.png"
import TurretTile from "../assets/Sprites/turret-tile.png"
import MenuBackground from "../assets/Sprites/menu-background.png"
import StoreTileBg from "../assets/Sprites/shop-card.png";
import StoreCardTower1 from "../assets/Sprites/shop-tower-basic.png";
import MainMenuArt from "../assets/Sprites/menu-art.png";
import MediGame from "../assets/Audio/MedievalDefence.wav";
import MediMenu from "../assets/Audio/MedievalMenu.mp3";

import SuperScene from "./super";

export default class Menu extends SuperScene {
  preload() {
    this.load.image("MainMenuArt", MainMenuArt);
    this.load.image("Background",Background);
    this.load.image("Turretbase",Turretbase);
    this.load.image("EmptyTile",EmptyTile);
    this.load.image("robot",robot);
    this.load.image("TurretTile",TurretTile);
    this.load.image("MenuBackground", MenuBackground);
    this.load.image("StoreTileBg", StoreTileBg);
    this.load.image("StoreCardTower1", StoreCardTower1);

    this.load.audio("dopeBeats", MediMenu);
    this.load.audio("doperBeats", MediGame);
  }

  create() {
    super.create();
    const db = this.sound.add("dopeBeats");
    db.play();
    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceKey.on("down", () => {
      db.stop();
      this.scene.switch("prep");
    });


    const menuArt = this.add.image(this.game.config.width / 2, this.game.config.height / 2,"MainMenuArt");
    menuArt.scaleX = menuArt.scaleY = 0.4;
  }
}
