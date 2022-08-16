class Particle {
  constructor(x, y, d) {
    // Vectors would be nice here
    this.x = x;
    this.y = y;
    this.d = d;
  }

  update() {
    strokeWeight(4);
    fill(0, colorChange + 50, 0);
    circle(this.x, this.y, this.d);

    hit = collideCircleCircle(this.x, this.y, this.d, player.x, player.y, player.d);
    if (hit) {
      // playerD -= 30; // Not working
      this.y = -1000; // A bit hacky, but particle is gone and shrinking only happens once ;D
      // how to make a particle disappear?
    }
  }
}
