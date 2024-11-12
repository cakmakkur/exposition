class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.width = this.effect.cellSize;
    this.height = this.effect.cellSize;
    this.srcX = (x / this.effect.width) * this.effect.backgroundImage.width;
    this.srcY = (y / this.effect.height) * this.effect.backgroundImage.height;
    this.srcWidth =
      (this.width / this.effect.width) * this.effect.backgroundImage.width;
    this.srcHeight =
      (this.height / this.effect.height) * this.effect.backgroundImage.height;
    this.x = this.srcX;
    this.y = this.srcY;

    this.imageMap = this.effect.imageMap;

    this.slideIntensity = 5;

    this.slideX = Math.random() * this.slideIntensity;
    this.slideY = Math.random() * this.slideIntensity;

    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * this.slideIntensity;
    this.angleSpeed = 0.1;
  }

  draw() {
    this.effect.ctx.drawImage(
      this.effect.backgroundImage,
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
    this.x = this.srcX + Math.cos(this.angle) * this.radius;
    this.y = this.srcY + Math.sin(this.angle) * this.radius;

    this.angle += this.angleSpeed;
  }
}

class Line {
  constructor(context, width, height) {
    this.ctx = context;
    this.width = width;
    this.height = height;

    this.randomNumber = Math.random();

    this.colors = ["#716533", "#252935", "#5C3C20"];

    this.x = this.width / 2;
    this.y = this.height / 2;

    this.direction = Math.random() > 0.5 ? "vertical" : "horizontal";

    if (this.direction === "vertical") {
      this.targetX = Math.round(Math.random() * this.width);
      this.targetY = Math.random() > 0.5 ? 0 : this.height;
    } else {
      this.targetX = Math.random() > 0.5 ? 0 : this.width;
      this.targetY = Math.round(Math.random() * this.height);
    }

    this.distance = Math.hypot(this.x - this.targetX, this.y - this.targetY);
    this.speed = Math.random() * 10 + 5;

    this.stack = [{ x: this.x, y: this.y }];
    this.lineWidth = Math.random() * 3 + 2;
    this.color =
      Math.random() > 0.66
        ? this.colors[0]
        : Math.random() > 0.33
          ? this.colors[1]
          : this.colors[2];
    this.stackMaxSize = this.randomNumber * 10 + 10;
    this.stepsCounter = 0;
  }

  drawLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.stack[0].x, this.stack[0].y);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth + Math.random() * 3;

    this.stack.forEach((point) => {
      this.ctx.lineTo(point.x, point.y);
    });

    this.ctx.stroke();
  }

  update() {
    if (this.direction === "vertical") {
      this.x += (this.targetX - this.x) / this.speed + Math.random() * 60 - 30;
      this.y += (this.targetY - this.height / 2) / this.speed / 4;
    } else {
      this.x += (this.targetX - this.width / 2) / this.speed / 4;
      this.y += (this.targetY - this.y) / this.speed + Math.random() * 60 - 30;
    }

    this.stack.push({ x: this.x, y: this.y });
    this.stepsCounter++;

    if (this.stack.length > this.stackMaxSize) {
      this.stack.shift();
    }
  }
}

class Effect {
  ctx;
  width;
  height;

  constructor(ctx, width, height, img) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.backgroundImage = img;
    this.lines = [];
    this.cellSize = 40;
    this.grid = [];
    this.imageMap = [];
    this.mapImage();
    this.createGrid();

    this.fps = 20;
    this.lasttTime = 0;
    this.interval = 1000 / this.fps;
    this.timer = 0;
    this.animationFrameId = null;

    this.createInitialLines();
  }

  createLine() {
    const line = new Line(this.ctx, this.width, this.height);
    this.lines.push(line);
  }

  createInitialLines() {
    for (let i = 0; i < 30; i++) {
      this.createLine();
    }
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

        const cell = { r, g, b, a };
        row.push(cell);
      }
      this.imageMap.push(row);
    }
  }

  createGrid() {
    for (let y = 0; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        this.grid.push(new Cell(this, x, y));
      }
    }
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      this.grid.forEach((cell) => {
        cell.draw();
        cell.update();
      });
      this.ctx.restore();

      this.lines.forEach((line, i) => {
        if (
          line.stack[0].x > this.width ||
          line.stack[0].x < 0 ||
          line.stack[0].y > this.height ||
          line.stack[0].y < 0
        ) {
          this.lines.splice(i, 1);
          this.createLine();
        } else {
          line.drawLine();
          line.update();
        }
      });

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
