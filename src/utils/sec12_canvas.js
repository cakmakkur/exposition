class Cell {
  constructor(effect, x, y) {
    this.effect = effect;

    this.x = x;
    this.y = y;

    this.srcX = this.x * this.effect.scaleX;
    this.srcY = this.y * this.effect.scaleY;

    this.orgSrcWidth = this.effect.cellSize * this.effect.scaleX;
    this.orgSrcHeight = this.effect.cellSize * this.effect.scaleY;

    this.srcWidth = this.orgSrcWidth;
    this.srcHeight = this.orgSrcHeight;

    this.oscilatingTime = Math.hypot(
      this.x % this.effect.width,
      this.y % this.effect.height
    );
    this.stdTime = 0;
    this.originalAmplitude = 1.2;
    this.oscilatingAmplitude = this.originalAmplitude;
  }

  draw() {
    this.effect.ctx.drawImage(
      this.effect.img,
      this.srcX,
      this.srcY,
      this.srcWidth,
      this.srcHeight,
      this.x,
      this.y,
      this.effect.cellSize,
      this.effect.cellSize
    );
  }

  update() {
    this.srcX += Math.sin(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcY += Math.cos(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcWidth -=
      Math.sin(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.srcHeight -=
      Math.cos(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.oscilatingTime = (this.oscilatingTime + 0.3) % (2 * Math.PI);
    this.stdTime += 0.001;
    this.oscilatingAmplitude =
      this.originalAmplitude + Math.sin(this.stdTime) * 0.25;
  }

  update2() {
    this.srcX += Math.sin(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcY += Math.cos(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcWidth -=
      Math.sin(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.srcHeight -=
      Math.sin(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.oscilatingTime += 0.2;
  }

  update3() {
    this.srcX += Math.sin(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcY += Math.sin(this.oscilatingTime) * this.oscilatingAmplitude;
    this.srcWidth -=
      Math.sin(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.srcHeight -=
      Math.sin(this.oscilatingTime) * this.oscilatingAmplitude * 2;
    this.oscilatingTime += 0.2;
  }
}

class Effect {
  animationFrameId = null;

  constructor(ctx, width, height, img) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.img = img;

    this.scaleX = this.img.width / this.width;
    this.scaleY = this.img.height / this.height;

    this.lasttTime = 0;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.timer = 0;

    this.cellSize = 80;
    this.grid = [];

    this.initialize();
  }

  initialize() {
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
      this.grid.forEach((cell, i) => {
        cell.draw();
        cell.update();
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
