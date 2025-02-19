class Particle {
  constructor(context, x, y, width, height, imageMap, effect) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.effect = effect;

    this.animationFrameId = null;

    this.mappedY = Math.floor(this.y);
    this.mappedX = Math.floor(this.x);
    this.speed = Math.random() * 0.3;
    this.radius = Math.random() * 2;

    this.colors = [
      "rgb(113,35,41",
      "rgb(89,50,60",
      "rgb(152,66,45",
      "rgb(167,55,90",
      "rgb(91,147,183",
      "rgb(90,100,122",
      "rgb(0,0,0",
    ];
    this.randomNum = Math.floor(Math.random() * this.colors.length);

    this.imageMap = imageMap;
    this.a = this.imageMap[this.mappedY][this.mappedX].a;

    // this.color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;

    if (this.a !== 0) {
      this.color = this.colors[this.randomNum];
    } else {
      this.color = `rgba(0,0,0,0)`;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(this.x, this.y, 1, 1);
    // this.ctx.fill();
  }

  update() {
    this.mappedY = Math.floor(this.y);
    this.mappedX = Math.floor(this.x);

    if (this.y > this.height) {
      this.y = 0;
      this.x = this.originalX;
      this.speed = Math.random() * 0.3;
      this.radius = Math.random() * 2;
    } else {
      this.y += this.speed;
      this.x += this.speed / 3;
    }

    if (
      this.mappedY >= 0 &&
      this.mappedY < this.imageMap.length &&
      this.mappedX >= 0 &&
      this.mappedX < this.imageMap[0].length
    ) {
      this.a = this.imageMap[this.mappedY][this.mappedX].a;

      if (this.a !== 0) {
        this.color = this.colors[this.randomNum];
      } else {
        this.color = `rgba(0,0,0,0)`;
      }
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

    const text = "Die Sängerin";
    this.ctx.font = `bold ${this.width * 0.16}px Papyrus`;
    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, 15, 100);

    this.imageMap = [];
    this.mapImage();
    this.createInitialParticles();
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    for (let k = 0; k < 15; k++) {
      for (let i = 0; i < this.width; i++) {
        this.createParticle(i);
      }
    }
  }

  createParticle(x) {
    const particle = new Particle(
      this.ctx,
      x,
      0,
      this.width,
      this.height,
      this.imageMap,
      this
    );
    this.particles.push(particle);
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const text = "Die Sängerin";
      this.ctx.font = "bold 110px Papyrus";
      this.ctx.fillStyle = "rgba(180, 180, 172, 1)";
      this.ctx.fillText(text, 15, 100);

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
