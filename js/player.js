class Player {
  constructor() {
    this.d = 115;
    this.x = width / 2;
    this.y = height - 100;
    // this.speed = 3;
    this.grow = true;
    this.growAmount = 0.2;
    this.v = 5; // velocity
    this.growRange = 5;
    this.baseD = 115;
  }

  update() {
    strokeWeight(4);
    fill(255, colorChange, 50);
    circle(this.x, this.y, this.d);
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(`${round(this.d)}`, this.x, this.y);

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
        colorChange += 1;
      }
    } else {
      if (this.d < this.baseD - this.growRange + 3) {
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
    // Tried to implement some kind of guidance here, kinda working
    if (this.y > 180 && this.y < 260 && this.x > width / 2 - 10 && this.x < width / 2 + 10) this.x = width / 2;
    // if (this.y > 160 && this.y < 240 && this.x < width / 2 + 5) this.x = width / 2;
    if (this.y > 380 && this.y < 460 && this.x > width / 2 - 10 && this.x < width / 2 + 10) this.x = width / 2;
    // if (this.y > 360 && this.y < 440 && this.x < width / 2 + 5) this.x = width / 2;
  }
}

function growing(who) {
  if (who.d > 130) {
    who.grow = false;
  }
  if (who.d < 100) {
    who.grow = true;
  }

  if (who.grow == true) {
    if (who.d > 127) {
      who.d += who.growAmount / 2;
    } else {
      who.d += who.growAmount;
      colorChange += 1;
    }
  } else {
    if (who.d < 103) {
      who.d -= who.growAmount / 2;
    } else {
      who.d -= who.growAmount;
      colorChange -= 1;
    }
  }
}

//
// if (this.d > this.d + thisgrowRange) {
//   this.grow = false;
// }
// if (this.d < 100) {
//   this.grow = true;
// }

// if (this.grow == true) {
//   if (this.d > 127) {
//     this.d += this.growAmount / 2;
//   } else {
//     this.d += this.growAmount;
//     colorChange += 1;
//   }
// } else {
//   if (this.d < 103) {
//     this.d -= this.growAmount / 2;
//   } else {
//     this.d -= this.growAmount;
//     colorChange -= 1;
//   }
// }
