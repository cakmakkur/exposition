class Particle {
  constructor(context, x, y, width, height, imageMap, effect) {
    this.x = x;
    this.y = y;
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.effect = effect;
    this.dropSize = Math.floor(Math.random() * 3 + 1);

    this.lifeSpan = Math.random() * 240 + 120;
    this.counter = 0;

    this.mappedY = Math.floor(this.y);
    this.mappedX = Math.floor(this.x);
    this.speed = Math.random() * 0.5 + 0.2;
    this.ease = 1 / this.lifeSpan;

    this.imageMap = imageMap;

    this.r = this.imageMap[this.mappedY][this.mappedX].r;
    this.g = this.imageMap[this.mappedY][this.mappedX].g;
    this.b = this.imageMap[this.mappedY][this.mappedX].b;
    this.a = this.imageMap[this.mappedY][this.mappedX].a;

    this.color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.dropSize, 0, Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {
    if (this.y > this.height || this.counter > this.lifeSpan) {
      this.y = Math.random() * this.height;

      this.mappedY = Math.floor(this.y);

      this.r = this.imageMap[this.mappedY][this.mappedX].r;
      this.g = this.imageMap[this.mappedY][this.mappedX].g;
      this.b = this.imageMap[this.mappedY][this.mappedX].b;
      this.a = this.imageMap[this.mappedY][this.mappedX].a;

      this.color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
      this.dropSize = Math.floor(Math.random() * 3 + 1);
      this.speed = Math.random() * 0.5 + 0.2;
      this.lifeSpan = Math.random() * 240 + 120;
      this.ease = 1 / this.lifeSpan;
      this.counter = 0;
    } else {
      this.a -= 0.5;
      this.color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
      this.y += this.speed * (1 - this.ease);
      this.ease = this.counter / this.lifeSpan;
      this.counter++;
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

    this.cellSize = 1;
    this.particles = [];

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height - this.height / 10
    );
    this.imageMap = [];
    this.mapImage();

    this.createInitialParticles();
  }

  mapImage() {
    const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y += this.cellSize) {
      let row = [];

      for (let x = 0; x < this.width; x += this.cellSize) {
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

  createInitialParticles() {
    for (let i = 0; i < this.width; i += 5) {
      this.createParticle(i);
    }
  }

  createParticle(x) {
    const randomY = Math.random() * this.height;

    const particle = new Particle(
      this.ctx,
      x,
      randomY,
      this.width,
      this.height,
      this.imageMap,
      this
    );
    const r = this.imageMap[Math.floor(randomY)][x].r;
    const g = this.imageMap[Math.floor(randomY)][x].g;
    const b = this.imageMap[Math.floor(randomY)][x].b;
    if (r !== 0 && g !== 0 && b !== 0) {
      this.particles.push(particle);
    }
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (timeStamp % 10000 < 100) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height - this.height / 10
      );
    }

    this.ctx.save();
    this.ctx.globalAlpha = 0.05;
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height - this.height / 10
    );
    this.ctx.restore();

    if (this.timer) {
      this.particles.forEach((particle) => {
        particle.draw();
        particle.update();
      });

      this.timer = 1;
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
