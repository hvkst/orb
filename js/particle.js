class Particle {
  constructor(x, y, d) {
    // Vectors would be nice here
    this.x = x;
    this.y = y;
    this.d = d;
  }
}

// Better here would be particle > Specialparticle > growParticle & shrinkParticle

class SpecialParticle extends Particle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d);
    this.morphAmmount = morphAmmount;
  }
}

class ShrinkParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d);
    this.morphAmmount = morphAmmount;
  }
  update() {
    let randomN = random(0, 1);
    strokeWeight(2);
    fill(0, colorChange + randomN * 10, 0);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
      this.y = -1000; // A bit hacky, but particle is gone and shrinking only happens once ;D
      // how to make a particle disappear?
    }

    if (player.grow) this.x += randomN;
    if (!player.grow) this.x -= randomN;
  }
}

class GrowParticle extends SpecialParticle {
  constructor(x, y, d, morphAmmount) {
    super(x, y, d);
    this.morphAmmount = -morphAmmount;
  }
  update() {
    let randomN = random(0, 1);
    strokeWeight(2);
    fill(colorChange + randomN * 10, 0, 0);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      player.baseD -= this.morphAmmount;
      player.d -= this.morphAmmount;
      this.y = -1000; // A bit hacky, but particle is gone and shrinking only happens once ;D
      // how to make a particle disappear?
    }

    if (player.grow) this.x += randomN;
    if (!player.grow) this.x -= randomN;
  }
}

// movIt Function would be good here
