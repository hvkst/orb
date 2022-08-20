class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
    // Some kind of Loop here to detect x,y,d from all particles?
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    fill(hit ? 255 : 50);
    fill(40, 80, 80);
    rect(this.x, this.y, this.w, this.h);
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
    if (hit && fromBelow && player.y > height + 1) gameOver = true;
  }
}

class LevelFinish extends Obstacle {
  constructor(x, y, w, h, t) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.trigger = t;
  }

  update() {
    super.update();
    let hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    if (hit && player.baseD == this.trigger) {
      this.collided = true;
      succes.play();
      levelCounter++;
    }
  }
}
