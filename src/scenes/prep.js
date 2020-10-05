import Phaser from "phaser";
import {Tower} from "../components";
import SuperScene from "./super";

const textStyleBig = {
  fontFamily: 'sans-serif',
  fontSize: 28,
  color: '#5059cc',
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000',
    blur: 0,
    fill: true,
  }
}

const textStyleMedium = Object.assign({}, textStyleBig, { fontSize: 22 });
const textStyleSecondary = Object.assign({}, textStyleBig, { fontSize: 14, color: '#781c1c', shadow: {} });

export default class Prep extends SuperScene {
  create() {
    super.create();
    this.input.on("gameobjectdown", (p, g) => this.onObjectClicked(g));

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on("down", () => {
      this.scene.switch("play");
    });

    const menuHeight = 700;
    this.menu = new MenuObject(this, this.game.config.width, this.game.config.height - menuHeight, menuHeight);
    this.menu.addStoreItem({ range: 5, fireRate: 8, price: 100, key: 'tower1' });

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

  onObjectClicked(gameObject) {
    const coords = gameObject.getData("coords");
    console.log("clicked: ", coords);
    this.game.world.createEntity().addComponent(Tower, {x: coords[0], y: coords[1]});
  }
}

// Game Jam!
class MenuObject extends Phaser.GameObjects.Container {
  constructor(scene, x, y, menuHeight, children) {
    super(scene, x, y, children);
    this.depth = 9999;

    this.bg = scene.add.image(0, 50, 'MenuBackground');
    this.bg.displayHeight = menuHeight;
    this.bg.scaleX = this.bg.scaleY;
    this.bg.setOrigin(0, 0);
    this.add(this.bg);

    this.currentMoney = scene.add.text(255, 170, 'XX,XXX', textStyleBig);
    this.add(this.currentMoney);

    // Contains all the store item cards
    this.storeItems = scene.add.container(140, 315);
    this.add(this.storeItems);

    scene.add.existing(this);
  }

  setCurrentMoney(money) {
    // Update some text field
    this.currentMoney.text = money;
  }

  addStoreItem(specs) {
    const item = new StoreCard(this.scene, 0, 0, specs);
    this.storeItems.add(item);
  }

  removeStoreItem(key) {
    let item = null;
    this.storeItems.iterate(child => {
      if (child.storeKey === key) item = child;
    });
    if (item) {
      // This should actually redraw the grid so there aren't holes, but game jam
      this.storeItems.remove(item);
    }
  }
}

class StoreCard extends Phaser.GameObjects.Container {
  constructor(scene, x, y, specs, children) {
    super(scene, x, y, children);

    this.storeKey = specs.key;
    this.bg = scene.add.image(-20, 0, 'StoreTileBg');
    this.rangeText = scene.add.text(-40, -54, specs.range || 'XX', textStyleSecondary);
    this.fireRateText = scene.add.text(-40, -39, specs.fireRate || 'XX', textStyleSecondary);
    this.priceText = scene.add.text(-40, 28, specs.price || 'X,XXX', textStyleMedium);
    this.previewImg = scene.add.image(0, 0, StoreCard.SpriteMap[specs.key]);

    this.bg.scaleX = this.bg.scaleY = 0.3;
    this.previewImg.scaleX = this.previewImg.scaleY = 0.3;

    this.add(this.bg);
    this.add(this.rangeText);
    this.add(this.fireRateText);
    this.add(this.priceText);
    this.add(this.previewImg);
  }
}

StoreCard.SpriteMap = {
  'tower1': 'StoreCardTower1',
}
