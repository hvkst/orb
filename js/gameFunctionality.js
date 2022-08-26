function gameStatus() {
  if (player.y < height / 2) {
    gameStarted = true;
  }

  if (gameStarted) {
    gameSpeed = 1.5;
  }

  if (gameOver) {
    black = 0; // Using these for color-effect on both start and gameover screen, thus the reset
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

  if (startScreenCounter > 10) {
    textSize(75);
    fill(black, alphaCount * 2);
    text("orb", width / 2, height / 2 + 25);
  }

  if (startScreenCounter > 50) {
    textSize(40);
    fill(white);
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
  resetSketch(false, 0);
}

function resetSketch(startScreenPlay, startInLevel) {
  // Reset variables
  white = 255;
  black = 0;
  score = 0;
  gameStarted = false;
  levelCounter = startInLevel;
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
