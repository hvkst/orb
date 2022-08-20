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
    // Almost working collision detection
    // What do I have to do here?
    // Check, if player is up, left, right or down from obstacle and then react in only one way...

    if (hit) {
      player.v *= -1;
    } else if (!hit) player.v = 5;

    // Collision reaction up and down

    // let fromBelow = player.y - player.d / 2 < this.y + this.h;
    // let fromAbove = player.y + player.d / 2 > this.y;
    // let fromLeft = player.x + player.d / 2 > this.x;
    // let fromRight = player.x - player.d / 2 < this.x + this.w;

    // if (hit && fromBelow) player.y += 6; // from below
    // if (hit && fromAbove) player.y -= 6; // from above

    // They are both working alone... why not together???
    // if (hit && fromLeft) player.x -= 6; // from left
    // if (hit && fromRight) player.x += 6; // from right

    // if (hit) {
    //   // if (player.y - player.d / 2 > this.y - player.d / 2) player.y += 6; // from below
    //   // if (player.y + player.d / 2 < this.y + player.d / 2) player.y -= 6; // from above
    //   // Collision reaction left and right
    //   // if (player.x + player.d / 2 < this.x + player.d / 2) player.x -= 6; // from left
    //   // if (player.x - player.d / 2 > this.x - player.d / 2) player.x += 6; // from right
    // }

    // // Almost working collision detection
    // // Collision reaction up and down
    // if (hit && player.y - player.d / 2 > this.y - player.d / 2) {
    //   player.y += 6;
    // }
    // if (hit && player.y + player.d / 2 < this.y + player.d / 2) {
    //   player.y -= 6;
    // }
    // // Collision reaction left and right
    // if (hit && player.x - player.d / 2 > this.x - player.d / 2) {
    //   player.x += 6;
    // }
    // if (hit && player.x + player.d / 2 < this.x + player.d / 2) {
    //   player.x -= 6;
    // }

    // this inside gameplay-function
    if (player.y < height * 0.5) {
      this.y += gameSpeed * 0.1;
    }
  }
}
