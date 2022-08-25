class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collided = false;
    // this.past = false;
    this.r = 40;
    this.g = 80;
    this.b = 80;
  }

  update() {
    // Some kind of Loop here to detect x,y,d from all particles?
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    // fill(hit ? 255 : 50);
    // noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h, 3);
    // Working collision detection
    // Split in two parts for debugging and better readability
    let fromBelow = player.y > this.y + this.h;
    let fromAbove = player.y < this.y;
    let fromLeft = player.x < this.x;
    let fromRight = player.x > this.x + this.w;

    if (hit && fromBelow) player.y += 6;
    if (hit && fromAbove) player.y -= 6;
    if (hit && fromLeft) player.x -= 6;
    if (hit && fromRight) player.x += 6;

    // this inside gameplay-function
    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }
    if (hit && fromBelow && player.y > height + player.d / 6) gameOver = true;
    if (this.y > height) this.collided = true;
  }
}

class LevelFinish extends Obstacle {
  constructor(x, y, w, h, t, thingsArrayDotLength, levelUp) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.trigger = t;
    this.thingsArrayDotLength = thingsArrayDotLength;
    this.levelUp = levelUp; // Levelcounter goes up | 1 or 0
    this.r = 160;
    this.g = 100;
    this.b = 0;
  }

  update() {
    super.update();
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit && player.baseD == this.trigger && thingsArray.length < this.thingsArrayDotLength) {
      this.collided = true;
      succes.play();
      levelCounter += this.levelUp;
      if (this.levelUp) {
        toggle = true;
      }
      // if (toggle == true) {
      //   toggle = false;
      // } else toggle = true;
    }
  }
}

class TextInfo {
  constructor(x, y, w, h, s, tw, extra) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s; // String
    this.tw = tw; // TextWrap
    this.extra = extra; // optional for extra adjustments
  }

  update() {
    push();
    strokeWeight(1);
    noStroke();

    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "yellow";

    // fill(255, 255);
    // rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 20);
    fill(0);
    rect(this.x, this.y, this.w, this.h, 20);
    pop();
    fill(255);
    textSize(25);
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text(`${this.s}`, this.x + this.extra, this.y + this.h / 2, this.tw);

    // if (gameStarted) this.y += gameSpeed * 0.2;

    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }

    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit) {
      infobop.play();
      this.collided = true;
    }
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

class MovingObstacle extends Obstacle {
  // constructor(x, y, w, h, baseX, baseY, moveX, moveY, moveTempo) {
  constructor(x, y, w, h, baseX, moveX, moveTempo) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.moveTempo = moveTempo;
    this.baseX = baseX;
    // this.baseY = baseY;
    this.moveX = moveX;
    // this.moveY = moveY;
    this.move = true;
    this.r = 255;
    this.g = 0;
    this.b = 150;
  }

  update() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit) gameOver = true;

    if (this.x > this.baseX + this.moveX) {
      this.move = false;
    }
    if (this.x < this.baseX - this.moveX) {
      this.move = true;
    }

    if (this.y > this.baseY + this.moveY) {
      this.move = false;
    }
    if (this.y < this.baseY - this.moveY) {
      this.move = true;
    }

    if (this.move == true) {
      // if (this.x > this.baseX + this.moveX - 3) {
      //   this.x += this.moveTempo / 2;
      // } else {
      this.x += this.moveTempo;
      // }
    } else {
      // if (this.x < this.baseX - this.moveTempo + 3) {
      //   this.x -= this.moveTempo / 2;
      // } else {
      this.x -= this.moveTempo;
      // }
    }
    if (gameStarted) {
      this.y += gameSpeed * 0.2;
    }
    if (this.y > height) this.collided = true;
  }
}
