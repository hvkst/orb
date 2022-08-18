// Working rectangle obstacle with collision detection on the bottom
class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update() {
    // Some kind of Loop here to detect x,y,d from all particles
    hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
    fill(50);
    rect(this.x, this.y, this.w, this.h);
    if (hit && player.y - player.d / 2 > this.y - player.d / 2) {
      player.y += 10;
    }
    if (hit && player.y + player.d / 2 < this.y + player.d / 2) {
      player.y -= 10;
    }
    // this inside gameplay-function
    if (player.y < height * 0.5) {
      this.y += gameSpeed * 0.1;
    }
  }
}
