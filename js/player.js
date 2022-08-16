let playerD = 130; // This is not working

class Player {
  constructor() {
    this.d = playerD;
    this.x = width / 2;
    this.y = height - 100;
    // this.speed = 3;
    this.grow = true;
    this.growAmount = 0.5;
    this.v = 5; // velocity
    this.max = this.d;
    this.min = this.d - 30;
  }

  update() {
    strokeWeight(4);
    fill(255, colorChange, 50);
    circle(this.x, this.y, playerD);
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(`${round(this.d)}`, this.x, this.y);

    if (this.d >= this.max) {
      this.grow = false;
    }
    if (this.d < this.min) {
      this.grow = true;
    }

    if (this.grow == true) {
      if (this.d > this.max - 3) {
        this.d += this.growAmount / 2;
      } else {
        this.d += this.growAmount;
        colorChange += 1;
      }
    } else {
      if (this.d < this.min - 3) {
        this.d -= this.growAmount / 2;
      } else {
        this.d -= this.growAmount;
        colorChange -= 1;
      }
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
}
