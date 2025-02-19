class Particle {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;

    this.assignTarget();

    this.pixelSize = this.effect.grid_size;

    this.ease = Math.random() * 0.001 + 0.005;
  }

  assignTarget() {
    let search = true;
    while (search) {
      const randomIndex = Math.floor(
        Math.random() * this.effect.targetColorCoordinates.length
      );
      const target = this.effect.targetColorCoordinates[randomIndex];
      // if (target.x !== this.x && target.y !== this.y) {
      //   this.targetX = target.x;
      //   this.targetY = target.y;
      //   search = false;
      // }
      this.targetX = target.x;
      this.targetY = target.y;
      search = false;
    }
  }

  draw() {
    this.effect.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.effect.ctx.fillRect(this.x, this.y, this.pixelSize, this.pixelSize);
  }

  update() {
    // const f = Math.abs(this.x - this.targetX) / this.effect.width + 0.7;
    // this.x += (this.targetX - this.x) * Math.pow(this.ease, f);
    // this.y += (this.targetY - this.y) * Math.pow(this.ease, f);
  }
}

class Effect {
  animationFrameId = null;

  constructor(ctx, width, height, img) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.img = img;
    this.particles = [];
    this.targetColorCoordinates = [];

    this.grid_size = 1;

    this.imgWidth = this.img.width;
    this.imgHeight = this.img.height;

    this.lasttTime = 0;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.timer = 0;

    this.initiate();
  }

  drawWrappedText = () => {
    this.ctx.font = "150px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    const text =
      "imagined preliminary memory, thought of lived ideas, appearing thoughts, voice circles, staring into sense, slicing time into numbers and only some letters, talk forth back and up and down, out of this orderless pieces of strings, peace and mind spring sprint sprint, make a sound and drop, imagined preliminary memory, thought of lived ideas, appearing thoughts, voice circles, staring into sense, slicing time into numbers and only some letters, talk forth back and up and down, out of this orderless pieces of strings, peace and mind spring sprint sprint, make a sound and drop";
    const lineHeight = 80;
    const maxWidth = this.width;
    const words = text.split(" ");
    let line = "";
    let testLine;
    let metrics;
    let currentY = 50;

    for (let i = 0; i < words.length; i++) {
      testLine = line + words[i] + " ";
      metrics = this.ctx.measureText(testLine);
      if (metrics.width > maxWidth + 450 && i > 0) {
        this.ctx.fillText(line, 0, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, 0, currentY);
  };

  convertToParticles() {
    const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let y = 0; y < this.height; y += this.grid_size) {
      for (let x = 0; x < this.width; x += this.grid_size) {
        const index = (y * this.width + x) * 4;
        const alpha = pixelData[index + 3];
        if (alpha !== 0) {
          this.particles.push(new Particle(this, x, y));
        }
      }
    }
  }

  analyseImgData() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.imgWidth,
      this.imgHeight,
      0,
      0,
      this.width,
      this.height
    );
    const pixelData = this.ctx.getImageData(0, 0, this.width, this.height).data;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let y = 0; y < this.height; y += 15) {
      for (let x = 0; x < this.width; x += 15) {
        const index = (y * this.width + x) * 4;
        const r = pixelData[index];
        const g = pixelData[index + 1];
        const b = pixelData[index + 2];
        const alpha = pixelData[index + 3];
        if (
          alpha !== 0 &&
          r > 150 &&
          r < 190 &&
          g > 150 &&
          g < 190 &&
          b > 150 &&
          b < 190
        ) {
          this.targetColorCoordinates.push({ x, y });
        }
      }
    }
  }

  initiate() {
    this.analyseImgData();
    this.drawWrappedText();
    this.convertToParticles();
    // console.log(this.targetColorCoordinates);
  }

  animate(timeStamp = 0) {
    const deltaTime = timeStamp - this.lasttTime;
    this.lasttTime = timeStamp;

    if (this.timer > this.interval) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.particles.forEach((particle) => {
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
