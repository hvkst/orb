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

    if (player.grow) this.x += random(-1, 1);
    if (!player.grow) this.y += random(-1, 1);
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
  }
}

// movIt Function would be good here

class RandomParticle {
  constructor() {
    let randomX = round(random(0, width));
    let randomY = round(random(0, height));
    let randomD = round(random(10, 20));
    let vector = createVector(randomX, randomY);
    this.collided = false;
    this.x = vector.x;
    this.y = vector.y;
    this.d = randomD;
  }

  update() {
    strokeWeight(2);
    fill(colorChange, colorChange, colorChange);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      this.collided = true; // A bit hacky, but particle is gone and shrinking only happens once ;D
      console.log(this.collided);
    }

    if (this.x < 0 - this.d / 2) {
      this.x = width + this.d / 8;
    }
    if (this.x > width + this.d / 2) {
      this.x = 0 - this.d / 8;
    }
    if (this.y < 0 + this.d / 2) {
      this.y = 0 + this.d / 2;
    }
    if (this.y > height - this.d / 2) {
      this.y = height - this.d / 2;
    }
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }
}
