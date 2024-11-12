class Particle {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.x = Math.random() * this.canvasWidth;
    this.y = 0;
    this.speed = Math.random() * 0.3 + 0.5;
    this.gaveBirth = false;
  }
}

class Effect {
  constructor(context, windowWidth, windowHeight) {
    this.ctx = context;
    this.canvasWidth = windowWidth;
    this.canvasHeight = windowHeight;
    this.particleSize = 4;
    this.particles = [];
    this.#initiate();
    this.ctx.fillStyle = "white";
    this.animationFrameId = null;
  }

  #initiate() {
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.canvasWidth));
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.particles.forEach((particle, i) => {
      this.ctx.fillRect(
        particle.x,
        particle.y,
        this.particleSize,
        this.particleSize
      );
      particle.y += particle.speed;
      if (
        particle.y > this.canvasHeight / 8 &&
        !particle.gaveBirth &&
        this.particles.length < 400
      ) {
        this.particles.push(new Particle(this.canvasWidth));
        particle.gaveBirth = true;
      }
      if (particle.y > this.canvasHeight) {
        this.particles.splice(i, 1);
        this.particles.push(new Particle(this.canvasWidth));
      }
    });
  }

  animate() {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }
}

export default Effect;
