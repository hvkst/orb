class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collided = false;
    // this.past = false;
  }

  update() {
    // Some kind of Loop here to detect x,y,d from all particles?
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    // fill(hit ? 255 : 50);
    fill(40, 80, 80);
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
  constructor(x, y, w, h, t, thingsArrayDotLength) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.trigger = t;
    this.thingsArrayDotLength = thingsArrayDotLength;
  }

  update() {
    super.update();
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit && player.baseD == this.trigger && thingsArray.length < this.thingsArrayDotLength) {
      this.collided = true;
      succes.play();
      levelCounter++;
      if (toggle == true) {
        toggle = false;
      } else toggle = true;
    }
  }
}

class TextInfo {
  constructor(x, y, w, h, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
    this.past = false;
  }

  update() {
    // fill(50);
    fill(80, 40, 80);
    rect(this.x, this.y, this.w, this.h, 20);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(`${this.s}`, this.x + this.w / 2, this.y + this.h / 2);

    if (gameStarted) this.y += gameSpeed * 0.2;

    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit) {
      slime.play();
      this.collided = true;
    }
  }
}

// function spawnTextInfo(x, y, w, h, string) {
//   fill(50);
//   rect(x, y, w, h);
//   fill(255);
//   // fill(40, 80, 80);
//   textSize(80);
//   textAlign(CENTER);
//   text(`${string}`, x, y);
// }
