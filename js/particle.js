class SpecialParticle {
  constructor(x, y, d, morphAmmount, sound) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = morphAmmount;
    this.sound = sound;
    this.randomN = round(random(1, 11)) / 10;
    this.collided = false;
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  update() {
    strokeWeight(1);
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.d);

    const hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      this.sound.play();
      this.collided = true;
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
    }

    const distance = dist(this.x, this.y, player.x, player.y);

    if (this.y > height + 20) this.collided = true;

    if (distance < 300) {
      this.x += random(-1, 1);
      this.y += random(-1, 1);
    }

    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }
  }
}

class ShrinkParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount, sound) {
    super(x, y, d, morphAmmount);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = morphAmmount;
    this.g = 230;
    this.sound = minimize;
  }
}

class GrowParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount, sound) {
    super(x, y, d, morphAmmount, sound);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = -morphAmmount;
    this.r = 230;
    this.sound = maximize;
  }
}

class RandomParticle {
  constructor() {
    const randomX = random(20, width - 20);
    const randomY = random(0, height * 0.7);
    const randomD = random(8, 22);
    this.collided = false;
    this.x = randomX;
    this.y = randomY;
    this.d = randomD;
  }

  update() {
    strokeWeight(1);
    fill(200, 200, 0, colorChange / 2 - 20);
    circle(this.x, this.y, this.d);

    const hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      bop.play();
      this.collided = true;
      score += round(this.d / 10);
    }

    if (this.x < 0 + this.d) {
      this.x = 10;
    }
    if (this.x > width - this.d) {
      this.x = width - 10;
    }
    if (this.y > height + 20) this.collided = true;
  }

  move() {
    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }
    if (player.grow) {
      this.x += random(-0.5, 0.5);
      this.y += random(-0.5, 0);
    }

    if (!player.grow) {
      this.x += random(-0.5, 0.5);
      this.y += random(0, 0.5);
    }
  }
}
