// src/Game.ts
import Phaser from "phaser";

const LOCAL_STORAGE_KEY = "etherbull";

class MyGame extends Phaser.Scene {
  private price = 1;
  private priceText: Phaser.GameObjects.Text;
  private ethereumImage: Phaser.GameObjects.Image;
  private arrowText: Phaser.GameObjects.Text;
  private lastResetTime = 0;

  constructor() {
    super("game");
    this.price = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 1;
  }

  preload() {
    // Load assets here
    console.log("Hello, Phaser!");

    this.load.image("ethereum_is_good", `ethereum_is_good.jpeg`);
  }

  create() {
    this.add
      .text(580, 160, "ETHER BULL v2", {
        fontSize: "156px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(160, 500, "ETH will be", {
        fontSize: "78px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      })
      .setOrigin(0, 1);
    this.priceText = this.add
      .text(1000, 500, "$" + this.price, {
        fontSize: "120px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      })
      .setOrigin(1, 1);
    this.ethereumImage = this.add
      .image(580, 600, "ethereum_is_good")
      .setOrigin(0.5, 0);
    this.ethereumImage.setInteractive();
    this.ethereumImage.on("pointerdown", this.onImageClick, this);

    this.arrowText = this.add
      .text(0, 0, "↑", {
        fontSize: "72px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    this.arrowText.setVisible(false);
  }

  update(time: number) {
    if (time - this.lastResetTime >= 1000) {
      this.ethereumImage.setScale(1);
      this.lastResetTime = time;
    }
  }

  private onImageClick(pointer: Phaser.Input.Pointer) {
    this.tweens.add({
      targets: this.ethereumImage,
      scale: 0.98,
      duration: 30,
      yoyo: true,
    });
    // Increase price
    this.price++;
    this.priceText.setText("$" + this.price);
    localStorage.setItem(LOCAL_STORAGE_KEY, this.price.toString());

    const newArrow = this.add
      .text(pointer.x, pointer.y, "up↑", {
        fontSize: "72px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: newArrow,
      y: "-=500",
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        newArrow.destroy();
      },
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  // width: 800,
  // height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    parent: "phaser",
    width: "1160",
    height: "2040",
    // min: {
    //   width: 1160,
    //   height: 640,
    // },
    // max: {
    //   width: 1160,
    //   height: 2040,
    // }, // orientation: Phaser.Scale.Orientation.PORTRAIT,
  },
  scene: MyGame,
};

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}
