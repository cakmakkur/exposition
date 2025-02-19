class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
  }
}

class Particle {
  constructor(effect, width, height) {
    this.width = width;
    this.height = height;
    this.effect = effect;

    this.x = Math.floor(Math.random() * this.width);
    this.y = Math.floor(Math.random() * this.height);
    this.effect.ctx.strokeStyle = "rgb(255, 255, 255)";
    this.previousColor = { r: 255, g: 255, b: 255 };
    this.alpha = 0.5;
    this.effect.ctx.lineWidth = Math.random() + 2;
    this.speedX;
    this.speedY;
    this.angle = 0;
    this.angleMultiplier = 50;
    this.maxLength = Math.random() * 100 + 100;
    this.speedModifier = Math.random() * 2 + 0.5;
    this.timer = Math.random() * 100 + 50;
    this.history = [
      { x: this.x, y: this.y, color: this.effect.ctx.strokeStyle },
    ];
  }

  draw() {
    this.effect.ctx.beginPath();
    this.effect.ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      this.effect.ctx.strokeStyle = this.history[i].color;
      this.effect.ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    this.effect.ctx.stroke();
  }

  update() {
    this.timer--;
    if (this.timer >= 1) {
      const gridX = Math.floor(this.x / this.effect.cellSize);
      const gridY = Math.floor(this.y / this.effect.cellSize);
      const index = gridX + gridY * this.effect.cols;

      if (index >= 0 && index < this.effect.pixelData.length) {
        this.angle = this.effect.pixelData[index].angle * this.angleMultiplier;

        const r = this.effect.pixelData[index].r;
        const g = this.effect.pixelData[index].g;
        const b = this.effect.pixelData[index].b;
        // const color = `rgb(${r}, ${g}, ${b})`;

        const lerpFactor = 0.05;
        const newR =
          (r - this.previousColor.r) * lerpFactor + this.previousColor.r;
        const newG =
          (g - this.previousColor.g) * lerpFactor + this.previousColor.g;
        const newB =
          (b - this.previousColor.b) * lerpFactor + this.previousColor.b;
        this.previousColor = {
          r: Math.round(newR),
          g: Math.round(newG),
          b: Math.round(newB),
        };

        if (this.timer < 30) {
          this.alpha -= 0.03;
        }

        const interpolatedColor = `rgba(${Math.round(newR)}, ${Math.round(
          newG
        )}, ${Math.round(newB)}, ${this.alpha})`;

        this.effect.ctx.strokeStyle = interpolatedColor;

        this.speedX = Math.cos(this.angle);
        this.speedY = Math.sin(this.angle);

        this.x += this.speedX * this.speedModifier;
        this.y += this.speedY * this.speedModifier;

        this.history.push({ x: this.x, y: this.y, color: interpolatedColor });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }
      }
    } else {
      this.reset();
    }
  }
  reset() {
    this.x = Math.floor(Math.random() * this.width);
    this.y = Math.floor(Math.random() * this.height);
    this.alpha = 0.5;
    this.history = [{ x: this.x, y: this.y, color: "white" }];
    this.timer = Math.random() * 100 + 50;
    this.maxLength = Math.random() * 100 + 100;
  }
}

class Effect {
  animationFrameId = null;

  constructor(ctx, width, height, img, img2) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.img = img;
    this.img2 = img2;

    this.lasttTime = 0;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.timer = 0;

    this.animationState = 1;

    this.cellSize = 1;
    this.rows = Math.floor(this.height / this.cellSize);
    this.cols = Math.floor(this.width / this.cellSize);

    this.pixelData = [];
    this.particles = [];
    this.initialize();
    const button = document.getElementById("section_9__btn");

    button.addEventListener("click", () => {
      if (this.animationState === 1) {
        this.particles.forEach((particle) => {
          particle.angleMultiplier = 1;
        });
        this.animationState = 2;
      } else {
        this.particles.forEach((particle) => {
          particle.angleMultiplier = 50;
        });
        this.animationState = 1;
      }
    });
  }

  initialize() {
    // create particles
    this.particles = [];
    for (let i = 0; i < 1500; i++) {
      this.particles.push(new Particle(this, this.width, this.height));
    }

    this.drawImage();
    this.scanScreen();
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawImage() {
    this.ctx.drawImage(
      this.img2,
      this.img2.width / 4,
      this.img2.height / 3,
      this.img2.width - this.img2.width / 2,
      this.img2.height - this.img2.height / 1.5,
      0,
      0,
      this.width,
      this.height
    );
  }

  scanScreen() {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height).data;
    for (let y = 0; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        const index = (x + y * this.width) * 4;
        const r = imageData[index];
        const g = imageData[index + 1];
        const b = imageData[index + 2];

        let angle = ((0.3 * r + 0.59 * g + 0.1 * b) / 255) * Math.PI;

        this.pixelData.push({ r, g, b, angle });
      }
    }
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width,
        this.img.height,
        0,
        0,
        this.width,
        this.height
      );

      this.particles.forEach((particle, i) => {
        if (particle.lifeSpanCounter > particle.lifeSpan) {
          this.particles.splice(i, 1);
          this.particles.push(new Particle(this, this.width, this.height));
        }
        particle.draw();
        particle.update();
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
