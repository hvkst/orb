class Player {
  constructor() {
    this.d = 115;
    this.x = width / 2;
    this.y = height - 25;

    this.grow = true;
    this.growAmount = 0.2;
    this.v = 5; // velocity
    this.growRange = 5;
    this.baseD = 115;
  }

  update() {
    strokeWeight(2);
    fill(255, colorChange, 50);
    circle(this.x, this.y, this.d);
    // this.d and this.baseD used here to avoid endless growing, both start the same, but only this.d changes when growing
    if (this.d > this.baseD + this.growRange) {
      this.grow = false;
    }
    if (this.d < this.baseD - this.growRange) {
      this.grow = true;
    }
    // different "breathing" tempo when at smallest or largest point
    if (this.grow == true) {
      if (this.d > this.baseD + this.growRange - 3) {
        this.d += this.growAmount / 2;
      } else {
        this.d += this.growAmount;
        colorChange += 2;
      }
    } else {
      if (this.d < this.baseD - this.growRange + 3) {
        this.d -= this.growAmount / 2;
      } else {
        this.d -= this.growAmount;
        colorChange -= 2;
      }
    }
    // Game over if too small
    if (this.baseD < 0) {
      gameOver = true;
    }
  }

  move() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.v;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.v;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.v;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.v;
    }
  }

  limitMovement() {
    // looping thorugh left and right side
    if (this.x < 0 - this.d / 2) {
      this.x = width + this.d / 8;
    }
    if (this.x > width + this.d / 2) {
      this.x = 0 - this.d / 8;
    }
    // not looping up and down
    if (this.y < 0 + this.d / 2) {
      this.y = 0 + this.d / 2;
    }
    if (this.y > height + this.d / 4) {
      this.y = height + this.d / 4;
    }
    // changing color to red, when in the danger zone (bottom)
    if (this.y > height - this.d / 10 && colorChange > 0) {
      colorChange -= 5;
    } else if (colorChange < 100) colorChange += 5;
  }
}
