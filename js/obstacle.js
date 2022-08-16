class Obstacle {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  update() {
    hit = collideLineCircle(this.x1, this.y1, this.x2, this.y2, player.x, player.y, player.d);
    strokeWeight(10);
    line(this.x1, this.y1, this.x2, this.y2);
    strokeCap(SQUARE);
    // line(this.x1, this.y1 - 6, this.x2, this.y2 - 6);
    // line(this.x1, this.y1 - 12, this.x2, this.y2 - 12);
    // line(this.x1, this.y1 - 18, this.x2, this.y2 - 18);
    if (hit) {
      player.y += 20;
    }
  }

  collisionCheck() {}
}

// // Working Rectangle Obstacle with collision detection on the bottom
// class obstacle {
//   constructor(x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//   }

//   update() {
//     hit = collideRectCircle(this.x, this.y, this.w, this.h, player.x, player.y, player.d);
//     fill(hit ? "red" : 255);
//     rect(this.x, this.y, this.w, this.h);
//     if (hit) {
//       // player.v = 0;
//       player.y += 5;
//       // Now I need some detection on the sides as well
//     }
//   }

//   collisionCheck() {}
// }
