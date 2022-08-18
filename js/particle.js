class SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    // super(x, y, d);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = morphAmmount;
    this.randomN = round(random(1, 11)) / 10;
  }
}

class ShrinkParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d);
    this.morphAmmount = morphAmmount;
  }
  update() {
    strokeWeight(2);
    fill(0, colorChange + 70, 0);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
      this.y = -1000; // A bit hacky, but particle is gone and shrinking only happens once ;D
      // how to make a particle disappear?
    }

    this.x += random(-1, 1);
    this.y += random(-1, 1);
    // this inside gameplay-function
    if (player.y < height * 0.5) {
      this.y += gameSpeed * 0.1;
    }
  }
}

class GrowParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d);
    this.morphAmmount = -morphAmmount;
  }
  update() {
    strokeWeight(2);
    fill(colorChange + 70, 0, 0);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
      this.y = -1000; // A bit hacky, but particle is gone and shrinking only happens once ;D
      // how to make a particle disappear?
    }

    this.x += random(-1, 1);
    this.y += random(-1, 1);
    // this inside gameplay-function
    if (player.y < height * 0.5) {
      this.y += gameSpeed * 0.1;
    }
  }
}

// movIt Function would be good here

class RandomParticle {
  constructor() {
    let randomX = random(0, width);
    let randomY = random(0, height);
    let randomD = random(10, 20);
    this.collided = false;
    this.x = randomX;
    this.y = randomY;
    this.d = randomD;
  }

  update() {
    strokeWeight(2);
    fill(colorChange, colorChange, colorChange);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      this.collided = true;
      score++;
    }

    if (this.x < 0 + this.d) {
      this.x = 10;
    }
    if (this.x > width - this.d) {
      this.x = width - 10;
    }
    if (this.y < 0 + this.d) {
      this.y = height - 10;
    }
    if (this.y > height - this.d) {
      this.y = 10;
    }
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}
