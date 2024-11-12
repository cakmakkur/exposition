class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.imageMap = this.effect.imageMap;

    this.srcX = (this.x / this.effect.width) * this.effect.image.width;
    this.srcY = (this.y / this.effect.height) * this.effect.image.height;
    this.srcWidth = (this.width / this.effect.width) * this.effect.image.width;
    this.srcHeight =
      (this.height / this.effect.height) * this.effect.image.height;

    if (
      this.x + this.width < this.effect.width &&
      this.y + this.height < this.effect.height
    ) {
      let totalBrightness = 0;
      for (let y = this.y; y < this.y + this.effect.cellHeight; y++) {
        for (let x = this.x; x < this.x + this.effect.cellWidth; x++) {
          const brightness = this.effect.imageMap[y][x].brightness;
          totalBrightness += brightness;
        }
      }
      const averageBrightness =
        totalBrightness / (this.effect.cellWidth * this.effect.cellHeight);
      this.brightness = averageBrightness;
    }

    this.slideIntensity = 4 * this.brightness;
    this.slideEffectBrightnessThresshold = 1.3;
    this.slideX = Math.random() * this.slideIntensity;
    this.slideY = Math.random() * this.slideIntensity;
  }

  draw() {
    this.effect.ctx.drawImage(
      this.effect.image,
      this.srcX,
      this.srcY,
      this.srcWidth,
      this.srcHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    if (this.brightness > this.slideEffectBrightnessThresshold) {
      this.slideX = Math.random() * this.slideIntensity + 3;
      this.slideY = Math.random() * this.slideIntensity + 3;
      this.srcX =
        (this.x / this.effect.width) * this.effect.image.width + this.slideX;
      this.srcY =
        (this.y / this.effect.height) * this.effect.image.height + this.slideY;
    }
  }
}

class Effect {
  constructor(ctx, width, height, image) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.image = image;

    this.lasttTime = 0;
    this.timer = 1;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.animationFrameId = null;

    this.cellWidth = 15;
    this.cellHeight = 15;

    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.imageMap = [];
    this.mapImage();

    this.grid = [];
    this.gridVisible = false;
    this.createGrid();
    window.addEventListener("keydown", (e) => {
      if (e.key === "g") {
        this.toggleGrid();
      }
    });
  }

  relativeBrightness(r, g, b) {
    return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) / 100;
  }

  mapImage() {
    const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y++) {
      let row = [];

      for (let x = 0; x < this.width; x++) {
        const index = (y * this.width + x) * 4;

        const r = pixelData[index];
        const g = pixelData[index + 1];
        const b = pixelData[index + 2];
        const a = pixelData[index + 3];

        const brightness = this.relativeBrightness(r, g, b);

        const cell = { r, g, b, a, brightness };
        row.push(cell);
      }
      this.imageMap.push(row);
    }
  }

  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.grid.push(new Cell(this, x, y));
      }
    }
  }

  drawGrid() {
    this.grid.forEach((cell) => {
      this.ctx.beginPath();
      this.ctx.rect(cell.x, cell.y, cell.width, cell.height);
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      this.ctx.stroke();
    });
  }

  toggleGrid() {
    if (this.gridVisible) {
      this.gridVisible = false;
    } else {
      this.gridVisible = true;
    }
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.grid.forEach((cell) => {
        cell.draw();
        cell.update();
      });

      if (this.gridVisible) {
        this.drawGrid();
      }

      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }
}

export default Effect;
