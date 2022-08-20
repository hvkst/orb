class SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    // super(x, y, d, morphamount);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = morphAmmount;
    this.randomN = round(random(1, 11)) / 10;
    this.collided = false;
    // this.color = `0, ${colorChange + 70}, 0`;
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  update() {
    strokeWeight(2);
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.d);

    let hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      minimize.play();
      this.collided = true;
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
    }

    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
    // this inside gameplay-function
    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }
  }
}

class ShrinkParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d, morphAmmount);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = morphAmmount;
    this.g = colorChange;
  }
}

class GrowParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d, morphAmmount);
    this.x = x;
    this.y = y;
    this.d = d;
    this.morphAmmount = -morphAmmount;
    this.r = colorChange + 70;
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
    fill(255, 0, 255, colorChange / 6);
    circle(this.x, this.y, this.d);

    let hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      slime.play();
      this.collided = true;
      score++;
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
