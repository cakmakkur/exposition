class Symbol {
  #fillStyle;

  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲガギグゲゴザジズダヂヅバビブベボヷヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.colorPalette = ["rgba(174,125,82,1)", "rgba(128,66,70,1"];
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.text = "";
    this.#selectRandomColor();
  }

  #selectRandomColor() {
    this.randomColorIndex = Math.random() > 0.5 ? 1 : 0;
    this.fillStyle = this.colorPalette[this.randomColorIndex];
  }

  draw(context) {
    document.fonts.ready.then(() => {
      // Now the fonts are available to use
      context.font = this.fontSize + "px Chokokutai";
      this.text = this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
      context.fillStyle = this.fillStyle;
      // context.font = this.fontSize + "px monospace";
      context.fillText(
        this.text,
        this.x * this.fontSize,
        this.y * this.fontSize
      );
      if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.975) {
        this.y = 0;
        this.#selectRandomColor();
      } else {
        this.y += 1;
      }
    });
  }
}

class Effect {
  constructor(canvasHeight, canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }

  #initialize() {
    // fill the first row
    for (let i = 0; i < this.columns; i++) {
      this.symbols.push(new Symbol(i, 0, this.fontSize, this.canvasHeight));
    }
  }
}

export { Effect, Symbol };
