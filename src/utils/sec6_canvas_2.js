// text particle canvas

class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;

    this.originX = x;
    this.originY = y;
    this.x = this.originX;
    this.y = this.originY;

    this.color = color;

    this.randomNumber = Math.random();

    this.pixelSize = 2;

    this.ease = Math.random() * 0.001 + 0.005;
  }

  draw() {
    this.effect.ctx.fillStyle =
      this.randomNumber > 0.66
        ? "#716533"
        : this.randomNumber > 0.33
          ? "#252935"
          : "#5C3C20";
    this.effect.ctx.fillRect(this.x, this.y, this.pixelSize, this.pixelSize);
  }

  update() {
    const f = Math.abs(this.x - this.originX) / this.effect.width + 0.7;
    this.x += (this.originX - this.x) * Math.pow(this.ease, f);
    this.y += (this.originY - this.y) * Math.pow(this.ease, f);
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

    this.fps = 20;
    this.lasttTime = 0;
    this.interval = 1000 / this.fps;
    this.timer = 0;
    this.animationFrameId = null;

    this.particles = [];
    this.grid_size = 5;

    this.writeText();
    this.convertToParticles();
  }

  writeText() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "110px palatino";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Auf der Spur", this.width / 2, 140);
  }

  convertToParticles() {
    const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let y = 0; y < this.height; y += this.grid_size) {
      for (let x = 0; x < this.width; x += this.grid_size) {
        const index = (y * this.width + x) * 4;
        const alpha = pixelData[index + 3];

        if (alpha !== 0) {
          const r = pixelData[index];
          const g = pixelData[index + 1];
          const b = pixelData[index + 2];
          const a = pixelData[index + 3];
          const color = `rgb(${r}, ${g}, ${b}, ${a})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
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
