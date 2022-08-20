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
    strokeWeight(4);
    // fill(colorChange, colorChange, colorChange);
    fill(255, colorChange, 50);
    circle(this.x, this.y, this.d);
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text(`${round(this.d)}`, this.x, this.y);
    textSize(20);
    // text(`x: ${round(this.x)}`, this.x, this.y + 20);
    // text(`y: ${round(this.y)}`, this.x, this.y + 40);
    text(`${this.baseD}`, this.x, this.y + 40);

    if (this.d > this.baseD + this.growRange) {
      this.grow = false;
    }
    if (this.d < this.baseD - this.growRange) {
      this.grow = true;
    }

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
    if (this.y > height + this.d / 4) {
      this.y = height + this.d / 4;
    }
    if (this.y > height - this.d / 4 && colorChange > 0) {
      colorChange -= 5;
    } else if (colorChange < 100) colorChange += 5;
    // This has to go for now, maybe a generel function linked to obstacles for that?
    // // Tried to implement some kind of guidance here, kinda working
    // if (this.y > 180 && this.y < 260 && this.x > width / 2 - 10 && this.x < width / 2 + 10) this.x = width / 2;
    // if (this.y > 380 && this.y < 460 && this.x > width / 2 - 10 && this.x < width / 2 + 10) this.x = width / 2;
  }
}

function gameStatus() {
  if (player.y < height - 65) {
    gameStarted = true;
  }
  if (gameStarted) {
    gameSpeed = 3;
  }

  if (gameOver) {
    gameover.play();
    noLoop();
  }
}
