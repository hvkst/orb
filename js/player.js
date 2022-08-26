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

    // //debugging
    // fill(0);
    // textSize(40);
    // textAlign(CENTER);
    // text(`${round(this.d)}`, this.x, this.y);
    // textSize(20);
    // // text(`x: ${round(this.x)}`, this.x, this.y + 20);
    // // text(`y: ${round(this.y)}`, this.x, this.y + 40);
    // text(`${this.baseD}`, this.x, this.y + 40);

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

    if (this.baseD < 0) {
      colorChange = 0;
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
    if (this.y > height - this.d / 10 && colorChange > 0) {
      colorChange -= 5;
    } else if (colorChange < 100) colorChange += 5;
  }
}

function gameStatus() {
  if (player.y < height / 2) {
    gameStarted = true;
  }

  if (gameStarted) {
    gameSpeed = 1.5;
    // gameSpeed = 3; // for developing
  }

  if (gameOver) {
    black = 0;
    white = 255;
    gameover.play();
    bgmusic.stop();
  }
}

function startScreen() {
  push();
  textFont(font);
  background(0);
  fill(white);
  circle(width / 2, height / 2, circleD);

  fill(255);

  textAlign(CENTER);
  // text(`${mouseX},${mouseY}`, width / 2, 100);
  if (startScreenCounter > 10) {
    textSize(75);
    fill(black, alphaCount * 2);

    textAlign(CENTER);
    text("orb", width / 2, height / 2 + 25);
  }

  if (startScreenCounter > 50) {
    textSize(40);
    fill(white);
    textAlign(CENTER);
    text("Press 'orb' to play", width / 2, height / 2 + 300);
  }
  pop();
  if (circleD > 200) {
    grow = false;
  }
  if (circleD < 181) {
    grow = true;
  }

  if (grow == true) {
    if (circleD > 197) {
      circleD += growAmount / 4;
      startScreenCounter++;
    } else if (circleD < 180) {
      circleD += growAmount;
    } else {
      circleD += growAmount / 2;
      if (startScreenCounter > 0) alphaCount += 2;
    }
  } else {
    if (circleD < 183) {
      circleD -= growAmount / 4;
      // alphaCount--;
    } else {
      circleD -= growAmount / 3;
    }
  }
}

function gameOverScreen() {
  push();
  textFont(font);
  background(255);
  fill(black);
  noStroke();
  circle(width / 2, height / 2, gameOverCircleD);

  if (gameOverCircleD > 200) {
    gameOverCircleD -= 10;
  }

  if (gameOverCircleD < 201) {
    textSize(40);
    fill(white);
    textAlign(CENTER);
    fill(white, alphaCount + 255);
    text("Game", width / 2, height / 2 - 25);
    text("Over", width / 2, height / 2 + 15);

    if (alphaCount < -800) {
      textSize(75);
      fill(white);
      text("orb", width / 2, height / 2 - 15);
      if (!toggle) {
        infobop.play();
        toggle = true;
      }
    }

    if (alphaCount < -1600) {
      textSize(40);
      fill(black);
      text("Press 'orb' to play again", width / 2, height / 2 + 300);
    }
  }
  pop();
  if (gameOverCircleD > 199) {
    grow = false;
  }
  if (gameOverCircleD < 181) {
    grow = true;
  }

  if (grow == true) {
    if (gameOverCircleD > 197) {
      gameOverCircleD += growAmount / 4;
      startScreenCounter++;
    } else {
      gameOverCircleD += growAmount / 2;
      if (startScreenCounter > 0) alphaCount -= 25;
    }
  } else {
    if (gameOverCircleD < 183) {
      gameOverCircleD -= growAmount / 4;
    } else {
      gameOverCircleD -= growAmount / 3;
    }
  }
}

function mousePressed() {
  if (startScreenShow && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 100 && mouseY < height / 2 + 100) {
    black = 255;
    white = 0;
    if (!startGame) {
      infobop.play();
      setTimeout(fromStartToGame, 2000);
      startGame = true;
    }
  }
  if (gameOver && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 100 && mouseY < height / 2 + 100) {
    black = 255;
    white = 0;
    if (!restartGame) {
      infobop.play();
      setTimeout(fromGameOverToGame, 2000);
      restartGame = true;
    }
  }
}

function fromStartToGame() {
  startScreenShow = false;
  bgmusic.loop();
}

function fromGameOverToGame() {
  bgmusic.loop();
  resetSketch(false);
}

function resetSketch(startScreenPlay) {
  // Reset variables
  white = 255;
  black = 0;
  score = 0;
  gameStarted = false;
  levelCounter = 0;
  gameSpeed = 0;
  gameOver = false;
  thingsArray = [];
  toggle = true;
  // Startscreen
  circleD = 0;
  grow = true;
  growAmount = 1;
  startScreenCounter = 0;
  alphaCount = 0;

  startScreenShow = startScreenPlay;

  // GameOverScreen
  gameOverCircleD = 2000;

  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");
  player = new Player();
}
