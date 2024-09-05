// src/Game.ts
import Phaser from "phaser";

class MyGame extends Phaser.Scene {
  private price = 1;
  private priceText: Phaser.GameObjects.Text;
  private ethereumImage: Phaser.GameObjects.Image;
  private arrowText: Phaser.GameObjects.Text;
  private lastResetTime = 0;

  constructor() {
    super("game");
  }

  preload() {
    // Load assets here
    console.log("Hello, Phaser!");

    this.load.image("ethereum_is_good", `ethereum_is_good.jpeg`);
  }

  create() {
    this.add
      .text(580, 180, "ETHER BULL", {
        fontSize: "156px",
        color: "#ffffff",
        fontFamily: "Londrina Solid",
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(220, 520, "ETH will be", {
        fontSize: "78px",
        color: "#ffffff",
        fontFamily: "Londrina Solid",
      })
      .setOrigin(0, 1);
    this.priceText = this.add
      .text(940, 520, "$" + this.price, {
        fontSize: "120px",
        color: "#ffffff",
        fontFamily: "Londrina Solid",
      })
      .setOrigin(1, 1);
    this.ethereumImage = this.add
      .image(580, 620, "ethereum_is_good")
      .setOrigin(0.5, 0);
    this.ethereumImage.setInteractive();
    this.ethereumImage.on("pointerdown", this.onImageClick, this);

    this.arrowText = this.add
      .text(580, 580, "↑", {
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
    // autoCenter: Phaser.Scale.CENTER_BOTH,
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
